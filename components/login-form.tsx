"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock } from "lucide-react"
import SignupFlow from "./SignupFlow"

export default function LoginForm() {
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isNearCard, setIsNearCard] = useState(false)
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return

      const rect = cardRef.current.getBoundingClientRect()
      const distance = Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2))

      setIsNearCard(distance < 100)
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    if (!formData.userId.trim()) {
      newErrors.userId = "User ID is required"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      console.log("Login attempt:", formData)
      router.push("/dashboard")
    }
  }

  return (
    <div
      ref={cardRef}
      className="w-full max-w-md transition-all duration-300"
      style={{
        transform: isNearCard ? "translateY(-16px) scale(1.02)" : "translateY(0) scale(1)",
      }}
    >
      <div
        className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 relative overflow-hidden"
        style={{
          boxShadow: isNearCard ? "0px 12px 30px rgba(0,0,0,0.10)" : "0px 8px 28px rgba(0,0,0,0.06)",
          borderColor: isNearCard ? "rgba(59,91,255,0.2)" : "#E5E7EB",
          transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          outline: isNearCard ? "4px solid rgba(59,91,255,0.08)" : "none",
        }}
      >
        {/* Gradient accent bar at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-500"
          style={{
            animation: "gradientShift 2s ease-in-out infinite",
            borderRadius: "0 0 22px 22px",
          }}
        ></div>

        {/* Icon with badge */}
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-gray-200 bg-white shadow-sm"
            style={{
              background: "linear-gradient(135deg, #3B5BFF, #4C3DFF)",
              border: "2px solid white",
              boxShadow: "0px 4px 12px rgba(59,91,255,0.2)",
            }}
          >
            <Lock className="text-white" size={28} />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b-2 border-blue-200 mb-8">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-4 px-6 font-semibold text-center transition-all relative ${
              activeTab === "login" ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            Login
            {activeTab === "login" && (
              <div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600"
                style={{
                  animation: "slideIn 0.3s ease-out",
                }}
              ></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-4 px-6 font-semibold text-center transition-all relative ${
              activeTab === "signup" ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            Signup
            {activeTab === "signup" && (
              <div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600"
                style={{
                  animation: "slideIn 0.3s ease-out",
                }}
              ></div>
            )}
          </button>
        </div>

<div>
  {activeTab === "login" ? (
    // ---------------- LOGIN UI ----------------
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
        Login Here
      </h2>

      {/* USER ID */}
      <div>
        <label htmlFor="userId" className="block text-sm font-medium text-blue-900 mb-2">
          User ID
        </label>
        <input
          type="text"
          id="userId"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          placeholder="Enter your user ID"
          className="w-full px-4 py-3 border-2 rounded-lg"
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-blue-900 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-3 pr-12 border-2 rounded-lg"
          />
        </div>
      </div>

      {/* FORGOT PASSWORD */}
      <div className="text-right">
        <a href="#" className="text-sm text-blue-600">Forgot Password?</a>
      </div>

      {/* LOGIN BUTTON */}
      <button
        type="submit"
        className="w-full py-3 px-4 text-white font-bold rounded-lg bg-blue-600"
      >
        Login
      </button>
    </form>
  ) : (
    // ---------------- SIGNUP UI ----------------
    <SignupFlow />
  )}
</div>

      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes gradientShift {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  )
}
