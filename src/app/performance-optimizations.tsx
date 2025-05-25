"use client"

import { memo, useMemo, useCallback } from "react"
import { loadSlim } from "tsparticles-slim"

// Optimización para ParticlesBackground
const OptimizedParticlesBackground = memo(() => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  // Memoizar las opciones para evitar re-renders innecesarios
  const starsOptions = useMemo(
    () => ({
      // ... tu configuración actual
      particles: {
        number: {
          value: window.innerWidth < 768 ? 200 : 400, // Menos partículas en móvil
          density: { enable: true, area: 900 },
        },
        // ... resto de la configuración
      },
    }),
    [],
  )

  return (
    // Tu JSX actual
    <></>
  )
})

export default OptimizedParticlesBackground
