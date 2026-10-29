export default function ArrowIcon({ left = false, className = 'h-4 w-4' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      {left ? (
        <path
          className="stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]"
          d="M19 12H5m0 0 7 7m-7-7 7-7"
        />
      ) : (
        <path
          className="stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]"
          d="M5 12h14m0 0-7-7m7 7-7 7"
        />
      )}
    </svg>
  )
}
