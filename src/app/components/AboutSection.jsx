"use client"

import { useEffect, useRef } from "react"
import { Code, Cpu, Layers, Lightbulb, Monitor, Rocket } from "lucide-react"

export default function AboutSection() {
  const sectionRef = useRef(null)
  const skillsRef = useRef(null)

  // Efecto para animar la aparición de elementos cuando están en el viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("neon-on")
            entry.target.classList.remove("neon-off")
          }
        })
      },
      { threshold: 0.2 },
    )

    // Observar la sección principal
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    // Observar las tarjetas de habilidades
    if (skillsRef.current) {
      const skillCards = skillsRef.current.querySelectorAll(".skill-card")
      skillCards.forEach((card) => {
        observer.observe(card)
      })
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="about-section parallax-section neon-off"
      style={{
        minHeight: "100vh",
        padding: "4rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Fondo con degradado */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at center, #1a1a2e 0%, #0d0d1a 40%, #00000f 100%)",
          opacity: 0.8,
        }}
      />

      <div className="section-content relative z-10 max-w-6xl mx-auto">
        <h2
          className="neon-text text-center mb-12"
          style={{
            fontFamily: "var(--font-orbitron), sans-serif",
            fontSize: "3rem",
            color: "#00ffff",
            textShadow: "0 0 10px #00ffff, 0 0 20px rgba(0, 255, 255, 0.5)",
            letterSpacing: "8px",
          }}
        >
          {"SOBRE MÍ".split("").map((char, i) => (
            <span key={i} style={{ "--char-index": i }}>
              {char}
            </span>
          ))}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Columna de texto */}
          <div className="space-y-6">
            <p className="text-white text-lg leading-relaxed">
              Soy un <span className="neon-highlight">desarrollador frontend</span> apasionado por crear experiencias
              digitales que combinan diseño atractivo y funcionalidad intuitiva. Mi enfoque se centra en construir
              interfaces que no solo se vean bien, sino que también ofrezcan una excelente experiencia de usuario.
            </p>

            <p className="text-white text-lg leading-relaxed">
              Con experiencia en <span className="neon-highlight">React</span>,{" "}
              <span className="neon-highlight">Next.js</span> y otras tecnologías modernas, me especializo en
              desarrollar aplicaciones web responsivas y de alto rendimiento que destacan en el panorama digital actual.
            </p>

            <p className="text-white text-lg leading-relaxed">
              Mi objetivo es seguir creciendo profesionalmente, aprendiendo nuevas tecnologías y enfrentando desafíos
              que me permitan expandir mis habilidades y conocimientos en el mundo del desarrollo web.
            </p>

            <div className="pt-4">
              <button className="neon-button mt-4" onClick={() => alert("¡Descarga mi CV!")}>
                Descargar CV
              </button>
            </div>
          </div>

          {/* Columna de habilidades */}
          <div ref={skillsRef} className="grid grid-cols-2 gap-4">
            {[
              {
                icon: <Monitor className="h-8 w-8" />,
                title: "Frontend",
                skills: "React, Next.js, HTML5, CSS3, JavaScript",
              },
              {
                icon: <Code className="h-8 w-8" />,
                title: "Lenguajes",
                skills: "JavaScript, TypeScript, Python",
              },
              {
                icon: <Layers className="h-8 w-8" />,
                title: "UI/UX",
                skills: "Tailwind CSS, Styled Components, Figma",
              },
              {
                icon: <Cpu className="h-8 w-8" />,
                title: "Herramientas",
                skills: "Git, VS Code, npm, Webpack",
              },
              {
                icon: <Lightbulb className="h-8 w-8" />,
                title: "Soft Skills",
                skills: "Trabajo en equipo, Comunicación, Resolución de problemas",
              },
              {
                icon: <Rocket className="h-8 w-8" />,
                title: "Otros",
                skills: "SEO, Responsive Design, Performance",
              },
            ].map((skill, index) => (
              <div
                key={index}
                className="skill-card neon-off p-4 rounded-lg border-2 border-[#00ffff] bg-black/30"
                style={{
                  boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
                  transition: "all 0.3s ease",
                  transform: `translateY(${20 + index * 10}px)`,
                  opacity: 0.7,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="flex items-center mb-2 text-[#00ffff]">
                  {skill.icon}
                  <h3 className="ml-2 text-lg font-bold" style={{ fontFamily: "var(--font-orbitron), sans-serif" }}>
                    {skill.title}
                  </h3>
                </div>
                <p className="text-white text-sm">{skill.skills}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Línea de tiempo o experiencia */}
        <div className="mt-20">
          <h3
            className="text-center mb-10 text-2xl"
            style={{
              fontFamily: "var(--font-orbitron), sans-serif",
              color: "#00ffff",
              textShadow: "0 0 5px #00ffff, 0 0 10px rgba(0, 255, 255, 0.3)",
            }}
          >
            MI TRAYECTORIA
          </h3>

          <div className="relative">
            {/* Línea vertical neón */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#00ffff] via-[#ff00ff] to-[#00ffff]"
              style={{ boxShadow: "0 0 8px #00ffff" }}
            ></div>

            {/* Eventos de la línea de tiempo */}
            {[
              {
                year: "2023",
                title: "Desarrollador Frontend Senior",
                description:
                  "Lideré el desarrollo de aplicaciones web utilizando React y Next.js, implementando las mejores prácticas y optimizando el rendimiento.",
              },
              {
                year: "2021",
                title: "Desarrollador Frontend",
                description:
                  "Trabajé en proyectos de comercio electrónico y aplicaciones SPA, mejorando la experiencia de usuario y la accesibilidad.",
              },
              {
                year: "2019",
                title: "Desarrollador Web Junior",
                description:
                  "Comencé mi carrera profesional desarrollando sitios web responsivos y aprendiendo las bases del desarrollo frontend.",
              },
            ].map((event, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
              >
                {/* Punto en la línea de tiempo */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#00ffff]"
                  style={{ boxShadow: "0 0 10px #00ffff, 0 0 15px rgba(0, 255, 255, 0.7)" }}
                ></div>

                {/* Contenido */}
                <div
                  className={`w-5/12 p-4 rounded-lg border border-[#00ffff] bg-black/30 ${
                    index % 2 === 0 ? "mr-auto pr-8" : "ml-auto pl-8"
                  }`}
                  style={{ boxShadow: "0 0 8px rgba(0, 255, 255, 0.3)" }}
                >
                  <div
                    className="text-[#00ffff] font-bold mb-1"
                    style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                  >
                    {event.year}
                  </div>
                  <h4 className="text-white text-lg font-semibold mb-2">{event.title}</h4>
                  <p className="text-gray-300 text-sm">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Efecto de partículas o estrellas en el fondo */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              backgroundColor: Math.random() > 0.5 ? "#00ffff" : "#ff00ff",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${Math.random() * 5 + 2}px ${Math.random() > 0.5 ? "#00ffff" : "#ff00ff"}`,
              animation: `twinkle ${Math.random() * 5 + 2}s infinite ${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .neon-off {
          opacity: 0.5;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .neon-on {
          opacity: 1;
          transform: translateY(0);
        }

        .skill-card.neon-on {
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.7);
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>
    </section>
  )
}
