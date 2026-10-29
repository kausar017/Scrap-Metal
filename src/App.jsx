import { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import About from './components/pages/About.jsx'
import Contact from './components/pages/Contact.jsx'
import Gallery from './components/pages/Gallery.jsx'
import Footer from './components/shared/Footer.jsx'
import Header from './components/shared/Header.jsx'
import Home from './components/pages/Home.jsx'
import Materials from './components/pages/Materials.jsx'
import Services from './components/pages/Services.jsx'
import { siteContent } from './content/siteContent.js'
import { translateContent } from './lib/translateContent.js'

const SiteMotion = lazy(
  () => import('./components/shared/SiteMotion.jsx'),
)

const languageStorageKey = 'scrap-metal-language'

function getInitialLanguageState() {
  try {
    const savedLanguage =
      window.localStorage.getItem(languageStorageKey) === 'ar' ? 'ar' : 'en'

    return {
      language: 'en',
      selectedLanguage: savedLanguage,
      isTranslating: savedLanguage === 'ar',
    }
  } catch (error) {
    console.error('Unable to read the saved website language:', error)
    return { language: 'en', selectedLanguage: 'en', isTranslating: false }
  }
}

function saveLanguage(language) {
  try {
    window.localStorage.setItem(languageStorageKey, language)
  } catch (error) {
    console.error('Unable to save the website language:', error)
  }
}

export default function App() {
  const [initialLanguageState] = useState(getInitialLanguageState)
  const [language, setLanguage] = useState(initialLanguageState.language)
  const [selectedLanguage, setSelectedLanguage] = useState(
    initialLanguageState.selectedLanguage,
  )
  const [text, setText] = useState(siteContent)
  const [isTranslating, setIsTranslating] = useState(
    initialLanguageState.isTranslating,
  )
  const [translationError, setTranslationError] = useState('')
  const isArabic = language === 'ar'
  const location = useLocation()

  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth')
    document.documentElement.lang = language
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
  }, [isArabic, language])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    if (selectedLanguage === 'en') {
      return
    }

    let isCurrentRequest = true

    async function translateSelectedLanguage() {
      try {
        const translatedText = await translateContent(
          siteContent,
          selectedLanguage,
        )

        if (isCurrentRequest) {
          setText(translatedText)
          setLanguage(selectedLanguage)
          saveLanguage(selectedLanguage)
        }
      } catch (error) {
        if (isCurrentRequest) {
          console.error('Unable to translate website content:', error)
          setSelectedLanguage('en')
          setLanguage('en')
          setText(siteContent)
          saveLanguage('en')
          setTranslationError(
            'Automatic translation is unavailable right now. Please try again later.',
          )
        }
      } finally {
        if (isCurrentRequest) {
          setIsTranslating(false)
        }
      }
    }

    translateSelectedLanguage()

    return () => {
      isCurrentRequest = false
    }
  }, [selectedLanguage])

  function handleLanguageChange(event) {
    const nextLanguage = event.target.value
    setSelectedLanguage(nextLanguage)
    setTranslationError('')

    if (nextLanguage === 'en') {
      setLanguage('en')
      setText(siteContent)
      setIsTranslating(false)
      saveLanguage('en')
      return
    }

    setIsTranslating(true)
  }

  return (
    <main className="min-h-screen min-w-[320px] bg-[#f7f5f1] font-sans text-[#20262b] antialiased selection:bg-[#073b27] selection:text-white">
      <Suspense fallback={null}>
        <SiteMotion />
      </Suspense>
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
      <Routes>
        <Route path="/" element={<Home text={text} isArabic={isArabic} />} />
        <Route path="/materials" element={<Materials text={text} />} />
        <Route path="/services" element={<Services text={text} />} />
        <Route path="/about" element={<About text={text} />} />
        <Route path="/gallery" element={<Gallery text={text} />} />
        <Route path="/contact" element={<Contact text={text} />} />
        <Route path="*" element={<Home text={text} isArabic={isArabic} />} />
      </Routes>
      <Footer text={text} />
    </main>
  )
}
