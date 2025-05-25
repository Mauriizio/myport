"use client"

import { useState, useEffect } from "react"

// Sistema de carga progresiva
export default function ProgressiveLoader() {
  const [loadingStage, setLoadingStage] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const stages = [
      { name: "Inicializando sistema...", duration: 800 },
      { name: "Cargando partículas...", duration: 600 },
      { name: "Activando efectos neón...", duration: 700 },
      { name: "Sistema listo", duration: 400 },
    ]

    let currentStage = 0

    const progressStage = () => {
      if (currentStage < stages.length) {
        setLoadingStage(currentStage)
        setTimeout(() => {
          currentStage++
          if (currentStage >= stages.length) {
            setIsComplete(true)
          } else {
            progressStage()
          }
        }, stages[currentStage].duration)
      }
    }

    progressStage()
  }, [])

  if (isComplete) return null

  const stages = ["Inicializando sistema...", "Cargando partículas...", "Activando efectos neón...", "Sistema listo"]

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-cyan-400 text-xl mb-4 font-mono">{stages[loadingStage]}</div>
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-magenta-400 transition-all duration-300"
            style={{ width: `${((loadingStage + 1) / stages.length) * 100}%` }}
          />
        </div>
        <div className="text-cyan-300 text-sm mt-2 font-mono">
          {Math.round(((loadingStage + 1) / stages.length) * 100)}%
        </div>
      </div>
    </div>
  )
}
