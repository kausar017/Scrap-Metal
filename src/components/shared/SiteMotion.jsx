import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const hoverTargets =
  'a.btn, button.btn, main article, main details, .card, header nav a, footer nav a'

export default function SiteMotion() {
  const loaderRef = useRef(null)
  const [showLoader, setShowLoader] = useState(
    () =>
      typeof window !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const { pathname } = useLocation()

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    if (reducedMotion.matches) {
      return
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      if (showLoader && loaderRef.current) {
        const progress = loaderRef.current.querySelector(
          '.site-loader__progress',
        )

        timeline
          .to(progress, {
            scaleX: 1,
            duration: 0.72,
            ease: 'power2.inOut',
          })
          .to(
            loaderRef.current,
            {
              yPercent: -100,
              duration: 0.68,
              ease: 'power3.inOut',
              onComplete: () => setShowLoader(false),
            },
            '-=0.08',
          )
      }

      const header = document.querySelector('header')
      if (header) {
        timeline.fromTo(
          header,
          { y: -16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.56 },
          showLoader ? '-=0.32' : 0,
        )
      }

      const heroCopy = document.querySelector('#home > div:last-child > div')
      if (heroCopy) {
        timeline.fromTo(
          heroCopy,
          { y: 24, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7 },
          showLoader ? '-=0.32' : '-=0.28',
        )
      }

      const sections = gsap.utils.toArray('main > section:not(#home)')
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { y: 22, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.72,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 88%',
              once: true,
            },
          },
        )
      })

      const footer = document.querySelector('footer')
      if (footer) {
        gsap.fromTo(
          footer,
          { y: 18, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.65,
            scrollTrigger: { trigger: footer, start: 'top 95%', once: true },
          },
        )
      }
    })

    function animateHover(event, entering) {
      const target = event.target.closest(hoverTargets)

      if (
        !target ||
        (event.relatedTarget instanceof Node &&
          target.contains(event.relatedTarget))
      ) {
        return
      }

      gsap.to(target, {
        y: entering ? (target.matches('article, .card, details') ? -4 : -2) : 0,
        duration: entering ? 0.22 : 0.3,
        ease: entering ? 'power2.out' : 'power2.inOut',
        overwrite: true,
      })

      const image = target.querySelector('img')
      if (image) {
        gsap.to(image, {
          scale: entering ? 1.045 : 1,
          duration: entering ? 0.55 : 0.4,
          ease: 'power2.out',
          overwrite: true,
        })
      }
    }

    const onPointerOver = (event) => animateHover(event, true)
    const onPointerOut = (event) => animateHover(event, false)

    document.addEventListener('pointerover', onPointerOver)
    document.addEventListener('pointerout', onPointerOut)

    return () => {
      context.revert()
      document.removeEventListener('pointerover', onPointerOver)
      document.removeEventListener('pointerout', onPointerOut)
    }
  }, [pathname, showLoader])

  return showLoader ? (
    <div
      className="site-loader"
      ref={loaderRef}
      role="status"
      aria-label="Loading website"
    >
      <img className="site-loader__logo" src="/Logo.png" alt="" />
      <span className="site-loader__track" aria-hidden="true">
        <span className="site-loader__progress" />
      </span>
    </div>
  ) : null
}
