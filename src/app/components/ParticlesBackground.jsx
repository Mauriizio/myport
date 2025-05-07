"use client"

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
  import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
 await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
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
            repulse: {
              distance: 120,
              duration: 0.6,
              speed: 4,
              maxSpeed: 5,
              easing: "ease-out"
            },
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
      }}
    />
  );
}
