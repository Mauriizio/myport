import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-black/30 border-t border-cyan-500/20 py-8 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold text-cyan-400" style={{ fontFamily: "var(--font-orbitron)" }}>
              MAURIZIO CABALLERO
            </h2>
            <p className="text-gray-400 mt-1">Frontend Developer</p>
          </div>

          <div className="flex space-x-6 mb-6 md:mb-0">
            <a
              href="https://github.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="mailto:maurizio@example.com"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <div className="text-center md:text-right">
            <nav className="flex justify-center md:justify-end space-x-6 mb-4">
              <Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Inicio
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Sobre mí
              </Link>
              <Link href="/projects" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Proyectos
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Contacto
              </Link>
            </nav>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Maurizio Caballero. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
