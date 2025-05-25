"use client"

import AvatarNeon from "./components/AvatarNeon"
import NeonStartupEffect from "./components/NeonStartupEffect"
import ParticlesBackground from "./components/ParticlesBackground"
import ButtonsRow from "./components/ButtonsRow"
import AboutSection from "./components/AboutSection"
import ProjectsSection from "./components/ProjectsSection"
import ContactSection from "./components/ContactSection"
import Footer from "./components/Footer"
import "./globals.css"

export default function HomePage() {
  return (
    <div className="container">
      {/* Componente que maneja el efecto de encendido */}
      <NeonStartupEffect />

      <header className="header">
        <ParticlesBackground />
        <AvatarNeon />

        <h1
          className="neon-text"
          style={{
            fontFamily: "var(--font-orbitron)",
            fontWeight: 700,
          }}
        >
          {"MAURIZIO CABALLERO".split(" ").map((word, w) => (
            <div key={w} style={{ display: "block" }}>
              {word.split("").map((char, i) => (
                <span key={i} style={{ "--char-index": i }}>
                  {char}
                </span>
              ))}
            </div>
          ))}
        </h1>

        <h2>Frontend Developer</h2>
        <ButtonsRow />
      </header>

      {/* Secciones con contenido completo */}
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
