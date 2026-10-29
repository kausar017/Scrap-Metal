import { Link } from 'react-router-dom'

export default function Footer({ text }) {
  return (
    <footer className="bg-[#171c20] text-white">
      <div className="mx-auto flex min-h-[82px] w-[calc(100%-48px)] max-w-[1200px] items-center justify-between gap-6 max-[760px]:min-h-0 max-[760px]:w-[calc(100%-36px)] max-[760px]:max-w-[600px] max-[760px]:flex-wrap max-[760px]:gap-y-3 max-[760px]:py-5">
        <Link
          className="inline-flex shrink-0 items-center rounded bg-white p-[5px] leading-none"
          to="/"
        >
          <img
            className="block h-[70px] w-32 object-contain max-[760px]:h-[58px] max-[760px]:w-[104px]"
            src="/Logo.png"
            alt={text.brand}
          />
        </Link>
        <p className="m-0 text-xs text-white/65 max-[760px]:order-1 max-[760px]:w-full">
          {text.footer}
        </p>
        <Link
          className="inline-flex items-center gap-2 text-xs text-white/65"
          to="/"
        >
          {text.backToTop}
          <span className="text-base text-[#e5a678]" aria-hidden="true">
            ↑
          </span>
        </Link>
      </div>
    </footer>
  )
}
