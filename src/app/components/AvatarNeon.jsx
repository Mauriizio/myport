"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function AvatarNeon() {
  const ref = useRef();

  useEffect(() => {
    // Animación de solo glow pulsante
    gsap.to(ref.current, {
      // 1) Resplandor intenso y cercano al borde:
      boxShadow: `
        0 0 4px #0ff,         /* anillo interior */
        0 0 12px #0ff,        /* halo medio */
        0 0 30px #0ff,        /* resplandor exterior */
        0 0 33px rgba(0,255,255,0.5),   /* halo amplio semitransparente */
        0 0 45px rgba(255,0,255,0.3)    /* toque rosa para degradado */
      `,
      borderColor: "#0ff",  // mantiene el borde definido
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "power1.inOut"
    });
    
  }, []);

  return (
    <div ref={ref} className="avatar-container">
      <img src="/mi-avatar.png" alt="Mi avatar" className="avatar-img" />
    </div>
  );
}
