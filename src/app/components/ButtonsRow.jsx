"use client"

import NeonButtonSVG from "./NeonButtonSVG"

export default function ButtonsRow() {
  return (
    <div className="button-row">
      <NeonButtonSVG onClick={() => alert("Sobre mí!")}>Sobre mí</NeonButtonSVG>
      <NeonButtonSVG onClick={() => alert("Proyectos!")}>Proyectos</NeonButtonSVG>
      <NeonButtonSVG onClick={() => alert("Contacto!")}>Contacto</NeonButtonSVG>
    </div>
  )
}
