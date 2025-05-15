"use client"


import { useRouter } from 'next/navigation'

import NeonButtonSVG from "./NeonButtonSVG"


export default function ButtonsRow() {
  const router = useRouter()
  return (
    <div className="button-row">
    <NeonButtonSVG onClick={() => router.push("/about")}>Sobre mí</NeonButtonSVG>

    <NeonButtonSVG onClick={() => alert("Proyectos!")}>Proyectos</NeonButtonSVG>
    <NeonButtonSVG onClick={() => alert("Contacto!")}>Contacto</NeonButtonSVG>
    </div>
  )
}
