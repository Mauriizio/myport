"use client"

import { useRef } from "react"

export default function NeonButtonSVG({ width = 150, height = 50, onClick, children }) {
  const ringRef = useRef()
  const textRef = useRef()

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
        <linearGradient id="btnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00FFFF" />
          <stop offset="100%" stopColor="#FF00FF" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur id="buttonBlur" stdDeviation="2.5" result="coloredBlur" />
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
        style={{ transition: "all 0s" }} // Sin transición para encendido instantáneo
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
        style={{
          filter: "drop-shadow(0 0 3px rgba(0, 255, 255, 0.5))",
          transition: "all 0s", // Sin transición para encendido instantáneo
        }}
      >
        {children}
      </text>
    </svg>
  )
}
