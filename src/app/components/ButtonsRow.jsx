"use client"

import { Link } from 'react-scroll'

import { useRouter } from 'next/navigation'

import NeonButtonSVG from "./NeonButtonSVG"


export default function ButtonsRow() {
  const router = useRouter()
  return (
    <div className="button-row"> <Link to="sobremi" smooth={true} duration={800}>
        <NeonButtonSVG>Sobre mí</NeonButtonSVG>
      </Link>
      <Link to="proyectos" smooth={true} duration={800}>
        <NeonButtonSVG>Proyectos</NeonButtonSVG>
      </Link>
      <Link to="contacto" smooth={true} duration={800}>
        <NeonButtonSVG>Contacto</NeonButtonSVG>
      </Link>
    </div>
  )
}
