"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function NeonButtonSVG({ width = 150, height = 50, onClick, children }) {
  const ringRef = useRef();

  useEffect(() => {
    gsap.to(ringRef.current, {
      attr: { filter: "url(#glow)" },
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <svg
      width={width}
      height={height}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={e => e.key === "Enter" && onClick?.()}
      style={{ cursor: "pointer", overflow: "visible" }}
    >
      <defs>
        <linearGradient id="btnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00FFFF" />
          <stop offset="100%" stopColor="#FF00FF" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        ref={ringRef}
        x="2" y="2"
        width={width - 4}
        height={height - 4}
        rx="12" ry="12"
        fill="none"
        stroke="url(#btnGrad)"
        strokeWidth="4"
        filter="url(#glow)"
      />

      <text
        x="50%" y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#fff"
        fontFamily="Inter, sans-serif"
        fontSize="1rem"
        fontWeight="600"
        pointerEvents="none"
      >
        {children}
      </text>
    </svg>
  );
}
