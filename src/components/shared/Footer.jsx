import { Link } from 'react-router-dom'

const socialPlatforms = ['WhatsApp', 'Facebook', 'Instagram', 'LinkedIn', 'YouTube']

function SocialIcon({ platform }) {
  const commonProps = {
    'aria-hidden': true,
    className: 'h-5 w-5 fill-current',
    viewBox: '0 0 24 24',
  }

  if (platform === 'WhatsApp') {
    return (
      <svg {...commonProps}>
        <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.97L2 22l5.18-1.36A9.93 9.93 0 1 0 12.04 2Zm0 18.05a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.08.81.82-3-.2-.31a8.13 8.13 0 1 1 6.89 3.81Zm4.46-6.09c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.01-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.15 1.52.09.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
      </svg>
    )
  }

  if (platform === 'Facebook') {
    return (
      <svg {...commonProps}>
        <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.6-4.3 4.4V10H7v3h2.9v8h3.6Z" />
      </svg>
    )
  }

  if (platform === 'Instagram') {
    return (
      <svg {...commonProps} fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (platform === 'LinkedIn') {
    return (
      <svg {...commonProps}>
        <path d="M5.2 8.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM3.5 10h3.4v10H3.5V10Zm5.3 0h3.3v1.4h.1c.5-.9 1.6-1.8 3.3-1.8 3.5 0 4.1 2.3 4.1 5.2V20h-3.4v-4.6c0-1.1 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5V20H8.8V10Z" />
      </svg>
    )
  }

  return (
    <svg {...commonProps}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
    </svg>
  )
}

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
                src="/logo.png"
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
            <div
              className="mt-4 flex flex-wrap items-center gap-2.5"
              role="group"
              aria-label={text.socialLinks}
            >
              {socialPlatforms.map((platform) => (
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/85"
                  key={platform}
                  role="img"
                  aria-label={platform}
                  title={platform}
                >
                  <SocialIcon platform={platform} />
                </span>
              ))}
            </div>
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
