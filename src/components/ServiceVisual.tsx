import Image from 'next/image';
import { GraphicIcon } from '@/components/GraphicIcon';
import { Mark } from '@/components/Mark';
import cananguenoSmall from '@/assets/canangueno-small.webp';
import type { ServiceKey } from '@/data/pricing';
import type { Lang } from '@/lib/i18n';

export function ServiceVisual({ kind, lang }: { kind: ServiceKey; lang: Lang }) {
  const en = lang === 'en';

  return (
    <div className={`service-visual service-visual--${kind}`} data-graphic>
      <div className="visual-grid" aria-hidden="true"></div>
      {kind === 'website' ? (
        <>
          <div className="visual-window real-site" data-graphic-layer>
            <div className="visual-toolbar">
              <span>canangueno lodge</span>
              <span aria-hidden="true">↗</span>
            </div>
            <Image
              src={cananguenoSmall}
              sizes="(max-width: 900px) 80vw, 29vw"
              quality={80}
              alt={
                en
                  ? 'Thexify website design for Canangueno Lodge'
                  : 'Diseño web de Thexify para Canangueno Lodge'
              }
            />
          </div>
          <span className="visual-caption">
            {en ? 'A real Thexify project' : 'Un proyecto real de Thexify'}
          </span>
        </>
      ) : kind === 'webapp' ? (
        <>
          <div className="visual-window panel-demo" data-graphic-layer aria-hidden="true">
            <div className="visual-toolbar">
              <Mark />
              <span>{en ? 'Your workspace' : 'Tu espacio de trabajo'}</span>
            </div>
            <div className="panel-content">
              <div className="panel-nav">
                <i></i>
                <i></i>
                <i></i>
              </div>
              <div className="panel-rows">
                <strong>{en ? 'Content' : 'Contenido'}</strong>
                {(en ? ['Pages', 'Catalog', 'Your team'] : ['Páginas', 'Catálogo', 'Tu equipo']).map(
                  (label) => (
                    <div key={label} data-graphic-item>
                      <span>{label}</span>
                      <GraphicIcon name="check" />
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
          <span className="visual-caption">{en ? 'Dashboard concept' : 'Concepto de panel'}</span>
        </>
      ) : (
        <>
          <div className="visual-window shop-demo" data-graphic-layer aria-hidden="true">
            <div className="visual-toolbar">
              <Mark />
              <span>{en ? 'Your online store' : 'Tu tienda online'}</span>
            </div>
            <div className="shop-flow">
              {(en ? ['Catalog', 'Checkout', 'Orders'] : ['Catálogo', 'Pago', 'Pedidos']).map((label, i) => (
                <div key={label} data-graphic-item>
                  <span className="shop-step">0{i + 1}</span>
                  <strong>{label}</strong>
                  {i < 2 && <span className="shop-connector">↓</span>}
                </div>
              ))}
            </div>
          </div>
          <span className="visual-caption">{en ? 'The shopping journey' : 'El recorrido de compra'}</span>
        </>
      )}
    </div>
  );
}
