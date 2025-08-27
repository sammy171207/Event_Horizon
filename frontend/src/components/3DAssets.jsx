import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const ThreeDAssets = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    // Create floating 3D elements
    const createFloatingElement = (x, y, size, color, delay) => {
      const element = document.createElement('div')
      element.className = 'absolute rounded-full opacity-20 blur-sm'
      element.style.left = `${x}%`
      element.style.top = `${y}%`
      element.style.width = `${size}px`
      element.style.height = `${size}px`
      element.style.background = color
      element.style.transform = 'translateZ(0)'
      
      containerRef.current?.appendChild(element)
      
      // Animate the element
      gsap.to(element, {
        y: -30,
        x: Math.random() * 20 - 10,
        rotation: 360,
        duration: 3 + Math.random() * 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        delay: delay
      })
    }

    // Create multiple floating elements
    const colors = [
      'linear-gradient(45deg, #3b82f6, #8b5cf6)',
      'linear-gradient(45deg, #8b5cf6, #ec4899)',
      'linear-gradient(45deg, #06b6d4, #3b82f6)',
      'linear-gradient(45deg, #f59e0b, #ef4444)',
      'linear-gradient(45deg, #10b981, #3b82f6)'
    ]

    for (let i = 0; i < 8; i++) {
      const x = Math.random() * 100
      const y = Math.random() * 100
      const size = 40 + Math.random() * 80
      const color = colors[Math.floor(Math.random() * colors.length)]
      const delay = Math.random() * 2
      
      createFloatingElement(x, y, size, color, delay)
    }

    // Mouse move effect for 3D parallax
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      const x = (clientX / innerWidth - 0.5) * 20
      const y = (clientY / innerHeight - 0.5) * 20
      
      gsap.to('.parallax-3d', {
        x: x,
        y: y,
        duration: 0.5,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      // Clean up created elements
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* 3D Geometric Shapes */}
      <div className="parallax-3d absolute top-20 right-20 w-32 h-32 transform rotate-45 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-lg backdrop-blur-sm"></div>
      <div className="parallax-3d absolute bottom-40 left-20 w-24 h-24 transform -rotate-12 bg-gradient-to-br from-pink-500/30 to-red-500/30 rounded-full backdrop-blur-sm"></div>
      <div className="parallax-3d absolute top-1/2 left-1/4 w-20 h-20 transform rotate-90 bg-gradient-to-br from-green-500/30 to-blue-500/30 rounded-lg backdrop-blur-sm"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid-pattern"></div>
      </div>
    </div>
  )
}

export default ThreeDAssets

