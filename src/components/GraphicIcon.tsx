const paths: Record<string, string> = {
  mail: 'M3 5h18v14H3z M3 5l9 8 9-8',
  brand: 'M12 3l9 9-9 9-9-9z M12 7v10 M7 12h10',
  automation: 'M8 3v5H3 M16 21v-5h5 M3 8a9 9 0 0 1 16-3 M21 16A9 9 0 0 1 5 19',
  chat: 'M4 4h16v12H9l-5 4z M8 9h8 M8 12h5',
  check: 'M5 12l4 4L19 6',
  code: 'M8 6l-6 6 6 6 M16 6l6 6-6 6 M14 3l-4 18',
  key: 'M14 3a7 7 0 1 1-5 12L3 21H1v-4l7-7a7 7 0 0 1 6-7z M16 7h.01',
  search: 'M16 16l6 6 M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16',
  support: 'M3 13v-1a9 9 0 0 1 18 0v1 M3 12h4v7H3z M17 12h4v7h-4z M21 19q0 3-9 3',
  document: 'M5 2h10l4 4v16H5z M15 2v5h4 M8 11h8 M8 15h8 M8 19h5',
  // Panel only.
  inbox: 'M3 13h5l2 3h4l2-3h5 M5 4h14l2 9v7H3v-7z',
  grid: 'M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z',
  logout: 'M15 4h4v16h-4 M10 8l-4 4 4 4 M6 12h10',
  trash: 'M4 7h16 M9 7V4h6v3 M6 7l1 13h10l1-13',
  archive: 'M3 4h18v5H3z M5 9v11h14V9 M10 13h4',
  undo: 'M9 14L4 9l5-5 M4 9h10a6 6 0 0 1 0 12h-3',
};

export function GraphicIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.check} />
    </svg>
  );
}
