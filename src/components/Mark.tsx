export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M11 10h13l9 13 10-13h10L39 31l15 23H41L31 40 20 54H9l16-22L11 10Z" fill="currentColor" />
    </svg>
  );
}
