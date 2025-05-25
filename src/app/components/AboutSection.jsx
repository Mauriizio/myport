"use client"

import { motion } from "framer-motion"
import { Code, Palette, Zap, Brain, Coffee, Gamepad2 } from "lucide-react"

export default function AboutSection() {
  const skills = [
    { name: "JavaScript", level: 85, color: "#f7df1e" },
    { name: "React", level: 80, color: "#61dafb" },
    { name: "CSS/SCSS", level: 90, color: "#1572b6" },
    { name: "HTML5", level: 95, color: "#e34f26" },
    { name: "Node.js", level: 70, color: "#339933" },
    { name: "Git", level: 75, color: "#f05032" },
  ]

  const interests = [
    { icon: Code, title: "Desarrollo Web", desc: "Creando experiencias digitales únicas" },
    { icon: Palette, title: "UI/UX Design", desc: "Diseños que conectan con usuarios" },
    { icon: Zap, title: "Animaciones", desc: "Dando vida a las interfaces" },
    { icon: Brain, title: "Aprendizaje", desc: "Siempre explorando nuevas tecnologías" },
    { icon: Coffee, title: "Café", desc: "Combustible para largas sesiones de código" },
    { icon: Gamepad2, title: "Gaming", desc: "Inspiración para interfaces interactivas" },
  ]

  return (
    <motion.section
      id="sobremi"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen section-container py-20"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="section-title text-5xl mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Sobre mí
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Columna izquierda - Información personal */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="neon-card p-8 rounded-lg border border-cyan-500/30 bg-black/20 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6">¡Hola! Soy Maurizio</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Desarrollador frontend apasionado por crear experiencias web únicas y visualmente impactantes. Me
                especializo en transformar ideas creativas en interfaces interactivas que cautivan a los usuarios.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Con un enfoque en las últimas tecnologías como React, Next.js y animaciones avanzadas, busco
                constantemente nuevas formas de innovar en el desarrollo web.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <span className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-300 text-sm">
                  🎯 Orientado a resultados
                </span>
                <span className="px-4 py-2 bg-magenta-500/20 border border-magenta-500/50 rounded-full text-magenta-300 text-sm">
                  🚀 Innovador
                </span>
                <span className="px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full text-green-300 text-sm">
                  🎨 Creativo
                </span>
              </div>
            </div>
          </motion.div>

          {/* Columna derecha - Skills */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-8">Habilidades Técnicas</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="skill-item"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-cyan-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full relative"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                    >
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          boxShadow: `0 0 10px ${skill.color}`,
                          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`,
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sección de intereses */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-cyan-400 mb-12 text-center">Mis Pasiones</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="interest-card p-6 rounded-lg border border-cyan-500/20 bg-black/30 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300"
              >
                <interest.icon className="w-12 h-12 text-cyan-400 mb-4 mx-auto" />
                <h4 className="text-xl font-bold text-white mb-2 text-center">{interest.title}</h4>
                <p className="text-gray-400 text-center">{interest.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
