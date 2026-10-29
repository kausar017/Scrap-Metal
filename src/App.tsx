import { useEffect, useState } from 'react'

type Language = 'en' | 'ar'

const copy = {
  en: {
    brand: 'RE:SOURCE',
    badge: 'A better future starts with what we reuse',
    title: 'Scrap today. Resources for tomorrow.',
    description:
      'A smarter way to buy and sell scrap metal. We are building a reliable marketplace that gives valuable materials a second life.',
    contact: 'Get in touch',
    language: 'العربية',
    footer: 'Building a more circular future, one load at a time.',
  },
  ar: {
    brand: 'ري:سورس',
    badge: 'مستقبل أفضل يبدأ بما نعيد استخدامه',
    title: 'خردة اليوم، موارد الغد.',
    description:
      'طريقة أذكى لشراء وبيع المعادن الخردة. نعمل على إنشاء سوق موثوق يمنح المواد القيّمة حياة جديدة.',
    contact: 'تواصل معنا',
    language: 'English',
    footer: 'نعمل من أجل مستقبل أكثر استدامة، حمولةً بعد حمولة.',
  },
} satisfies Record<Language, Record<string, string>>

function App() {
  const [language, setLanguage] = useState<Language>('en')
  const text = copy[language]
  const isArabic = language === 'ar'

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
  }, [isArabic, language])

  return (
    <main className="min-h-screen bg-base-100 text-base-content">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 sm:px-10">
        <header className="flex items-center justify-between border-b border-base-300 py-6">
          <a
            className="text-xl font-black tracking-[0.16em] text-success"
            href="#home"
            aria-label={text.brand}
          >
            {text.brand}
          </a>
          <button
            className="btn btn-ghost btn-sm"
            type="button"
            onClick={() => setLanguage(isArabic ? 'en' : 'ar')}
            aria-label={`Switch language to ${isArabic ? 'English' : 'Arabic'}`}
          >
            {text.language}
          </button>
        </header>

        <section
          id="home"
          className="hero flex-1 py-20 sm:py-28"
          aria-labelledby="hero-title"
        >
          <div className="hero-content w-full max-w-5xl justify-start px-0">
            <div className="max-w-3xl">
              <span className="badge badge-success badge-outline mb-6 px-4 py-4">
                {text.badge}
              </span>
              <h1
                id="hero-title"
                className="text-5xl font-black leading-[1.08] tracking-tight sm:text-7xl"
              >
                {text.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-base-content/70 sm:text-xl">
                {text.description}
              </p>
              <a className="btn btn-success mt-9" href="mailto:hello@resource.example">
                {text.contact}
                <span aria-hidden="true">{isArabic ? '←' : '→'}</span>
              </a>
            </div>
          </div>
        </section>

        <footer className="border-t border-base-300 py-6 text-sm text-base-content/60">
          {text.footer}
        </footer>
      </div>
    </main>
  )
}

export default App
