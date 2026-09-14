import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navigate } from 'astro:transitions/client';

gsap.registerPlugin(ScrollTrigger);

let disposePage: (() => void) | undefined;
let pendingPageScroll: URL | undefined;

function hashTarget(hash: string) {
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

/** Each Astro page owns its listeners, scroll instance and animation context. */
function initMotion() {
  disposePage?.();

  const pageEvents = new AbortController();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktopWidth = window.matchMedia('(min-width: 900px)');
  const desktopPointer = window.matchMedia('(min-width: 900px) and (pointer: fine)');
  const menuToggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menuPanel = document.querySelector<HTMLElement>('[data-menu-panel]');
  let disposeMotion: (() => void) | undefined;
  let disposed = false;
  let menuOpen = false;
  let savedBodyOverflow = '';
  let savedRootOverflow = '';
  let returnFocus: HTMLElement | null = null;
  let refreshFrame = 0;
  const inertStates = new Map<HTMLElement, boolean>();
  let restoreTargetTabIndex: (() => void) | undefined;

  const scrollToDestination = (target: HTMLElement | null) => {
    // Fragment navigation must work without waiting for an animation frame.
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    ScrollTrigger.update();
  };

  const refresh = () => {
    cancelAnimationFrame(refreshFrame);
    refreshFrame = requestAnimationFrame(() => {
      if (!disposed) {
        // A safe refresh avoids racing a refresh against ClientRouter teardown.
        ScrollTrigger.refresh(true);
      }
    });
  };

  const menuFocusable = () =>
    Array.from(
      menuPanel?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    ).filter((element) => element.getClientRects().length > 0);

  const closeMenu = (restoreFocus = true) => {
    if (!menuOpen || !menuPanel || !menuToggle) return;
    menuOpen = false;
    menuPanel.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = savedBodyOverflow;
    document.documentElement.style.overflow = savedRootOverflow;
    inertStates.forEach((wasInert, element) => {
      element.inert = wasInert;
    });
    inertStates.clear();
    if (restoreFocus && returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    returnFocus = null;
  };

  const openMenu = () => {
    if (menuOpen || !menuPanel || !menuToggle) return;
    returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : menuToggle;
    savedBodyOverflow = document.body.style.overflow;
    savedRootOverflow = document.documentElement.style.overflow;
    menuOpen = true;
    menuPanel.hidden = false;
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.querySelectorAll<HTMLElement>('main, body > footer').forEach((element) => {
      inertStates.set(element, element.inert);
      element.inert = true;
    });
    menuFocusable()[0]?.focus({ preventScroll: true });
  };

  if (menuToggle && menuPanel) {
    menuPanel.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.addEventListener('click', () => (menuOpen ? closeMenu() : openMenu()), {
      signal: pageEvents.signal,
    });
    menuPanel.addEventListener(
      'click',
      (event) => {
        if (!(event.target instanceof Element)) return;
        if (event.target.closest('a[href]')) closeMenu();
      },
      { signal: pageEvents.signal },
    );
    document.addEventListener(
      'keydown',
      (event) => {
        if (!menuOpen) return;
        if (event.key === 'Escape') {
          event.preventDefault();
          closeMenu();
        } else if (event.key === 'Tab') {
          // The toggle stays in the cycle, so the menu can always be closed.
          const elements = [menuToggle, ...menuFocusable()];
          const current = elements.indexOf(document.activeElement as HTMLElement);
          if (event.shiftKey && current <= 0) {
            event.preventDefault();
            elements.at(-1)?.focus();
          } else if (!event.shiftKey && (current === elements.length - 1 || current === -1)) {
            event.preventDefault();
            elements[0]?.focus();
          }
        }
      },
      { signal: pageEvents.signal },
    );
  }

  document.addEventListener(
    'click',
    (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (
        !(link instanceof HTMLAnchorElement) ||
        link.hasAttribute('download') ||
        link.hasAttribute('data-astro-reload') ||
        (link.target && link.target !== '_self')
      )
        return;
      const destination = new URL(link.href, window.location.href);
      if (
        destination.origin !== location.origin ||
        destination.pathname !== location.pathname ||
        destination.search !== location.search ||
        !destination.hash
      )
        return;
      const target = hashTarget(destination.hash);
      if (!target) return;

      // Astro owns URL/history; this keeps focus and scroll state in sync.
      event.preventDefault();
      closeMenu(false);
      void navigate(destination.href, {
        history: link.dataset.astroHistory === 'replace' ? 'replace' : 'auto',
        sourceElement: link,
      }).then(() => {
        if (disposed || !target.isConnected || location.href !== destination.href) return;
        scrollToDestination(target);
        restoreTargetTabIndex?.();
        const previousTabIndex = target.getAttribute('tabindex');
        if (previousTabIndex === null) target.setAttribute('tabindex', '-1');
        const restore = () => {
          if (previousTabIndex === null) target.removeAttribute('tabindex');
          target.removeEventListener('blur', restore);
        };
        restoreTargetTabIndex = restore;
        target.addEventListener('blur', restore, { once: true });
        target.focus({ preventScroll: true });
      });
    },
    { capture: true, signal: pageEvents.signal },
  );

  document.addEventListener(
    'toggle',
    (event) => {
      if (event.target instanceof HTMLDetailsElement) refresh();
    },
    { capture: true, signal: pageEvents.signal },
  );

  const buildMotion = () => {
    disposeMotion?.();

    const context = gsap.context(() => {
      // Content is visible in HTML and remains readable even before a trigger fires.
      if (reducedMotion.matches) return;

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 16,
          // Keep full contrast throughout the entrance, including slow frames.
          duration: 0.8,
          ease: 'power2.out',
          immediateRender: false,
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: element, start: 'top 94%', once: true },
        });
      });

      // One short entrance per graphic. No perpetual loops or fading body copy.
      gsap.utils.toArray<HTMLElement>('[data-graphic]').forEach((graphic) => {
        const layers = graphic.querySelectorAll('[data-graphic-layer]');
        const items = graphic.querySelectorAll('[data-graphic-item]');
        const paths = graphic.querySelectorAll('[data-draw]');
        const entrance = gsap.timeline({
          scrollTrigger: { trigger: graphic, start: 'top 88%', once: true },
          defaults: { duration: 0.85, ease: 'power3.out', immediateRender: false },
        });
        if (layers.length)
          entrance.from(layers, { y: 24, scale: 0.94, stagger: 0.12, clearProps: 'transform' }, 0);
        if (items.length) entrance.from(items, { y: 20, stagger: 0.12, clearProps: 'transform' }, 0.1);
        if (paths.length)
          entrance.fromTo(
            paths,
            { strokeDasharray: 1, strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              duration: 1.2,
              stagger: 0.1,
              clearProps: 'strokeDasharray,strokeDashoffset',
            },
            0.1,
          );
      });

      // The real project crop follows scroll slightly without moving its text.
      if (desktopPointer.matches) {
        gsap.utils.toArray<HTMLElement>('.service-visual').forEach((visual) => {
          gsap.to(visual.querySelector('.visual-grid'), {
            y: 28,
            ease: 'none',
            scrollTrigger: { trigger: visual, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
          });
        });
      }

      if (desktopPointer.matches) {
        const collage = document.querySelector<HTMLElement>('.hero-collage');
        if (collage) {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: collage,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });
          const firstShot = collage.querySelector('.hero-shot--one');
          const secondShot = collage.querySelector('.hero-shot--two');
          if (firstShot) timeline.to(firstShot, { y: '-=38', rotation: '-=1.5', ease: 'none' }, 0);
          if (secondShot) timeline.to(secondShot, { y: '+=28', rotation: '+=1.5', ease: 'none' }, 0);
        }

        const wordmark = document.querySelector<HTMLElement>('.hero-wordmark');
        if (wordmark) {
          gsap.to(wordmark, {
            y: -20,
            ease: 'none',
            scrollTrigger: { trigger: wordmark, start: 'top 80%', end: 'bottom top', scrub: 0.8 },
          });
        }
      }
    }, document.body);

    disposeMotion = () => {
      context.revert();
    };
    refresh();
  };

  const onMediaChange = () => {
    if (desktopWidth.matches) closeMenu();
    buildMotion();
  };

  reducedMotion.addEventListener('change', onMediaChange, { signal: pageEvents.signal });
  desktopWidth.addEventListener('change', onMediaChange, { signal: pageEvents.signal });
  desktopPointer.addEventListener('change', onMediaChange, { signal: pageEvents.signal });
  document.querySelectorAll('img').forEach((image) => {
    if (!image.complete) image.addEventListener('load', refresh, { once: true, signal: pageEvents.signal });
  });
  document.fonts.ready.then(() => {
    if (!disposed) refresh();
  });

  disposePage = () => {
    disposed = true;
    closeMenu(false);
    pageEvents.abort();
    disposeMotion?.();
    restoreTargetTabIndex?.();
    cancelAnimationFrame(refreshFrame);
  };
  buildMotion();
  // New pages start at their fragment or top. History traversal keeps Astro's
  // saved position; initial loads also retain native browser restoration.
  if (pendingPageScroll?.href === window.location.href) {
    const target = pendingPageScroll.hash ? hashTarget(pendingPageScroll.hash) : null;
    pendingPageScroll = undefined;
    scrollToDestination(target);
  }
}

const beforeSwap = (event?: Event) => {
  pendingPageScroll = undefined;
  if (
    event &&
    'navigationType' in event &&
    event.navigationType !== 'traverse' &&
    'to' in event &&
    event.to instanceof URL
  ) {
    pendingPageScroll = event.to;
  }
  disposePage?.();
  disposePage = undefined;
};

document.addEventListener('astro:page-load', initMotion);
document.addEventListener('astro:before-swap', beforeSwap);
initMotion();

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    beforeSwap();
    document.removeEventListener('astro:page-load', initMotion);
    document.removeEventListener('astro:before-swap', beforeSwap);
  });
}
