// src/app/components/ParticlesBackground.jsx
"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // —————— Opciones para las estrellas ——————
  const starsOptions = {
    fullScreen: { enable: false },    // desactivado, ocupamos 100% del contenedor
    background: { color: "transparent" },
    particles: {
      number: { value: 200, density: { enable: true, area: 1200 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      size: { value: { min: 0.5, max: 1.5 } },
      move: {
        enable: true,
        speed: 0.1,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" }
      },
      opacity: { value: { min: 0.2, max: 0.5 } }
    },
    interactivity: {
      detectsOn: "window",
      events: { onHover: { enable: false }, onClick: { enable: false }, resize: true }
    },
    detectRetina: true
  };

  // —————— Opciones para letras & logos (tu config original) ——————
  const mainOptions = {
    fullScreen: { enable: false },
    background: { color: "transparent" },
    particles: {
      number: { value: 100, density: { enable: true, area: 800 } },
      color: { value: ["#00ffea", "#ff00f7", "#00ff00", "#ffffff"] },
      shape: {
        type: ["char", "image"],
        character: {
          value: ["{", "}", "<", ">", "/", "*", "const", "let", "return", "()", "==", "==="],
          font: "monospace",
          weight: "400",
          fill: true
        },
        image: [
          { src: "/logos/lhtml.png", width: 20, height: 20 },
          { src: "/logos/lcss.png", width: 20, height: 20 },
          { src: "/logos/ljs.png", width: 20, height: 20 },
          { src: "/logos/loff.png", width: 20, height: 20 },
          { src: "/logos/lcuba.png", width: 20, height: 20 },
          { src: "/logos/lwor.png", width: 20, height: 20 }
        ]
      },
      size: { value: { min: 6, max: 13 } },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: false,
        straight: false,
        outModes: { default: "out" },
        attract: { enable: true, rotateX: 600, rotateY: 1200 }
      },
      opacity: { value: 0.8 }
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
        resize: true,
        touchstart: { enable: true, mode: "repulse" },
        touchmove: { enable: true, mode: "repulse" },
        touchend: { enable: true, mode: "repulse" }
      },
      modes: {
        repulse: { distance: 120, duration: 0.6, speed: 4, maxSpeed: 5, easing: "ease-out" },
        push: { quantity: 2 }
      }
    },
    detectRetina: true,
    responsive: [
      {
        maxWidth: 768,
        options: {
          particles: {
            number: { value: 60 },
            size: { value: { min: 4, max: 10 } }
          }
        }
      }
    ]
  };

  return (
    <>
      {/* Estrellas de fondo */}
      <Particles
        id="tsparticles-stars"
        init={particlesInit}
        options={starsOptions}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0
        }}
      />

      {/* Partículas de letras e imágenes */}
      <Particles
        id="tsparticles-main"
        init={particlesInit}
        options={mainOptions}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1
        }}
      />
    </>
  );
}
