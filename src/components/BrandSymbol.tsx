/** Official symbol: the asymmetric X in ink on the signal-green rounded square. */
export function BrandSymbol({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="#2FD79B" />
      <path d="M11 10h13l9 13 10-13h10L39 31l15 23H41L31 40 20 54H9l16-22L11 10Z" fill="#101110" />
    </svg>
  );
}
