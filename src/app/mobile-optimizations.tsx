"use client"

import { useState, useEffect } from "react"

// Hook para detectar dispositivo móvil
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}

// Componente optimizado para móvil
export default function MobileOptimizedAvatar({ src, size = 200 }) {
  const isMobile = useIsMobile()

  // Reducir efectos en móvil para mejor rendimiento
  const mobileSize = isMobile ? Math.min(size, 150) : size
  const reducedEffects = isMobile

  return (
    <div className={`avatar-container ${reducedEffects ? "mobile-optimized" : ""}`}>
      {/* Tu avatar actual con ajustes para móvil */}
      <style jsx>{`
        .mobile-optimized .avatar-ring {
          filter: none; /* Remover glow en móvil */
        }
        
        .mobile-optimized img {
          filter: none; /* Simplificar filtros */
        }
        
        @media (max-width: 768px) {
          .avatar-container {
            transform: scale(0.8);
          }
        }
      `}</style>
    </div>
  )
}
