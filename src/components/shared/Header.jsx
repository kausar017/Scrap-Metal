import { useState } from 'react'
import ArrowIcon from './ArrowIcon.jsx'
import { Link } from 'react-router-dom'

export default function Header({
  text,
  isArabic,
  selectedLanguage,
  isTranslating,
  onLanguageChange,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative z-30 border-b border-[#14533a] bg-[#073b27] text-white">
      <div className="bg-[#052819]">
        <div className="mx-auto flex min-h-8 w-[calc(100%-48px)] max-w-[1200px] items-center text-[11px] font-medium tracking-wide text-white/75 max-[760px]:w-[calc(100%-36px)] max-[760px]:max-w-[600px]">
          <span className="me-2 h-1.5 w-1.5 rounded-full bg-white" />
          {text.heroNote}
        </div>
      </div>
      <div className="mx-auto flex min-h-[78px] w-[calc(100%-48px)] max-w-[1200px] items-center justify-between gap-7 max-[760px]:min-h-[68px] max-[760px]:w-[calc(100%-36px)] max-[760px]:max-w-[600px] max-[760px]:gap-3">
        <Link
          className="inline-flex shrink-0 items-center self-stretch bg-white pe-7 ps-4 leading-none [clip-path:polygon(0_0,100%_0,88%_100%,0_100%)] max-[760px]:pe-5 max-[760px]:ps-2"
          to="/"
          aria-label={text.brand}
        >
          <img
            className="block h-auto w-[124px] max-[380px]:w-[110px]"
            src="/logo.png"
            alt={text.brand}
          />
        </Link>
        <nav
          className="flex items-center gap-6 max-[760px]:hidden"
          aria-label={text.navLabel}
        >
          {text.nav.map((item) => (
            <Link
              className="text-sm font-semibold text-white/85 transition-colors duration-150 hover:text-white rtl:tracking-normal"
              to={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 max-[760px]:gap-2.5">
          <select
            className="select select-bordered select-sm w-32 border-white/30 bg-[#0b452f] text-sm text-white max-[380px]:w-[100px] max-[380px]:px-2"
            value={selectedLanguage}
            onChange={onLanguageChange}
            aria-label={text.languageLabel}
            disabled={isTranslating}
          >
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </select>
          {isTranslating && (
            <span
              className="loading loading-spinner loading-sm text-primary"
              aria-label={text.translating}
            />
          )}
          <Link
            className="btn btn-sm min-h-[44px] gap-3 rounded-none border-white bg-white px-4 text-sm font-extrabold leading-tight text-[#073b27] hover:border-white/90 hover:bg-white/90 rtl:tracking-normal max-[760px]:hidden"
            to="/contact"
          >
            {text.quote}
            <ArrowIcon left={isArabic} className="h-4 w-4 shrink-0" />
          </Link>
          <button
            className="btn btn-square min-h-[42px] min-w-[42px] rounded-none border-white/35 bg-transparent text-white hover:border-white hover:bg-white/10 max-[760px]:inline-flex min-[761px]:hidden"
            type="button"
            aria-label={text.navLabel}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="m18 6-12 12M6 6l12 12" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          className="absolute inset-x-0 top-full border-t border-white/15 bg-[#073b27] px-[18px] pb-5 pt-2 shadow-lg min-[761px]:hidden"
          aria-label={text.navLabel}
        >
          <div className="mx-auto flex w-full max-w-[600px] flex-col">
            {text.nav.map((item) => (
              <Link
                className="border-b border-white/15 py-3.5 text-sm font-semibold text-white/85 transition-colors hover:text-white rtl:tracking-normal"
                to={item.href}
                key={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              className="btn mt-4 min-h-[44px] gap-3 rounded-none border-white bg-white text-sm font-extrabold text-[#073b27] hover:border-white/90 hover:bg-white/90 rtl:tracking-normal"
              to="/contact"
              onClick={() => setIsMenuOpen(false)}
            >
              {text.quote}
              <ArrowIcon left={isArabic} className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
