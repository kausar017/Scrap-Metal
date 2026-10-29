import { Link } from 'react-router-dom'

export default function Footer({ text }) {
  return (
    <footer className="bg-[#171c20] text-white">
      <div className="mx-auto w-[calc(100%-48px)] max-w-[1200px] py-12 max-[760px]:w-[calc(100%-36px)] max-[760px]:max-w-[600px] max-[760px]:py-9">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              className="inline-flex items-center rounded bg-white p-[5px] leading-none"
              to="/"
            >
              <img
                className="block h-[58px] w-[104px] object-contain"
                src="/Logo.png"
                alt={text.brand}
              />
            </Link>
            <p className="mt-4 max-w-64 text-sm leading-6 text-white/70">
              {text.footer}
            </p>
            <p className="mt-3 text-xs leading-5 text-white/50">
              {text.businessInfo}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-white">{text.quickLinksLabel}</h2>
            <nav className="mt-4 flex flex-col items-start gap-3">
              {text.nav.map((item) => (
                <Link
                  className="text-sm text-white/70 transition-colors hover:text-white"
                  to={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-bold text-white">{text.contactLabel}</h2>
            <a
              className="mt-4 inline-flex text-sm text-white/70 transition-colors hover:text-white"
              href="https://wa.me/966572033243"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp: +966 57 203 3243
            </a>
            <p className="mt-4 text-xs font-semibold text-white/50">
              {text.serviceAreaLabel}
            </p>
            <p className="mt-1 text-sm leading-6 text-white/70">
              {text.serviceAreaValue}
            </p>
            <p className="mt-4 text-xs font-semibold text-white/50">
              {text.businessHoursLabel}
            </p>
            <p className="mt-1 text-sm leading-6 text-white/70">
              {text.businessHoursValue}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-white">{text.legalAndSocialLabel}</h2>
            <p className="mt-4 text-sm text-white/70">{text.privacyPolicy}</p>
            <p className="mt-3 text-sm text-white/70">{text.socialLinks}</p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-white/15 pt-5">
          <p className="m-0 text-xs text-white/50">{text.footer}</p>
          <Link className="text-xs text-white/60 hover:text-white" to="/">
            {text.backToTop} ↑
          </Link>
        </div>
      </div>
    </footer>
  )
}
