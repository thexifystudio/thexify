'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function hashTarget(hash: string) {
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

/** Root layout a path belongs to. Next does a full load between root layouts. */
function rootOf(pathname: string) {
  if (pathname === '/es' || pathname.startsWith('/es/')) return 'es';
  if (pathname.startsWith('/admin') || pathname.startsWith('/login')) return 'panel';
  return 'en';
}

/**
 * Port of the Astro site's src/scripts/motion.ts: mobile menu, same-page anchors,
 * GSAP entrances and scroll scrubs. Each page owns its listeners and animation
 * context, rebuilt on every route change.
 *
 * Page-to-page navigation is wrapped in a view transition, like Astro's ClientRouter.
 */
export function SiteMotion() {
  const pathname = usePathname();
  const router = useRouter();
  const finishTransition = useRef<(() => void) | null>(null);

  useEffect(() => {
    // The new route has committed: let the pending view transition capture it.
    finishTransition.current?.();
    finishTransition.current = null;

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
        if (!disposed) ScrollTrigger.refresh(true);
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
      menuToggle.setAttribute('aria-label', menuToggle.dataset.openLabel ?? 'Open menu');
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
      menuToggle.setAttribute('aria-label', menuToggle.dataset.closeLabel ?? 'Close menu');
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
      menuToggle.setAttribute('aria-label', menuToggle.dataset.openLabel ?? 'Open menu');
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

    // Runs in the capture phase, before next/link's own click handler.
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
          (link.target && link.target !== '_self')
        )
          return;
        const destination = new URL(link.href, window.location.href);
        if (destination.origin !== location.origin) return;

        const samePage = destination.pathname === location.pathname && destination.search === location.search;

        // Same-page anchor: update the URL, jump to the section and move focus to it.
        if (samePage) {
          if (!destination.hash) return;
          const target = hashTarget(destination.hash);
          if (!target) return;
          event.preventDefault();
          closeMenu(false);
          if (location.href !== destination.href) window.history.pushState(null, '', destination.href);
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
          return;
        }

        // Another page in the same root layout: client navigation inside a view transition.
        if (
          destination.pathname === location.pathname ||
          rootOf(destination.pathname) !== rootOf(location.pathname) ||
          !document.startViewTransition ||
          reducedMotion.matches
        )
          return; // next/link (or the browser) handles it without the SPA transition.
        event.preventDefault();
        closeMenu(false);
        const href = destination.pathname + destination.search + destination.hash;
        let navigated = false;
        const navigate = () => {
          if (navigated) return false;
          navigated = true;
          router.push(href);
          return true;
        };
        const transition = document.startViewTransition(
          () =>
            new Promise<void>((resolve) => {
              // Fallback already navigated without animation.
              if (!navigate()) return resolve();
              const timeout = window.setTimeout(resolve, 3000);
              finishTransition.current = () => {
                window.clearTimeout(timeout);
                resolve();
              };
            }),
        );
        // The callback only runs once the browser renders a frame. If that does not
        // happen soon (throttled or non-painting tab), navigate without the animation.
        const fallback = window.setTimeout(() => {
          if (navigate()) transition.skipTransition();
        }, 400);
        transition.updateCallbackDone.finally(() => window.clearTimeout(fallback)).catch(() => {});
        transition.ready.catch(() => {}); // Rejects when skipped; nothing to handle.
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
      const heroEvents = new AbortController();
      const tilt = document.querySelector<HTMLElement>('[data-hero-tilt]');

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
          const drawPaths = graphic.querySelectorAll('[data-draw]');
          const entrance = gsap.timeline({
            scrollTrigger: { trigger: graphic, start: 'top 88%', once: true },
            defaults: { duration: 0.85, ease: 'power3.out', immediateRender: false },
          });
          if (layers.length)
            entrance.from(layers, { y: 24, scale: 0.94, stagger: 0.12, clearProps: 'transform' }, 0);
          if (items.length) entrance.from(items, { y: 20, stagger: 0.12, clearProps: 'transform' }, 0.1);
          if (drawPaths.length)
            entrance.fromTo(
              drawPaths,
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

        // Homepage hero: the interface stack leans toward the pointer and drifts on scroll.
        const softwareHero = document.querySelector<HTMLElement>('.hx-hero');
        if (desktopPointer.matches && softwareHero && tilt) {
          let frame = 0;
          softwareHero.addEventListener(
            'pointermove',
            (event) => {
              cancelAnimationFrame(frame);
              frame = requestAnimationFrame(() => {
                const rect = softwareHero.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width - 0.5;
                const y = (event.clientY - rect.top) / rect.height - 0.5;
                tilt.style.setProperty('--hx-tilt-y', `${(x * 7).toFixed(2)}deg`);
                tilt.style.setProperty('--hx-tilt-x', `${(-y * 5).toFixed(2)}deg`);
              });
            },
            { signal: heroEvents.signal },
          );
          softwareHero.addEventListener(
            'pointerleave',
            () => {
              cancelAnimationFrame(frame);
              tilt.style.removeProperty('--hx-tilt-x');
              tilt.style.removeProperty('--hx-tilt-y');
            },
            { signal: heroEvents.signal },
          );
          gsap.to(tilt, {
            '--hx-drift': '-56px',
            ease: 'none',
            scrollTrigger: { trigger: softwareHero, start: 'top top', end: 'bottom top', scrub: 0.8 },
          });
          gsap.to('.hx-beams-box', {
            opacity: 0.35,
            ease: 'none',
            scrollTrigger: { trigger: softwareHero, start: 'top top', end: 'bottom top', scrub: 0.8 },
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
        heroEvents.abort();
        tilt?.style.removeProperty('--hx-tilt-x');
        tilt?.style.removeProperty('--hx-tilt-y');
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

    buildMotion();

    return () => {
      disposed = true;
      closeMenu(false);
      pageEvents.abort();
      disposeMotion?.();
      restoreTargetTabIndex?.();
      cancelAnimationFrame(refreshFrame);
    };
  }, [pathname, router]);

  return null;
}
