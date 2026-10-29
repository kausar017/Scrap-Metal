import ArrowIcon from './ArrowIcon.jsx'

export default function Header({
  text,
  isArabic,
  selectedLanguage,
  isTranslating,
  onLanguageChange,
}) {
  return (
    <header className="relative z-10 border-b border-[#e8e5df] bg-white">
      <div className="mx-auto flex min-h-[78px] w-[calc(100%-48px)] max-w-[1200px] items-center justify-between gap-7 max-[760px]:min-h-[68px] max-[760px]:w-[calc(100%-36px)] max-[760px]:max-w-[600px] max-[760px]:gap-3">
        <a
          className="inline-flex shrink-0 items-center leading-none"
          href="#home"
          aria-label={text.brand}
        >
          <img
            className="block h-auto w-[100px]"
            src="/Logo.png"
            alt={text.brand}
          />
        </a>
        <nav
          className="flex items-center gap-6 max-[760px]:hidden"
          aria-label={text.navLabel}
        >
          {text.nav.map((item) => (
            <a
              className="text-sm font-semibold text-[#3c4449] transition-colors duration-150 hover:text-[#a95f30] rtl:tracking-normal"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4 max-[760px]:gap-2.5">
          <select
            className="select select-bordered select-sm w-32 bg-white text-sm"
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
          <a
            className="btn btn-primary btn-sm min-h-[42px] gap-3 px-4 text-sm font-bold leading-tight rtl:tracking-normal max-[760px]:hidden"
            href="#contact"
          >
            {text.quote}
            <ArrowIcon left={isArabic} className="h-4 w-4 shrink-0" />
          </a>
        </div>
      </div>
    </header>
  )
}
