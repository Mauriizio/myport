"use client"

import { useEffect } from "react"
import gsap from "gsap"

export default function NeonStartupEffect() {
  useEffect(() => {
    // Elementos que queremos encender
    const avatarContainer = document.querySelector(".avatar-container")
    const avatarRing = document.querySelector(".avatar-ring") || document.getElementById("avatar-ring")
    const avatarImages = document.querySelectorAll(".avatar-container img")
    const avatarBlur = document.getElementById("avatarBlur")

    // Obtener los contenedores de las imágenes
    const baseImageContainer = document.querySelector(".avatar-container > div:first-of-type")
    const topImageContainer = document.querySelector(".avatar-container > div:last-of-type")

    const titleElement = document.querySelector("h1.neon-text")
    const titleSpans = titleElement ? Array.from(titleElement.querySelectorAll("span")) : []

    const buttonElements = Array.from(document.querySelectorAll(".neon-button-svg svg")) || []
    const buttonRects = buttonElements.map((btn) => btn.querySelector("rect"))
    const buttonBlurs = buttonElements.map((btn) => btn.querySelector("feGaussianBlur"))

    // Crear elementos de audio para los efectos de sonido
    const createAudio = (src) => {
      const audio = document.createElement("audio")
      audio.src = src
      audio.preload = "auto"
      return audio
    }

    // Efectos de sonido
    const flickerSound = createAudio("/sounds/flicker.mp3")
    flickerSound.volume = 0.3 // Ajustar volumen

    // Función para apagar inicialmente solo el texto y los botones (no el avatar)
    const initiallyTurnOff = () => {
      // El avatar ya está encendido desde el inicio, no lo apagamos
      // Iniciamos la animación del glow para el avatar
      if (avatarBlur) {
        gsap.to(avatarBlur, {
          attr: { stdDeviation: "5" },
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: "sine.inOut",
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

    // Función para hacer parpadear una letra específica del título con estados apagados
    const flickerSpecificLetter = (letterIndex, shouldStayOff = false) => {
      if (titleSpans.length === 0 || letterIndex === undefined) return

      const targetLetter = titleSpans[letterIndex]

      // Guardar los estilos originales si no existen
      if (!targetLetter.dataset.originalColor) {
        targetLetter.dataset.originalColor = getComputedStyle(targetLetter).color
        targetLetter.dataset.originalShadow = getComputedStyle(targetLetter).textShadow
      }

      // Hacer parpadear la letra
      let flickerCount = 0
      const maxFlickers = 2 + Math.floor(Math.random() * 2) // 2-3 parpadeos

      const flickerLetter = () => {
        // Reproducir sonido de parpadeo
        flickerSound.currentTime = 0
        flickerSound.play().catch((e) => console.log("Error reproduciendo sonido:", e))

        // Apagar
        targetLetter.style.color = "rgba(255, 255, 255, 0.1)"
        targetLetter.style.textShadow = "none"

        setTimeout(
          () => {
            // Encender
            targetLetter.style.color = targetLetter.dataset.originalColor
            targetLetter.style.textShadow = targetLetter.dataset.originalShadow

            flickerCount++

            if (flickerCount < maxFlickers) {
              // Continuar parpadeando
              setTimeout(flickerLetter, 100 + Math.random() * 150)
            } else {
              // Después de parpadear, decidir si se queda apagado o encendido
              if (shouldStayOff) {
                setTimeout(() => {
                  // Apagar la letra por un tiempo
                  targetLetter.style.color = "rgba(255, 255, 255, 0.1)"
                  targetLetter.style.textShadow = "none"
                }, 200)
              }
            }
          },
          50 + Math.random() * 100,
        )
      }

      // Iniciar el parpadeo
      flickerLetter()
    }

    // Función para hacer parpadear un botón específico con estados apagados
    const flickerSpecificButton = (buttonIndex, shouldStayOff = false) => {
      if (buttonRects.length === 0 || buttonIndex === undefined || buttonIndex === -1) return

      const targetRect = buttonRects[buttonIndex]
      if (!targetRect) return

      // Guardar los estilos originales si no existen
      if (!targetRect.dataset.originalStroke) {
        targetRect.dataset.originalStroke = targetRect.getAttribute("stroke")
        targetRect.dataset.originalFilter = targetRect.getAttribute("filter") || "url(#glow)"
      }

      // Hacer parpadear el botón
      let flickerCount = 0
      const maxFlickers = 2 + Math.floor(Math.random() * 2) // 2-3 parpadeos

      const flickerButton = () => {
        // Reproducir sonido de parpadeo
        flickerSound.currentTime = 0
        flickerSound.play().catch((e) => console.log("Error reproduciendo sonido:", e))

        // Apagar
        targetRect.setAttribute("stroke", "rgba(0, 255, 255, 0.1)")
        targetRect.setAttribute("filter", "none")

        setTimeout(
          () => {
            // Encender
            targetRect.setAttribute("stroke", targetRect.dataset.originalStroke)
            targetRect.setAttribute("filter", targetRect.dataset.originalFilter)

            flickerCount++

            if (flickerCount < maxFlickers) {
              // Continuar parpadeando
              setTimeout(flickerButton, 100 + Math.random() * 150)
            } else {
              // Después de parpadear, decidir si se queda apagado o encendido
              if (shouldStayOff) {
                setTimeout(() => {
                  // Apagar el botón por un tiempo
                  targetRect.setAttribute("stroke", "rgba(0, 255, 255, 0.1)")
                  targetRect.setAttribute("filter", "none")
                }, 200)
              }
            }
          },
          50 + Math.random() * 100,
        )
      }

      // Iniciar el parpadeo
      flickerButton()
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

        // Guardar el índice para uso posterior
        window.permanentFlickerLetterIndex = failingLetterIndex

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

        // Iniciar animación de glow para los botones
        buttonBlurs.forEach((blur) => {
          if (blur) {
            gsap.to(blur, {
              attr: { stdDeviation: "3" },
              repeat: -1,
              yoyo: true,
              duration: 2,
              ease: "sine.inOut",
            })
          }
        })

        // Elegir un botón aleatorio para que falle
        const failingButtonIndex = Math.floor(Math.random() * buttonRects.length)

        // Guardar el índice para uso posterior
        window.permanentFlickerButtonIndex = failingButtonIndex

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

    // Configurar parpadeos periódicos después del encendido inicial
    const setupPeriodicFlickers = () => {
      // Usar el mismo índice de letra que falló durante el encendido
      let permanentFlickerLetterIndex = window.permanentFlickerLetterIndex
      if (permanentFlickerLetterIndex === undefined && titleSpans.length > 0) {
        do {
          permanentFlickerLetterIndex = Math.floor(Math.random() * titleSpans.length)
        } while (titleSpans[permanentFlickerLetterIndex].textContent.trim() === "")
      }

      // Usar el mismo índice de botón que falló durante el encendido
      const permanentFlickerButtonIndex =
        window.permanentFlickerButtonIndex !== undefined
          ? window.permanentFlickerButtonIndex
          : buttonRects.length > 0
            ? Math.floor(Math.random() * buttonRects.length)
            : -1

      // Estado para alternar entre encendido y apagado
      let letterIsOff = false
      let buttonIsOff = false

      // Parpadeo periódico de la letra permanente
      setInterval(
        () => {
          // Alternar entre parpadeo que deja la letra encendida o apagada
          letterIsOff = !letterIsOff
          flickerSpecificLetter(permanentFlickerLetterIndex, letterIsOff)
        },
        5000 + Math.random() * 3000,
      )

      // Parpadeo periódico del botón permanente
      setInterval(
        () => {
          // Alternar entre parpadeo que deja el botón encendido o apagado
          buttonIsOff = !buttonIsOff
          flickerSpecificButton(permanentFlickerButtonIndex, buttonIsOff)
        },
        8000 + Math.random() * 4000,
      )
    }

    // Secuencia de encendido principal
    const startupSequence = async () => {
      // Apagar solo el texto y los botones inicialmente (no el avatar)
      initiallyTurnOff()

      // Esperar un poco menos de tiempo en la oscuridad ya que el avatar está encendido
      await new Promise((resolve) => setTimeout(resolve, 500))

      // El avatar ya está encendido, no necesitamos encenderlo

      // Encender el título con una letra fallando
      await turnOnTitle()

      // Encender los botones uno a uno, con uno fallando
      await turnOnButtons()

      // Configurar parpadeos periódicos después del encendido inicial
      setupPeriodicFlickers()
    }

    // Iniciar la secuencia
    startupSequence()
  }, [])

  return null // Este componente no renderiza nada visible
}