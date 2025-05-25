"use client"

import { useCallback } from "react"

import { useState, useRef } from "react"

// Mejoras de accesibilidad para NeonButtonSVG
export default function AccessibleNeonButtonSVG({
  children,
  onClick,
  className = "",
  style = {},
  ariaLabel,
  disabled = false,
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const buttonRef = useRef(null)

  // Soporte para teclado
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        setIsPressed(true)
        onClick?.()
      }
    },
    [onClick],
  )

  const handleKeyUp = useCallback((e) => {
    if (e.key === "Enter" || e.key === " ") {
      setIsPressed(false)
    }
  }, [])

  return (
    <div
      ref={buttonRef}
      className={`neon-button-svg ${className} ${disabled ? "disabled" : ""}`}
      style={{
        position: "relative",
        display: "inline-block",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={ariaLabel || children}
      aria-disabled={disabled}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsPressed(false)
      }}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onClick={disabled ? undefined : onClick}
    >
      {/* Tu SVG actual con indicador de focus */}
      <svg>
        {/* ... tu contenido actual ... */}

        {/* Indicador de focus para accesibilidad */}
        {isFocused && (
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeDasharray="5,5"
            rx="20"
            ry="20"
          />
        )}
      </svg>
    </div>
  )
}
