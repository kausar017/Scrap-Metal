import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const scrapShapes = [
  [
    [-1, -0.5],
    [-0.45, -0.72],
    [-0.18, -0.25],
    [0.58, -0.8],
    [0.96, -0.38],
    [0.48, 0.02],
    [0.78, 0.58],
    [0.12, 0.82],
    [-0.24, 0.38],
    [-0.82, 0.7],
    [-0.62, 0.08],
  ],
  [
    [-0.85, -0.72],
    [0.38, -0.94],
    [0.9, -0.35],
    [0.22, -0.08],
    [0.82, 0.56],
    [0.1, 0.82],
    [-0.2, 0.24],
    [-0.92, 0.68],
    [-0.48, -0.05],
  ],
  [
    [-0.92, -0.42],
    [-0.2, -0.8],
    [0.36, -0.48],
    [0.88, -0.64],
    [0.58, -0.04],
    [0.94, 0.52],
    [0.24, 0.34],
    [-0.18, 0.88],
    [-0.44, 0.22],
    [-0.86, 0.62],
  ],
]

const scrapColors = ['#c8753d', '#a8afb2', '#7f898e', '#d38a54']
const scrapCount = 34

function createScrapGeometry(points) {
  const shape = new THREE.Shape()
  shape.moveTo(points[0][0], points[0][1])

  points.slice(1).forEach(([x, y]) => shape.lineTo(x, y))
  shape.closePath()

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.16,
    bevelEnabled: true,
    bevelSegments: 1,
    steps: 1,
    bevelSize: 0.06,
    bevelThickness: 0.04,
  })

  geometry.computeBoundingBox()
  geometry.center()

  return geometry
}

export default function HeroScrapAnimation() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current

    if (!container || !window.matchMedia('(min-width: 761px)').matches) {
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-8, 8, 5, -5, 0.1, 100)
    camera.position.z = 20

    let renderer

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      })
    } catch (error) {
      console.warn('Three.js hero animation could not start:', error)
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0xffffff, 2.2))

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2)
    keyLight.position.set(-3, 5, 10)
    scene.add(keyLight)

    const rimLight = new THREE.PointLight(0xc8753d, 28, 18)
    rimLight.position.set(6, 2, 5)
    scene.add(rimLight)

    const geometries = scrapShapes.map(createScrapGeometry)
    const materials = scrapColors.map(
      (color) =>
        new THREE.MeshStandardMaterial({
          color,
          metalness: 0.72,
          roughness: 0.34,
          transparent: true,
          opacity: 0.84,
          side: THREE.DoubleSide,
        }),
    )

    const scraps = Array.from({ length: scrapCount }, (_, index) => {
      const mesh = new THREE.Mesh(
        geometries[index % geometries.length],
        materials[Math.floor(Math.random() * materials.length)],
      )
      const scale = 0.24 + Math.random() * 0.54

      mesh.scale.set(scale, scale, scale)
      mesh.position.set(
        0,
        (Math.random() - 0.5) * 7.5,
        (Math.random() - 0.5) * 7,
      )
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      )
      mesh.userData.floatOffset = Math.random() * Math.PI * 2
      mesh.userData.floatAmplitude = 0.12 + Math.random() * 0.24
      mesh.userData.rotationSpeed = (Math.random() - 0.5) * 0.18
      mesh.userData.baseY = mesh.position.y
      scene.add(mesh)

      return mesh
    })

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let animationFrame = 0
    let resizeObserver

    function resizeScene() {
      const { width, height } = container.getBoundingClientRect()

      if (!width || !height) {
        return
      }

      const aspect = width / height
      const halfWidth = 5 * aspect
      camera.left = -halfWidth
      camera.right = halfWidth
      camera.top = 5
      camera.bottom = -5
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)

      scraps.forEach((scrap) => {
        scrap.position.x = halfWidth * (0.38 + Math.random() * 0.56)
      })

      renderer.render(scene, camera)
    }

    function renderFrame(time) {
      const seconds = time * 0.001

      scraps.forEach((scrap) => {
        scrap.rotation.x += scrap.userData.rotationSpeed * 0.008
        scrap.rotation.y += scrap.userData.rotationSpeed * 0.014
        scrap.rotation.z += scrap.userData.rotationSpeed * 0.01
        scrap.position.y =
          scrap.userData.baseY +
          Math.sin(seconds * 0.65 + scrap.userData.floatOffset) *
            scrap.userData.floatAmplitude
      })

      renderer.render(scene, camera)
      animationFrame = window.requestAnimationFrame(renderFrame)
    }

    function updateMotion() {
      window.cancelAnimationFrame(animationFrame)

      if (!reducedMotion.matches) {
        animationFrame = window.requestAnimationFrame(renderFrame)
      } else {
        renderer.render(scene, camera)
      }
    }

    resizeObserver = new ResizeObserver(resizeScene)
    resizeObserver.observe(container)
    resizeScene()
    updateMotion()
    reducedMotion.addEventListener('change', updateMotion)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      reducedMotion.removeEventListener('change', updateMotion)
      resizeObserver.disconnect()
      scraps.forEach((scrap) => scene.remove(scrap))
      geometries.forEach((geometry) => geometry.dispose())
      materials.forEach((material) => material.dispose())
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-[1] hidden overflow-hidden opacity-70 min-[761px]:block"
      aria-hidden="true"
    />
  )
}
