"use client"

import { useEffect } from "react"

export default function NeonStartupEffect() {
  useEffect(() => {
    // Elementos que queremos encender
    const avatarElement = document.querySelector(".avatar-container") || document.querySelector("svg circle")
    const avatarCircle = avatarElement?.querySelector("circle") || avatarElement

    // Todas las imágenes dentro del avatar (sin importar cuántas capas tenga)
    const avatarImages = document.querySelectorAll(".avatar-container img")

    const titleElement = document.querySelector("h1.neon-text")
    const titleSpans = titleElement ? Array.from(titleElement.querySelectorAll("span")) : []

    const buttonElements = Array.from(document.querySelectorAll(".button-row svg")) || []
    const buttonRects = buttonElements.map((btn) => btn.querySelector("rect"))

    // Crear elementos de audio para los efectos de sonido
    const createAudio = (src) => {
      const audio = document.createElement("audio")
      audio.src = src
      audio.preload = "auto"
      return audio
    }

    // Efectos de sonido
    const flickerSound = createAudio("/sounds/electric-flicker.mp3")
    flickerSound.volume = 0.3 // Ajustar volumen

    // Función para apagar inicialmente todos los elementos
    const initiallyTurnOff = () => {
      // Apagar el avatar
      if (avatarCircle) {
        avatarCircle.dataset.originalStroke = avatarCircle.getAttribute("stroke")
        avatarCircle.dataset.originalFilter = avatarCircle.getAttribute("filter") || "url(#glow)"
        avatarCircle.setAttribute("stroke", "rgba(0, 255, 255, 0.1)")
        avatarCircle.setAttribute("filter", "none")
      }

      // Ocultar TODAS las imágenes del avatar
      if (avatarImages && avatarImages.length > 0) {
        avatarImages.forEach((img) => {
          img.style.transition = "none"
          img.style.opacity = "0" // Aseguramos que todas las imágenes estén ocultas
        })
      }

      // Apagar las letras del título
      if (titleSpans.length > 0) {
        titleSpans.forEach((span) => {
          // Guardar los estilos originales
          span.dataset.originalColor = getComputedStyle(span).color
          span.dataset.originalShadow = getComputedStyle(span).textShadow

          // Apagar la letra
          span.style.transition = "none"
          span.style.color = "rgba(255, 255, 255, 0.1)"
          span.style.textShadow = "none"
        })
      }

      // Apagar los botones
      buttonRects.forEach((rect) => {
        if (rect) {
          rect.dataset.originalStroke = rect.getAttribute("stroke")
          rect.dataset.originalFilter = rect.getAttribute("filter") || "url(#glow)"
          rect.setAttribute("stroke", "rgba(0, 255, 255, 0.1)")
          rect.setAttribute("filter", "none")
        }
      })
    }

    // Función para encender el avatar con su aro
    const turnOnAvatar = () => {
      return new Promise((resolve) => {
        if (avatarCircle) {
          // Encender el aro neón
          avatarCircle.setAttribute("stroke", avatarCircle.dataset.originalStroke)
          avatarCircle.setAttribute("filter", avatarCircle.dataset.originalFilter)
        }

        // Mostrar todas las imágenes del avatar gradualmente
        if (avatarImages && avatarImages.length > 0) {
          avatarImages.forEach((img) => {
            img.style.transition = "opacity 1s ease-in"
            img.style.opacity = "1"
          })
        }

        // Resolver después de 1 segundo
        setTimeout(resolve, 1000)
      })
    }

    // Función para encender todas las letras del título, con una fallando
    const turnOnTitle = () => {
      return new Promise((resolve) => {
        if (titleSpans.length === 0) return resolve()

        // Elegir una letra aleatoria para que falle (evitando espacios)
        let failingLetterIndex
        do {
          failingLetterIndex = Math.floor(Math.random() * titleSpans.length)
        } while (titleSpans[failingLetterIndex].textContent.trim() === "")

        // Encender todas las letras excepto la que falla
        titleSpans.forEach((span, index) => {
          if (index !== failingLetterIndex) {
            span.style.transition = "color 0.5s ease, text-shadow 0.5s ease"
            span.style.color = span.dataset.originalColor
            span.style.textShadow = span.dataset.originalShadow
          }
        })

        // Hacer que la letra que falla parpadee
        const failingLetter = titleSpans[failingLetterIndex]
        let flickerCount = 0
        const maxFlickers = 5

        const flickerLetter = () => {
          // Reproducir sonido de parpadeo
          flickerSound.currentTime = 0
          flickerSound.play().catch((e) => console.log("Error reproduciendo sonido:", e))

          // Encender
          failingLetter.style.color = failingLetter.dataset.originalColor
          failingLetter.style.textShadow = failingLetter.dataset.originalShadow

          setTimeout(
            () => {
              // Apagar
              failingLetter.style.color = "rgba(255, 255, 255, 0.1)"
              failingLetter.style.textShadow = "none"

              flickerCount++

              if (flickerCount < maxFlickers) {
                // Continuar parpadeando
                setTimeout(flickerLetter, 100 + Math.random() * 200)
              } else {
                // Encender definitivamente
                setTimeout(() => {
                  failingLetter.style.color = failingLetter.dataset.originalColor
                  failingLetter.style.textShadow = failingLetter.dataset.originalShadow
                  resolve()
                }, 200)
              }
            },
            50 + Math.random() * 100,
          )
        }

        // Iniciar el parpadeo
        flickerLetter()
      })
    }

    // Función para encender los botones uno a uno, con uno fallando
    const turnOnButtons = () => {
      return new Promise(async (resolve) => {
        if (buttonRects.length === 0) return resolve()

        // Elegir un botón aleatorio para que falle
        const failingButtonIndex = Math.floor(Math.random() * buttonRects.length)

        // Encender los botones uno a uno
        for (let i = 0; i < buttonRects.length; i++) {
          const rect = buttonRects[i]

          if (!rect) continue

          if (i !== failingButtonIndex) {
            // Botón normal - se enciende sin problemas
            rect.setAttribute("stroke", rect.dataset.originalStroke)
            rect.setAttribute("filter", rect.dataset.originalFilter)
            await new Promise((r) => setTimeout(r, 300 + Math.random() * 200))
          } else {
            // Botón que falla - parpadea varias veces
            let flickerCount = 0
            const maxFlickers = 4

            const flickerButton = () => {
              // Reproducir sonido de parpadeo
              flickerSound.currentTime = 0
              flickerSound.play().catch((e) => console.log("Error reproduciendo sonido:", e))

              // Encender
              rect.setAttribute("stroke", rect.dataset.originalStroke)
              rect.setAttribute("filter", rect.dataset.originalFilter)

              setTimeout(
                () => {
                  // Apagar
                  rect.setAttribute("stroke", "rgba(0, 255, 255, 0.1)")
                  rect.setAttribute("filter", "none")

                  flickerCount++

                  if (flickerCount < maxFlickers) {
                    // Continuar parpadeando
                    setTimeout(flickerButton, 100 + Math.random() * 150)
                  } else {
                    // Encender definitivamente
                    setTimeout(() => {
                      rect.setAttribute("stroke", rect.dataset.originalStroke)
                      rect.setAttribute("filter", rect.dataset.originalFilter)
                    }, 200)
                  }
                },
                50 + Math.random() * 100,
              )
            }

            // Iniciar el parpadeo
            flickerButton()
            await new Promise((r) => setTimeout(r, 1000)) // Esperar a que termine de parpadear
          }
        }

        resolve()
      })
    }

    // Secuencia de encendido principal
    const startupSequence = async () => {
      // Apagar todo inicialmente
      initiallyTurnOff()

      // Esperar 1 segundo en la oscuridad
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Encender el avatar con su aro
      await turnOnAvatar()

      // Encender el título con una letra fallando
      await turnOnTitle()

      // Encender los botones uno a uno, con uno fallando
      await turnOnButtons()
    }

    // Iniciar la secuencia
    startupSequence()
  }, [])

  return null // Este componente no renderiza nada visible
}
