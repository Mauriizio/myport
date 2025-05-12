"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"

export default function NeonButtonSVG({ width = 150, height = 50, onClick, children }) {
  const ringRef = useRef()
  const textRef = useRef()

  useEffect(() => {
    // Animación más nítida del glow del botón
    gsap.to(ringRef.current, {
      attr: { strokeWidth: 4.5 }, // Pequeña variación para dar sensación de pulso
      filter: "url(#glow)",
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut",
    })

    // Animación más nítida del shadow del texto
    if (textRef.current) {
      gsap.to(textRef.current, {
        filter: "drop-shadow(0 0 3px rgba(0, 255, 255, 0.9)) drop-shadow(0 0 5px rgba(255, 0, 255, 0.7))",
        repeat: -1,
        yoyo: true,
        duration: 1.8,
        ease: "sine.inOut",
      })
    }
  }, [])

  return (
    <svg
      width={width}
      height={height}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      style={{ cursor: "pointer", overflow: "visible" }}
    >
      <defs>
        <linearGradient id="btnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00FFFF" />
          <stop offset="100%" stopColor="#FF00FF" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" /> {/* Valor más pequeño para menos borrosidad */}
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        ref={ringRef}
        x="2"
        y="2"
        width={width - 4}
        height={height - 4}
        rx="12"
        ry="12"
        fill="none"
        stroke="url(#btnGrad)"
        strokeWidth="4"
        filter="url(#glow)"
      />

      <text
        ref={textRef}
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#fff"
        fontFamily="Inter, sans-serif"
        fontSize="1rem"
        fontWeight="600"
        pointerEvents="none"
        style={{ filter: "drop-shadow(0 0 3px rgba(0, 255, 255, 0.5))" }}
      >
        {children}
      </text>
    </svg>
  )
}
