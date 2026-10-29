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
    <header className="relative z-30 border-b border-[#e8e5df] bg-white">
      <div className="mx-auto flex min-h-[78px] w-[calc(100%-48px)] max-w-[1200px] items-center justify-between gap-7 max-[760px]:min-h-[68px] max-[760px]:w-[calc(100%-36px)] max-[760px]:max-w-[600px] max-[760px]:gap-3">
        <Link
          className="inline-flex shrink-0 items-center leading-none"
          to="/"
          aria-label={text.brand}
        >
          <img
            className="block h-auto w-[100px]"
            src="/Logo.png"
            alt={text.brand}
          />
        </Link>
        <nav
          className="flex items-center gap-6 max-[760px]:hidden"
          aria-label={text.navLabel}
        >
          {text.nav.map((item) => (
            <Link
              className="text-sm font-semibold text-[#3c4449] transition-colors duration-150 hover:text-[#a95f30] rtl:tracking-normal"
              to={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 max-[760px]:gap-2.5">
          <select
            className="select select-bordered select-sm w-32 bg-white text-sm max-[380px]:w-[100px] max-[380px]:px-2"
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
            className="btn btn-primary btn-sm min-h-[42px] gap-3 px-4 text-sm font-bold leading-tight rtl:tracking-normal max-[760px]:hidden"
            to="/contact"
          >
            {text.quote}
            <ArrowIcon left={isArabic} className="h-4 w-4 shrink-0" />
          </Link>
          <button
            className="btn btn-square btn-ghost min-h-[42px] min-w-[42px] max-[760px]:inline-flex min-[761px]:hidden"
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
          className="absolute inset-x-0 top-full border-t border-[#e8e5df] bg-white px-[18px] pb-5 pt-2 shadow-lg min-[761px]:hidden"
          aria-label={text.navLabel}
        >
          <div className="mx-auto flex w-full max-w-[600px] flex-col">
            {text.nav.map((item) => (
              <Link
                className="border-b border-[#f0eeea] py-3.5 text-sm font-semibold text-[#3c4449] transition-colors hover:text-[#a95f30] rtl:tracking-normal"
                to={item.href}
                key={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              className="btn btn-primary mt-4 min-h-[44px] gap-3 text-sm font-bold rtl:tracking-normal"
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
