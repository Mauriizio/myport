"use client"

import { useRef } from "react"

export default function AvatarNeon({ src = "/mi-avatar.png", size = 200 }) {
  const ringRef = useRef()
  const baseImageRef = useRef()
  const topImageRef = useRef()

  // Aumentamos el tamaño horizontal para mostrar más del avatar por los lados
  const padding = 20
  const overshoot = 60
  const horizontalExpansion = 28 // Expansión adicional para los lados
  const totalWidth = size + padding * 2 + horizontalExpansion
  const totalHeight = size + padding * 2 + overshoot
  const center = totalWidth / 2
  const radius = size / 2

  return (
    <div
      className="avatar-container" 
      style={{
        position: "relative",
        width: totalWidth,
        height: totalHeight,
        margin: "0 auto",
        overflow: "visible",
        background: "transparent", // Aseguramos que el fondo sea transparente
      }}
    >
      {/* SVG para la máscara de degradado */}
      <svg width="0" height="0" style={{ position: "absolute", visibility: "hidden" }}>
        <defs>
          <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="60%" stopColor="white" stopOpacity="1" />
            <stop offset="85%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="fadeMask">
            <rect width="100%" height="100%" fill="url(#fadeGradient)" />
          </mask>
        </defs>
      </svg>

      {/* Imagen completa (hombros) con máscara de degradado */}
      <div
        style={{
          position: "absolute",
          top: padding - 10,
          left: (totalWidth - size - horizontalExpansion) / 2, // Centrar la imagen más ancha
          width: size + horizontalExpansion, // Imagen más ancha para mostrar los lados
          height: size + overshoot,
          overflow: "hidden",
          zIndex: 0,
          background: "transparent", // Fondo transparente
          maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
        }}
      >
        <img
  ref={baseImageRef}
  src={src || "/placeholder.svg?height=200&width=200"}
  alt="Avatar fondo"
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    background: "transparent",
    filter: "grayscale(90%) brightness(0.7)", // Añadir el mismo filtro que tiene la imagen superior
    transition: "all 0s",
    maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
    WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
  }}
  className="avatar-image-base"
/>

      </div>

      {/* Aro con degradado estático y glow fuerte */}
      <svg
        width={totalWidth}
        height={totalWidth}
        viewBox={`0 0 ${totalWidth} ${totalWidth}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "visible",
          zIndex: 1,
          background: "transparent", // Fondo transparente
        }}
      >
        <defs>
          {/* Degradado horizontal: izquierda cyan, derecha magenta */}
          <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00FFFF" />
            <stop offset="40%" stopColor="#00FFFF" />
            <stop offset="60%" stopColor="#FF00FF" />
            <stop offset="100%" stopColor="#FF00FF" />
          </linearGradient>

          <filter id="avatarGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur id="avatarBlur" in="SourceGraphic" stdDeviation="4" result="blurred" />
            <feMerge>
              <feMergeNode in="blurred" />
              <feMergeNode in="blurred" /> {/* Más glow */}
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle
          ref={ringRef}
          cx={center}
          cy={totalWidth / 2} // Centrar verticalmente en el SVG
          r={radius + 10} // Aumentar ligeramente el radio para que el aro sea más grande
          fill="none"
          stroke="url(#avatarGrad)"
          strokeWidth="5"
          filter="url(#avatarGlow)"
          className="avatar-ring"
          id="avatar-ring"
          style={{ transition: "all 0s" }} // Sin transición para encendido instantáneo
        />
      </svg>

      {/* Parte superior recortada por encima del aro - Inicialmente desaturada */}
      <div
        style={{
          position: "absolute",
          top: padding - 10,
          left: (totalWidth - size - horizontalExpansion) / 2, // Centrar la imagen más ancha
          width: size + horizontalExpansion, // Imagen más ancha para mostrar los lados
          height: size + overshoot,
          zIndex: 2,
          overflow: "hidden",
          clipPath: `ellipse(${(size + horizontalExpansion) / 2}px ${size / 2.5}px at 50% ${size / 2.5}px)`,
          background: "transparent", // Fondo transparente
        }}
      >
        <img
          ref={topImageRef}
          src={src || "/placeholder.svg"}
          alt="Avatar cabeza"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center", // Centrar la imagen
            filter: "grayscale(90%) brightness(0.7)", // Inicialmente desaturada y oscura
            transition: "all 0s", // Sin transición para encendido instantáneo
            background: "transparent", // Fondo transparente
          }}
          className="avatar-image-top"
        />
      </div>
    </div>
  )
}
