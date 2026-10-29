import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import * as THREE from 'three'

const desktopParticleCount = 64
const mobileParticleCount = 32

function usePageReveals(pathname) {
  useEffect(() => {
    const targets = document.querySelectorAll(
      'main > section:not(#home), main article, main details, main > footer',
    )
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    targets.forEach((target, index) => {
      target.classList.add('motion-reveal')
      target.style.setProperty(
        '--motion-delay',
        `${Math.min(index % 4, 3) * 70}ms`,
      )
    })

    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('motion-visible'))
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('motion-visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -32px 0px' },
      )

      targets.forEach((target) => observer.observe(target))

      return () => {
        observer.disconnect()
        targets.forEach((target) => {
          target.classList.remove('motion-reveal', 'motion-visible')
          target.style.removeProperty('--motion-delay')
        })
      }
    }

    return () => {
      targets.forEach((target) => {
        target.classList.remove('motion-reveal', 'motion-visible')
        target.style.removeProperty('--motion-delay')
      })
    }
  }, [pathname])
}

export default function SiteMotionCanvas() {
  const canvasHostRef = useRef(null)
  const { pathname } = useLocation()

  usePageReveals(pathname)

  useEffect(() => {
    const host = canvasHostRef.current

    if (!host) {
      return
    }

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    camera.position.z = 3

    let renderer

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      })
    } catch (error) {
      console.warn('Three.js site motion could not start:', error)
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25))
    renderer.setClearColor(0x000000, 0)
    host.appendChild(renderer.domElement)

    const positions = new Float32Array(desktopParticleCount * 3)
    for (let index = 0; index < desktopParticleCount; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 2.8
      positions[index * 3 + 1] = (Math.random() - 0.5) * 2.2
      positions[index * 3 + 2] = (Math.random() - 0.5) * 0.8
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color: 0xc8753d,
      size: 2,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    })
    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    let animationFrame = 0
    let lastFrameTime = 0
    let resizeObserver
    const pointer = { x: 0, y: 0 }

    function updatePointer(event) {
      if (event.pointerType === 'touch' || reducedMotion.matches) {
        return
      }

      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = 1 - (event.clientY / window.innerHeight) * 2
    }

    function resizeScene() {
      const width = host.clientWidth
      const height = host.clientHeight

      if (!width || !height) {
        return
      }

      const aspect = width / height
      camera.left = -aspect
      camera.right = aspect
      camera.top = 1
      camera.bottom = -1
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)

      const count = width < 761 ? mobileParticleCount : desktopParticleCount
      particles.geometry.setDrawRange(0, count)
      renderer.render(scene, camera)
    }

    function renderFrame(time) {
      animationFrame = window.requestAnimationFrame(renderFrame)

      if (time - lastFrameTime < 32) {
        return
      }

      lastFrameTime = time
      particles.rotation.x = pointer.y * 0.035 + Math.sin(time * 0.00006) * 0.015
      particles.rotation.y = pointer.x * 0.045 + Math.sin(time * 0.00007) * 0.02
      particles.rotation.z = Math.sin(time * 0.00008) * 0.035
      particles.position.x = Math.sin(time * 0.00016) * 0.025
      renderer.render(scene, camera)
    }

    function updateMotion() {
      window.cancelAnimationFrame(animationFrame)

      if (!reducedMotion.matches && document.visibilityState === 'visible') {
        animationFrame = window.requestAnimationFrame(renderFrame)
      } else {
        renderer.render(scene, camera)
      }
    }

    function updateVisibility() {
      if (document.visibilityState === 'visible') {
        updateMotion()
      } else {
        window.cancelAnimationFrame(animationFrame)
      }
    }

    resizeObserver = new ResizeObserver(resizeScene)
    resizeObserver.observe(host)
    resizeScene()
    updateMotion()
    reducedMotion.addEventListener('change', updateMotion)
    document.addEventListener('visibilitychange', updateVisibility)
    window.addEventListener('pointermove', updatePointer, { passive: true })

    return () => {
      window.cancelAnimationFrame(animationFrame)
      reducedMotion.removeEventListener('change', updateMotion)
      document.removeEventListener('visibilitychange', updateVisibility)
      window.removeEventListener('pointermove', updatePointer)
      resizeObserver.disconnect()
      scene.remove(particles)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      ref={canvasHostRef}
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden opacity-35"
      aria-hidden="true"
    />
  )
}
