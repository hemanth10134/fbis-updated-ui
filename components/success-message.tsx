"use client"

import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function SuccessMessage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className="bg-white rounded-2xl p-8 border border-blue-200 text-center"
        style={{
          background: "#FFFFFF",
          borderColor: "#E5E7EB",
          boxShadow: "0px 4px 18px rgba(0,0,0,0.04)",
        }}
      >
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center animate-bounce">
            <CheckCircle className="text-white" size={40} />
          </div>
        </div>

        <h2 className="text-4xl font-bold text-green-600 mb-2">Payment Successful!</h2>
        <p className="text-lg text-blue-700 mb-2">Your renewal application has been submitted successfully.</p>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8 border border-green-200 text-left">
          <h3 className="font-bold text-green-900 mb-4">Application Details:</h3>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-semibold text-green-900">Application ID:</span>{" "}
              <span className="text-green-700">FBIS-2025-001234</span>
            </p>
            <p>
              <span className="font-semibold text-green-900">Amount Paid:</span>{" "}
              <span className="text-green-700">₹15,000</span>
            </p>
            <p>
              <span className="font-semibold text-green-900">Date:</span>{" "}
              <span className="text-green-700">{new Date().toLocaleDateString()}</span>
            </p>
            <p>
              <span className="font-semibold text-green-900">Status:</span>{" "}
              <span className="text-green-700 font-bold">Under Review</span>
            </p>
          </div>
        </div>

        <p className="text-blue-700 mb-6">
          A confirmation email has been sent to your registered email address. You can track your application status
          from the dashboard.
        </p>

        <Link
          href="/dashboard"
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
