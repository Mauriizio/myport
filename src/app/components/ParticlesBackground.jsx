"use client"

import { useCallback } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    console.log("Inicializando partículas...")
    await loadSlim(engine)
    console.log("Partículas inicializadas")
  }, [])

  const particlesLoaded = useCallback(async (container) => {
    console.log("Partículas cargadas:", container)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: false,
        },
        background: {
          color: "transparent",
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: ["#00ffea", "#ff00f7", "#00ff00", "#ffffff"],
          },
          shape: {
            type: "char",
            character: {
              value: ["{", "}", "<", ">", "/", "*", "const", "let", "return", "()"],
              font: "monospace",
              weight: "400",
            },
          },
          opacity: {
            value: 0.8,
          },
          size: {
            value: { min: 6, max: 12 },
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "out",
            },
          },
          number: {
            value: 80,
            density: {
              enable: true,
              area: 800,
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
            push: {
              quantity: 4,
            },
          },
        },
        detectRetina: true,
      }}
    />
  )
}