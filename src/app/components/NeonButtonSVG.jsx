"use client"

import { useState, useRef, useEffect } from "react"

export default function NeonButtonSVG({ children, onClick, className = "", style = {} }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const buttonRef = useRef(null)
  const rectRef = useRef(null)
  const textRef = useRef(null)

  // Dimensiones del botón
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  })

  // Actualizar dimensiones cuando el componente se monta
  useEffect(() => {
    if (buttonRef.current) {
      const { width, height } = buttonRef.current.getBoundingClientRect()
      setDimensions({
        width: Math.max(width, 120), // Ancho mínimo
        height: Math.max(height, 40), // Alto mínimo
      })
    }
  }, [children])

  // Colores neón
  const colors = {
    default: {
      fill: "rgba(0, 0, 0, 0.3)",
      stroke: "#00ffff",
      text: "#00ffff",
      glow: "url(#buttonGlow)",
    },
    hover: {
      fill: "rgba(0, 255, 255, 0.1)",
      stroke: "#00ffff",
      text: "#ffffff",
      glow: "url(#buttonGlowIntense)",
    },
    pressed: {
      fill: "rgba(0, 255, 255, 0.2)",
      stroke: "#ffffff",
      text: "#ffffff",
      glow: "url(#buttonGlowPressed)",
    },
  }

  // Estado actual
  const currentState = isPressed ? "pressed" : isHovered ? "hover" : "default"

  // Padding y radio del botón
  const padding = { x: 20, y: 10 }
  const borderRadius = 20

  // Dimensiones totales
  const totalWidth = dimensions.width + padding.x * 2
  const totalHeight = dimensions.height + padding.y * 2

  return (
    <div
      ref={buttonRef}
      className={`neon-button-svg ${className}`}
      style={{
        position: "relative",
        display: "inline-block",
        cursor: "pointer",
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsPressed(false)
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
    >
      <svg
        width={totalWidth}
        height={totalHeight}
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        style={{ display: "block",
          background: "transparent",
          borderRadius: `${borderRadius}px`,
         }}
      >
        <defs>
          {/* Gradiente para el borde */}
          <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ffff" />
            <stop offset="50%" stopColor="#00ffff" />
            <stop offset="100%" stopColor="#ff00ff" />
          </linearGradient>

          {/* Glow normal */}
          <filter id="buttonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Glow intenso para hover */}
          <filter id="buttonGlowIntense" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Glow para estado presionado */}
          <filter id="buttonGlowPressed" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Rectángulo del botón */}
        <rect
          ref={rectRef}
          x="2"
          y="2"
          width={totalWidth - 4}
          height={totalHeight - 4}
          rx={borderRadius}
          ry={borderRadius}
          fill={colors[currentState].fill}
          stroke="url(#borderGradient)"
          strokeWidth="2"
          filter={colors[currentState].glow}
          style={{ transition: "all 0.3s ease" }}
        />

        {/* Texto del botón */}
        <text
          ref={textRef}
          x={totalWidth / 2}
          y={totalHeight / 2}
          dominantBaseline="middle"
          textAnchor="middle"
          fill={colors[currentState].text}
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            textShadow: isHovered ? "0 0 5px #00ffff" : "none",
          }}
        >
          {children}
        </text>

        {/* Efecto de brillo al pasar el mouse */}
        {isHovered && (
          <rect
            x="0"
            y="0"
            width={totalWidth}
            height={totalHeight}
            rx={borderRadius}
            ry={borderRadius}
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
            strokeOpacity="0.3"
            style={{
              animation: "pulse 1.5s infinite",
            }}
          />
        )}
      </svg>

      <style jsx>{`
        @keyframes pulse {
          0% {
            stroke-opacity: 0.3;
            stroke-width: 1;
          }
          50% {
            stroke-opacity: 0.6;
            stroke-width: 2;
          }
          100% {
            stroke-opacity: 0.3;
            stroke-width: 1;
          }
        }
      `}</style>
    </div>
  )
}
