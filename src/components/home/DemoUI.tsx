import { Icon, type IconName } from '@/components/Icon';
import type { Lang } from '@/lib/i18n';

/*
 * Illustrative interfaces: what Thexify builds, shown working. Generic sample
 * data on purpose (a neutral app name, placeholder companies), never presented
 * as Thexify's own customers or metrics. Every instance is aria-hidden and the
 * page gives a plain-text description next to it.
 */

const copy = {
  es: {
    app: 'Tu panel',
    nav: ['Inicio', 'Pedidos', 'Clientes', 'Productos', 'Analítica', 'Configuración'],
    orders: 'Pedidos',
    search: 'Buscar pedidos…',
    chips: [
      ['Todos', '124'],
      ['Pendientes', '12'],
      ['En proceso', '8'],
      ['Completados', '104'],
    ],
    cols: ['ID', 'Cliente', 'Fecha', 'Estado', 'Total'],
    rows: [
      ['#1024', 'Acme S.A.', '12 oct', 'Completado', 'done', '$249.00'],
      ['#1023', 'Pixel Studio', '11 oct', 'En proceso', 'progress', '$129.00'],
      ['#1022', 'Nova Tech', '10 oct', 'Pendiente', 'pending', '$89.00'],
    ],
    automations: 'Automatizaciones',
    nodes: [
      ['webhook', 'Nuevo cliente', 'Webhook'],
      ['database', 'Crear registro', 'Base de datos'],
      ['mail', 'Enviar email', 'Notificación'],
      ['check', 'Crear tarea', 'Productividad'],
    ],
    assistant: 'Asistente',
    question: '¿Cuál es el estado de mi pedido #1023?',
    answer:
      'Tu pedido #1023 está en proceso de preparación. Será despachado mañana y recibirás el número de seguimiento por correo electrónico.',
    time: 'Hoy, 10:24',
    input: 'Escribe un mensaje…',
    stats: [
      ['Usuarios activos', '4.892', '+12%'],
      ['Pedidos del mes', '1.284', '+9%'],
      ['Conversión', '3,6%', '+7%'],
    ],
    growth: 'Crecimiento de usuarios',
    latest: 'Últimos clientes',
    clients: [
      ['Acme S.A.', 'Pro'],
      ['Pixel Studio', 'Business'],
      ['Nova Tech', 'Starter'],
      ['Lumen Co.', 'Pro'],
    ],
    active: 'Activo',
    chatQuestion: '¿Tienen turnos disponibles para mañana?',
    chatAnswer: 'Sí. Hay espacio a las 10:00 y a las 16:30. ¿Te reservo uno de esos horarios?',
    chatReply: 'El de las 10:00, por favor.',
    chatConfirm: 'Listo, quedó reservado para mañana a las 10:00. Te envié la confirmación por correo.',
  },
  en: {
    app: 'Your dashboard',
    nav: ['Home', 'Orders', 'Customers', 'Products', 'Analytics', 'Settings'],
    orders: 'Orders',
    search: 'Search orders…',
    chips: [
      ['All', '124'],
      ['Pending', '12'],
      ['In progress', '8'],
      ['Completed', '104'],
    ],
    cols: ['ID', 'Customer', 'Date', 'Status', 'Total'],
    rows: [
      ['#1024', 'Acme Inc.', 'Oct 12', 'Completed', 'done', '$249.00'],
      ['#1023', 'Pixel Studio', 'Oct 11', 'In progress', 'progress', '$129.00'],
      ['#1022', 'Nova Tech', 'Oct 10', 'Pending', 'pending', '$89.00'],
    ],
    automations: 'Automations',
    nodes: [
      ['webhook', 'New customer', 'Webhook'],
      ['database', 'Create record', 'Database'],
      ['mail', 'Send email', 'Notification'],
      ['check', 'Create task', 'Productivity'],
    ],
    assistant: 'Assistant',
    question: 'What is the status of my order #1023?',
    answer: 'Order #1023 is being prepared. It ships tomorrow and you will get the tracking number by email.',
    time: 'Today, 10:24',
    input: 'Write a message…',
    stats: [
      ['Active users', '4,892', '+12%'],
      ['Monthly orders', '1,284', '+9%'],
      ['Conversion', '3.6%', '+7%'],
    ],
    growth: 'User growth',
    latest: 'Latest customers',
    clients: [
      ['Acme S.A.', 'Pro'],
      ['Pixel Studio', 'Business'],
      ['Nova Tech', 'Starter'],
      ['Lumen Co.', 'Pro'],
    ],
    active: 'Active',
    chatQuestion: 'Do you have any appointments tomorrow?',
    chatAnswer: 'Yes. There are openings at 10:00 and 16:30. Shall I book one of them for you?',
    chatReply: 'The 10:00 one, please.',
    chatConfirm: 'Done, you are booked for tomorrow at 10:00. I sent the confirmation to your email.',
  },
} as const;

const navIcons: IconName[] = ['home', 'cart', 'users', 'box', 'chart', 'gear'];

function AppMark() {
  return (
    <span className="ui-appmark" aria-hidden="true">
      <i></i>
    </span>
  );
}

export function OrdersCard({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <div className="ui-card ui-orders">
      <aside className="ui-side">
        <div className="ui-brand">
          <AppMark />
          <span>{t.app}</span>
        </div>
        {t.nav.map((item, i) => (
          <span key={item} className={`ui-nav${i === 1 ? ' is-active' : ''}`}>
            <Icon name={navIcons[i]} />
            {item}
          </span>
        ))}
      </aside>
      <div className="ui-main">
        <div className="ui-topbar">
          <strong>{t.orders}</strong>
          <span className="ui-search">
            <Icon name="search" />
            {t.search}
          </span>
        </div>
        <div className="ui-chips">
          {t.chips.map(([label, count], i) => (
            <span key={label} className={i === 0 ? 'is-active' : undefined}>
              {label} <b>{count}</b>
            </span>
          ))}
        </div>
        <div className="ui-table">
          <div className="ui-row ui-head">
            {t.cols.map((col) => (
              <span key={col}>{col}</span>
            ))}
          </div>
          {t.rows.map(([id, client, date, status, tone, total]) => (
            <div key={id} className="ui-row">
              <span>{id}</span>
              <span>{client}</span>
              <span>{date}</span>
              <span>
                <em className={`ui-status ui-status--${tone}`}>{status}</em>
              </span>
              <span>{total}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AutomationCard({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [first, second, mail, task] = t.nodes;
  const node = ([icon, title, kind]: readonly string[]) => (
    <span className="ui-node">
      <Icon name={icon as IconName} />
      <span>
        <b>{title}</b>
        <small>{kind}</small>
      </span>
    </span>
  );
  return (
    <div className="ui-card ui-automation">
      <div className="ui-rail">
        <Icon name="bolt" />
        <Icon name="inbox" />
        <Icon name="doc" />
        <Icon name="calendar" />
      </div>
      <div className="ui-flow">
        <strong className="ui-flow-title">{t.automations}</strong>
        <div className="ui-flow-graph">
          <div className="ui-flow-start">
            {node(first)}
            <i className="ui-wire"></i>
            {node(second)}
          </div>
          <svg className="ui-branch" viewBox="0 0 40 80" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 40h12c8 0 8-8 8-16V18c0-8 4-12 12-12h8M20 40v16c0 8 4 12 12 12h8" />
          </svg>
          <div className="ui-flow-end">
            {node(mail)}
            {node(task)}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AssistantCard({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <div className="ui-card ui-assistant">
      <div className="ui-chat-head">
        <Icon name="spark" />
        <strong>{t.assistant}</strong>
        <span>· Claude</span>
      </div>
      <div className="ui-chat">
        <p className="ui-msg ui-msg--user">
          {t.question}
          <span className="ui-avatar">
            <Icon name="user" />
          </span>
        </p>
        <div className="ui-msg ui-msg--bot">
          <span className="ui-bot">
            <Icon name="spark" />
          </span>
          <p>{t.answer}</p>
        </div>
        <span className="ui-time">{t.time}</span>
      </div>
      <div className="ui-input">
        <span>{t.input}</span>
        <Icon name="send" />
      </div>
    </div>
  );
}

export function MiniDashboard({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <div className="mini-ui mini-dashboard">
      <aside>
        <div className="ui-brand">
          <AppMark />
          <span>{t.app}</span>
        </div>
        {t.nav.slice(0, 5).map((item, i) => (
          <span key={item} className={`ui-nav${i === 0 ? ' is-active' : ''}`}>
            <Icon name={navIcons[i]} />
            {item}
          </span>
        ))}
      </aside>
      <div className="mini-dash-main">
        <div className="mini-stats">
          {t.stats.map(([label, value, delta]) => (
            <span key={label}>
              <small>{label}</small>
              <b>{value}</b>
              <em>{delta}</em>
            </span>
          ))}
        </div>
        <div className="mini-panels">
          <div className="mini-chart">
            <small>{t.growth}</small>
            <svg viewBox="0 0 200 90" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="mini-chart-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#2fd79b" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#2fd79b" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 78 22 70 40 72 60 60 80 62 100 50 118 52 138 38 158 34 176 22 200 8V90H0Z"
                fill="url(#mini-chart-fill)"
              />
              <path
                d="M0 78 22 70 40 72 60 60 80 62 100 50 118 52 138 38 158 34 176 22 200 8"
                fill="none"
                stroke="#2fd79b"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
          <div className="mini-list">
            <small>{t.latest}</small>
            {t.clients.map(([name, plan]) => (
              <span key={name}>
                <b>{name}</b>
                <i>{plan}</i>
                <em>{t.active}</em>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MiniChat({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <div className="mini-ui mini-chat">
      <div className="ui-chat-head">
        <Icon name="spark" />
        <strong>Claude</strong>
        <span className="mini-live" />
      </div>
      <p className="ui-msg ui-msg--user">{t.chatQuestion}</p>
      <div className="ui-msg ui-msg--bot">
        <span className="ui-bot">
          <Icon name="spark" />
        </span>
        <p>{t.chatAnswer}</p>
      </div>
      <p className="ui-msg ui-msg--user">{t.chatReply}</p>
      <div className="ui-msg ui-msg--bot">
        <span className="ui-bot">
          <Icon name="spark" />
        </span>
        <p>{t.chatConfirm}</p>
      </div>
      <div className="ui-input">
        <span>{t.input}</span>
        <Icon name="send" />
      </div>
    </div>
  );
}
