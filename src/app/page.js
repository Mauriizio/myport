import Image from "next/image";
import ParticlesBackground from "./components/ParticlesBackground";
import AvatarNeon from "./components/AvatarNeon";

export default function HomePage() {
  return (
    <div className="container">
      <header className="header">
        
      <AvatarNeon />
        <ParticlesBackground />

        {/*<Image
          src="/mi-avatar.png"
          alt="Foto de Deck Maurice"
          className="avatar"
          width={120}
          height={120}
          unoptimized
        />*/}

        <h1 className="neon-text">
          {"Maurizio Caballero".split("").map((char, i) => (
            <span key={i}>{char === " " ? "\u00A0" : char}</span>
          ))}
        </h1>

        <p>Frontend Developer</p>
      </header>
{/*
      <main>
        <section className="sobre-mi">
          <h2>Sobre mí</h2>
          <p>
            ¡Hola! Soy Maurizio Caballero, desarrollador web en formación con
            pasión por el diseño y la programación. Trabajo con HTML, CSS y
            JavaScript, explorando React y Next.js para crear proyectos
            interactivos y eficientes.
          </p>
        </section>

        <section className="accesos">
          <h2>Explora</h2>
          <div className="grid-accesos">
            <div className="acceso-card trabajos">💼 Trabajos</div>
            <div className="acceso-card desarrollo">💻 Desarrollo</div>
            <div className="acceso-card formacion">🎓 Formación</div>
            <div className="acceso-card musica">🎵 Música</div>
          </div>
        </section>

        <section className="proyectos">
          <h2>Proyectos</h2>
          <div className="grid-proyectos">
            <div className="proyecto-card">🎮 Juego Canvas</div>
            <div className="proyecto-card">📱 Landing Page</div>
            <div className="proyecto-card">💼 Sitio Web Cliente</div>
          </div>
        </section>
      </main>

      <footer>
        <p>Contacto: devmauri@gmail.com</p>
      </footer>*/}
    </div>
  );
}
