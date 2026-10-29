import { useEffect, useState } from 'react'
import Footer from './components/shared/Footer.jsx'
import Header from './components/shared/Header.jsx'
import Home from './components/pages/Home.jsx'
import { siteContent } from './content/siteContent.js'
import { translateContent } from './lib/translateContent.js'

export default function App() {
  const [language, setLanguage] = useState('en')
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [text, setText] = useState(siteContent)
  const [isTranslating, setIsTranslating] = useState(false)
  const [translationError, setTranslationError] = useState('')
  const isArabic = language === 'ar'

  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth')
    document.documentElement.lang = language
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
  }, [isArabic, language])

  async function handleLanguageChange(event) {
    const nextLanguage = event.target.value
    setSelectedLanguage(nextLanguage)
    setTranslationError('')

    if (nextLanguage === 'en') {
      setLanguage('en')
      setText(siteContent)
      return
    }

    setIsTranslating(true)

    try {
      const translatedText = await translateContent(siteContent, nextLanguage)
      setText(translatedText)
      setLanguage(nextLanguage)
    } catch (error) {
      console.error('Unable to translate website content:', error)
      setSelectedLanguage(language)
      setTranslationError(
        'Automatic translation is unavailable right now. Please try again later.',
      )
    } finally {
      setIsTranslating(false)
    }
  }

  return (
    <main className="min-h-screen min-w-[320px] bg-[#f7f5f1] font-sans text-[#20262b] antialiased selection:bg-[#c8753d] selection:text-white">
      <Header
        text={text}
        isArabic={isArabic}
        selectedLanguage={selectedLanguage}
        isTranslating={isTranslating}
        onLanguageChange={handleLanguageChange}
      />
      {translationError && (
        <div
          className="alert alert-error mx-auto my-4 w-[calc(100%-48px)] max-w-[1200px]"
          role="alert"
        >
          <span>{translationError}</span>
        </div>
      )}
      <Home text={text} isArabic={isArabic} />
      <Footer text={text} />
    </main>
  )
}
