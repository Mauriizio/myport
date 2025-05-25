"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

// Error Boundary para efectos neón
export class NeonErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error en componente neón:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center min-h-[200px] bg-black/50 rounded-lg border border-red-500/30">
            <div className="text-center">
              <div className="text-red-400 text-lg mb-2">⚠️ Error en el sistema</div>
              <div className="text-red-300 text-sm">Los efectos neón no pudieron cargarse correctamente</div>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="mt-4 px-4 py-2 bg-red-500/20 border border-red-500 text-red-300 rounded hover:bg-red-500/30 transition-colors"
              >
                Reintentar
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
