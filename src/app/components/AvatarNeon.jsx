"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function AvatarNeon({ src = "/mi-avatar.png", size = 200 }) {
  const ringRef = useRef();

  useEffect(() => {
    const blurEl = document.getElementById("blur");
    const circleEl = ringRef.current;

    gsap.to(blurEl, {
      attr: { stdDeviation: 6 },
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "sine.inOut"
    });

    gsap.to(circleEl, {
      rotation: 360,
      transformOrigin: "50% 50%",
      repeat: -1,
      ease: "linear",
      duration: 20
    });
  }, []);

  const padding = 20;
  const overshoot = 60;
  const totalSize = size + padding * 2;
  const center = totalSize / 2;
  const radius = size / 2;

  return (
    <div
      style={{
        position: "relative",
        width: totalSize,
        height: totalSize + overshoot,
        margin: "0 auto",
        overflow: "visible",
      }}
    >
      {/* 🔽 Imagen inferior completa (hombros) debajo del aro */}
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

      {/* 🔄 Aro de neón en el medio */}
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
          <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00FFFF" />
            <stop offset="100%" stopColor="#FF00FF" />
          </linearGradient>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur id="blur" in="SourceGraphic" stdDeviation="4" result="blurred" />
            <feMerge>
              <feMergeNode in="blurred" />
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

      {/* 🔼 Imagen superior recortada (solo cabeza) por encima del aro */}
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
