"use client";


// src/app/components/AvatarNeon.jsx

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function AvatarNeon() {
  const ref = useRef();

  useEffect(() => {
    gsap.to(ref.current, {
      boxShadow: "0 0 20px #0ff, 0 0 40px #0ff",
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut"
    });
  }, []);

  return (
    <div ref={ref} className="avatar-container">
      {/* Aquí va tu avatar o imagen */}
      <img src="/mi-avatar.png" alt="Mi avatar" className="avatar-img" />
    </div>
  );
}
