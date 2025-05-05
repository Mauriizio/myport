"use client" // Directiva para indicar que este es un componente del lado del cliente

import { useCallback } from "react" // Importamos useCallback para memorizar funciones
import Particles from "react-tsparticles" // Componente principal de partículas
import { loadSlim } from "tsparticles-slim" // Versión ligera del motor de partículas (mejor rendimiento)

export default function ParticlesBackground() {
  // Esta función inicializa el motor de partículas
  // Se ejecuta una sola vez cuando el componente se monta
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine) // Cargamos la versión slim del motor para mejor rendimiento
  }, [])

  return (
    <Particles
      id="tsparticles" // ID del elemento DOM que contendrá las partículas
      init={particlesInit} // Función de inicialización
      options={{
        // CONFIGURACIÓN GENERAL
        fullScreen: {
          enable: false, // IMPORTANTE: Deshabilita el modo pantalla completa
          // Si es true, las partículas ocuparán toda la pantalla
          // Si es false, se limitarán al contenedor donde se renderiza el componente
        },
        background: {
          color: "transparent", // Fondo transparente para que se vea el fondo del header
          // Puedes cambiarlo a un color específico como "#000000" si lo prefieres
        },

        // CONFIGURACIÓN DE LAS PARTÍCULAS
        particles: {
          // Número de partículas
          number: {
            value: 100, // Cantidad de partículas en pantalla
            density: {
              enable: true, // Habilita la densidad adaptativa
              area: 800, // Área para calcular la densidad (mayor número = menos partículas)
            },
          },

          // Color de las partículas
          color: {
            value: ["#00ffea", "#ff00f7", "#00ff00", "#ffffff"], // Array de colores posibles
            // Puedes añadir o cambiar estos colores según tu preferencia
          },

          // Forma de las partículas
          shape: {
            type: "char", // Tipo de partícula: "char" significa caracteres de texto
            // Otros tipos: "circle", "square", "triangle", "image", etc.
            character: {
              // Configuración para partículas de tipo "char"
              value: ["{", "}", "<", ">", "/", "*", "const", "let", "return", "()", "==", "==="],
              // Array de caracteres o palabras que se mostrarán como partículas
              // Puedes modificar esta lista para mostrar otros caracteres
              font: "monospace", // Tipo de fuente
              style: "", // Estilo CSS adicional
              weight: "400", // Grosor de la fuente
            },
          },

          // Tamaño de las partículas
          size: {
            value: { min: 6, max: 13 }, // Rango de tamaños (min y max)
            // Valores más pequeños = letras más pequeñas
            // Valores más grandes = letras más grandes
          },

          // Movimiento de las partículas
          move: {
            enable: true, // Habilita el movimiento
            speed: 1, // Velocidad de movimiento (mayor = más rápido)
            direction: "none", // Dirección: "none" = aleatorio, otras opciones: "top", "bottom", "left", "right"
            random: false, // Si es true, la velocidad será aleatoria para cada partícula
            straight:false, // Si es true, las partículas se moverán en línea recta
            outMode: "out", // Comportamiento al salir del canvas: "out" = desaparecen y reaparecen al otro lado
            // Otras opciones: "bounce" (rebotan), "destroy" (se destruyen)
            attract: {
              // Efecto de atracción entre partículas
              enable: true, // Habilita la atracción
              rotateX: 600, // Factor de rotación en X (mayor = más efecto)
              rotateY: 1200, // Factor de rotación en Y (mayor = más efecto)
            },
          },

          // Opacidad de las partículas
          opacity: {
            value: 0.8, // Valor entre 0 y 1 (0 = invisible, 1 = totalmente visible)
            // Puedes usar también un objeto {min: 0.5, max: 0.8} para opacidad variable
          },
        },

        // CONFIGURACIÓN DE INTERACTIVIDAD
        interactivity: {
          detectsOn: "window", // Dónde detectar eventos: "window" (toda la ventana) o "canvas" (solo el área de partículas)

          // Configuración de eventos
          events: {
            // Evento al pasar el mouse (o dedo en móviles)
            onHover: {
              enable: true, // Habilita la interacción al pasar el mouse
              mode: "repulse", // Modo de interacción: "repulse" = las partículas se alejan
              // Otros modos: "grab", "bubble", "connect", "attract"
            },

            // Evento al hacer clic
            onClick: {
              enable: true, // Habilita la interacción al hacer clic
              mode: "push", // Modo: "push" = añade partículas nuevas
              // Otros modos: "remove", "repulse", "bubble"
            },

            // Evento para elementos específicos (no usado aquí)
            onDiv: {
              enable: false,
              mode: "repulse",
            },

            resize: true, // Recalcula la posición de las partículas al cambiar el tamaño de la ventana

            // EVENTOS TÁCTILES (importantes para móviles)
            touchstart: {
              enable: true, // Habilita la interacción al tocar la pantalla
              mode: "repulse", // Las partículas huyen del punto de contacto
            },
            touchmove: {
              enable: true, // Habilita la interacción al mover el dedo
              mode: "repulse", // Las partículas siguen huyendo mientras arrastras
            },
            touchend: {
              enable: true, // Habilita la interacción al levantar el dedo
              mode: "repulse", // Efecto final al dejar de tocar
            },
          },

          // Configuración de los modos de interacción
          modes: {
            // Modo "repulse" (repeler partículas)
            repulse: {
              distance: 120, // Distancia de efecto en píxeles (mayor = efecto más amplio)
              duration: 0.6, // Duración del efecto en segundos
              speed: 4, // Velocidad de repulsión
              maxSpeed: 5, // Velocidad máxima de repulsión
              easing: "ease-out", // Tipo de aceleración/desaceleración
            },

            // Modo "push" (añadir partículas)
            push: {
              quantity: 2, // Número de partículas a añadir con cada clic
            },
          },
        },

        // OTRAS CONFIGURACIONES
        detectRetina: true, // Ajusta automáticamente para pantallas retina (alta densidad)

        // CONFIGURACIÓN RESPONSIVA
        responsive: [
          {
            maxWidth: 768, // Se aplica en pantallas de hasta 768px de ancho (móviles y tablets)
            options: {
              particles: {
                number: {
                  value: 60, // Menos partículas en móviles para mejor rendimiento
                },
                size: {
                  value: { min: 4, max: 10 }, // Partículas más pequeñas en móviles
                },
              },
            },
          },
        ],
      }}
    />
  )
}