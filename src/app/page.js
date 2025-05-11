import ParticlesBackground from "./components/ParticlesBackground"
import AvatarNeon from "./components/AvatarNeon"
import ButtonsRow from "./components/ButtonsRow"
import NeonStartupEffect from "./components/NeonStartupEffect"

export default function HomePage() {
  return (
    <div className="container">
      {/* Componente que maneja el efecto de encendido */}
      <NeonStartupEffect />

      <header className="header">
        <ParticlesBackground />
        <AvatarNeon />

        <h1 className="neon-text">
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

        <p>Frontend Developer</p>
        <ButtonsRow />
      </header>
    </div>
  )
}
