"use client"

import type React from "react"
import { useState } from "react"
import { Search, AlertCircle, FileCheck, AlertTriangle } from "lucide-react"

export default function DashboardBody() {
  const [licenseNumber, setLicenseNumber] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (licenseNumber.trim()) {
      console.log("Searching for license:", licenseNumber)
    }
  }

  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-blue-100 opacity-60"></div>

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <div className="text-9xl font-bold text-blue-600">🏛️</div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Message */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-2">Welcome to FBIS</h2>
          <p className="text-lg text-blue-700">Factory and Boiler Information System</p>
        </div>

        {/* Two Column Layout */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Check License Status Card */}
          <div
            className="bg-white rounded-3xl shadow-lg p-8 border border-blue-200"
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              boxShadow: "0px 4px 18px rgba(0,0,0,0.04)",
            }}
          >
            <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">Check Your License Status</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="license" className="block text-sm font-semibold text-blue-900 mb-3">
                  Enter Your Factory License Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="license"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    placeholder="MYB-1234"
                    className="w-full px-4 py-3 pl-4 pr-12 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:border-blue-400 transition"
                    style={{
                      background: "#F7F9FC",
                      borderColor: "#E5E7EB",
                    }}
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(90deg, #3B5BFF, #4C3DFF)",
                }}
              >
                Search License
              </button>
            </form>
          </div>

          {/* New Application / Renewal Card */}
          <div
            className="bg-white rounded-3xl shadow-lg p-8 border border-blue-200 relative"
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              boxShadow: "0px 4px 18px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #3B5BFF, #4C3DFF)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FileCheck className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-blue-900">New Application</h3>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex gap-3">
              <AlertTriangle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-red-700 font-semibold text-sm">Certificate Expiring Soon</p>
                <p className="text-red-600 text-xs">
                  Your factory license will expire on Dec 15, 2025. Apply for renewal now.
                </p>
              </div>
            </div>

            <p className="text-blue-700 mb-6 text-sm leading-relaxed">
              Start your factory registration or renewal application. Click below to begin the process.
            </p>

            <div className="space-y-3">
              <a
                href="/renewal"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 active:scale-95 inline-block text-center"
                style={{
                  background: "linear-gradient(90deg, #3B5BFF, #4C3DFF)",
                }}
              >
                Apply for Renewal
              </a>
              <button
                className="w-full py-3 px-4 bg-white border-2 border-blue-300 text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition"
                style={{
                  borderColor: "#E5E7EB",
                  color: "#3B5BFF",
                }}
              >
                New Application
              </button>
            </div>
          </div>
        </div>

        {/* Informational Messages */}
        <div className="w-full max-w-2xl space-y-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex gap-4">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-red-700 font-medium">New User?</p>
              <p className="text-red-600 text-sm">
                If you are a new user and not having a valid License Number, then click on{" "}
                <strong>Services - Factories → Approval of Plans Tab</strong>
              </p>
            </div>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg flex gap-4">
            <AlertCircle className="text-orange-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-orange-700 font-medium">New Boiler User?</p>
              <p className="text-orange-600 text-sm">
                If you are a new Boiler user, then click on{" "}
                <strong>Services - Boilers → Issue of Boiler/Economiser Certificate on Annual Inspection</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
