"use client"

import { useRef, useState, useEffect } from "react"

export default function ThreeDCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isNear, setIsNear] = useState(false)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()

      const dist = Math.hypot(
        e.clientX - (rect.left + rect.width / 2),
        e.clientY - (rect.top + rect.height / 2)
      )

      setIsNear(dist < 180)
    }

    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [])

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const rotateX = ((y - rect.height / 2) / 20).toFixed(2)
    const rotateY = ((rect.width / 2 - x) / 20).toFixed(2)

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
  }

  const handleLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)"
  }

  return (
    <div
      ref={cardRef}
      className={`rounded-2xl p-8 bg-white shadow-xl transition-all duration-300 border border-blue-100
      ${isNear ? "shadow-blue-300/40" : "shadow-gray-200"}`}
      onMouseMove={handleHover}
      onMouseLeave={handleLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        transition: "all 0.25s ease-out",
        boxShadow: isNear
          ? "0 20px 45px rgba(59,130,246,0.25)"
          : "0 12px 30px rgba(0,0,0,0.08)"
      }}
    >
      {/* Glow effect */}
      {isNear && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 blur-2xl rounded-2xl pointer-events-none"></div>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  )
}
