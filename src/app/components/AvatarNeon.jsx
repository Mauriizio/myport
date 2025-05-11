"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function AvatarNeon({ src = "/mi-avatar.png", size = 200 }) {
  const ringRef = useRef();

  useEffect(() => {
    const blurEl = document.getElementById("blur");

    gsap.to(blurEl, {
      attr: { stdDeviation: 8 }, // 💡 Aumentamos el glow
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "sine.inOut"
    });

    // ❌ Eliminamos rotación
    // gsap.to(circleEl, { ... });
  }, []);

  const padding = 20;
  const overshoot = 60;
  const totalSize = size + padding * 2;
  const center = totalSize / 2;
  const radius = size / 2;

  return (
    <div className="avatar-container"
      style={{
        position: "relative",
        width: totalSize,
        height: totalSize + overshoot,
        margin: "0 auto",
        overflow: "visible",
      }}
    >
      {/* 🔽 Imagen completa (hombros) */}
      <img
        src={src}
        alt="Avatar fondo"
        style={{
          position: "absolute",
          top: padding - 10,
          left: padding,
          width: size,
          height: size + overshoot,
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* 🔵 Aro con degradado estático y glow fuerte */}
      <svg
        width={totalSize}
        height={totalSize}
        viewBox={`0 0 ${totalSize} ${totalSize}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "visible",
          zIndex: 1,
        }}
      >
        <defs>
          {/* 🎨 Degradado horizontal: izquierda magenta, derecha cyan */}
          <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor= "#00FFFF"/>
            <stop offset="100%" stopColor= "#FF00FF"  />
          </linearGradient>

          <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur id="blur" in="SourceGraphic" stdDeviation="8" result="blurred" />
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
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#avatarGrad)"
          strokeWidth="5"
          filter="url(#glow)"
        />
      </svg>

      {/* 🔼 Parte superior recortada por encima del aro */}
      <img
        src={src}
        alt="Avatar cabeza"
        style={{
          position: "absolute",
          top: padding - 10,
          left: padding,
          width: size,
          height: size + overshoot,
          objectFit: "cover",
          zIndex: 2,
          clipPath: `ellipse(${size / 2}px ${size / 2.5}px at 50% ${size / 2.5}px)`
        }}
      />
    </div>
  );
}
