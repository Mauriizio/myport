"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, Play } from "lucide-react"
import { useState } from "react"

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(0)

  const projects = [
    {
      id: 1,
      title: "Portfolio Neón",
      description:
        "Portafolio personal con efectos neón y animaciones avanzadas usando React, GSAP y partículas interactivas.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["React", "Next.js", "GSAP", "Framer Motion", "CSS3"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      color: "cyan",
    },
    {
      id: 2,
      title: "E-commerce Futurista",
      description: "Tienda online con diseño cyberpunk, carrito de compras interactivo y sistema de pagos integrado.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Socket.io"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      color: "magenta",
    },
    {
      id: 3,
      title: "Dashboard Analytics",
      description: "Panel de control con gráficos interactivos, visualización de datos en tiempo real y tema oscuro.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Vue.js", "D3.js", "Chart.js", "WebSocket", "SCSS"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      color: "green",
    },
    {
      id: 4,
      title: "App de Tareas",
      description: "Aplicación de gestión de tareas con drag & drop, notificaciones push y sincronización en la nube.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      color: "blue",
    },
    {
      id: 5,
      title: "Juego Web 3D",
      description: "Juego interactivo en 3D desarrollado con Three.js, física realista y controles intuitivos.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Three.js", "WebGL", "Cannon.js", "Vite", "JavaScript"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      color: "orange",
    },
    {
      id: 6,
      title: "API REST",
      description: "API robusta con autenticación JWT, documentación automática y tests unitarios completos.",
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Node.js", "Express", "PostgreSQL", "JWT", "Jest"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      color: "purple",
    },
  ]

  const getColorClasses = (color) => {
    const colors = {
      cyan: "border-cyan-500/50 hover:border-cyan-500 text-cyan-400",
      magenta: "border-magenta-500/50 hover:border-magenta-500 text-magenta-400",
      green: "border-green-500/50 hover:border-green-500 text-green-400",
      blue: "border-blue-500/50 hover:border-blue-500 text-blue-400",
      orange: "border-orange-500/50 hover:border-orange-500 text-orange-400",
      purple: "border-purple-500/50 hover:border-purple-500 text-purple-400",
    }
    return colors[color] || colors.cyan
  }

  return (
    <motion.section
      id="proyectos"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen section-container py-20"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-title text-5xl mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Proyectos
        </motion.h2>

        {/* Proyectos destacados */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-cyan-400 mb-8">Proyectos Destacados</h3>
          <div className="grid lg:grid-cols-2 gap-12">
            {projects
              .filter((p) => p.featured)
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`project-card rounded-lg border bg-black/30 backdrop-blur-sm overflow-hidden transition-all duration-300 ${getColorClasses(project.color)}`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex gap-2 mb-2">
                        <motion.a
                          href={project.liveUrl}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-cyan-300 hover:bg-cyan-500/30 transition-colors"
                        >
                          <Play className="w-4 h-4" />
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-gray-500/20 border border-gray-500/50 rounded-full text-gray-300 hover:bg-gray-500/30 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </motion.a>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-xl font-bold text-white mb-3">{project.title}</h4>
                    <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-800/50 border border-gray-600/50 rounded-full text-xs text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Otros proyectos */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-cyan-400 mb-8">Otros Proyectos</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects
              .filter((p) => !p.featured)
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`project-card-small p-6 rounded-lg border bg-black/30 backdrop-blur-sm transition-all duration-300 ${getColorClasses(project.color)}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-bold text-white">{project.title}</h4>
                    <div className="flex gap-2">
                      <motion.a
                        href={project.liveUrl}
                        whileHover={{ scale: 1.1 }}
                        className="text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        href={project.githubUrl}
                        whileHover={{ scale: 1.1 }}
                        className="text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-800/50 border border-gray-600/50 rounded text-xs text-gray-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs text-gray-500">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 text-lg mb-6">¿Tienes una idea increíble? ¡Hagámosla realidad juntos!</p>
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-magenta-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            Trabajemos Juntos
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  )
}
