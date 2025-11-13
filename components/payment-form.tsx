"use client"

import type React from "react"
import { useState } from "react"
import { Lock } from "lucide-react"

interface PaymentFormProps {
  amount: string
  onSuccess: () => void
  onBack: () => void
}

export default function PaymentForm({ amount, onSuccess, onBack }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [processing, setProcessing] = useState(false)

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false)
      onSuccess()
    }, 2000)
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Payment Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Payment Details</h2>
        <p className="text-blue-100">Complete your renewal application payment</p>
      </div>

      {/* Payment Content */}
      <div
        className="bg-white rounded-b-2xl p-8 border-x border-b border-blue-200"
        style={{
          borderColor: "#E5E7EB",
          boxShadow: "0px 4px 18px rgba(0,0,0,0.04)",
        }}
      >
        {/* Amount Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
          <div className="flex justify-between items-center">
            <span className="text-lg text-blue-900 font-semibold">Total Amount Payable:</span>
            <span className="text-3xl font-bold text-blue-900">₹{amount}</span>
          </div>
        </div>

        <form onSubmit={handlePayment} className="space-y-6">
          {/* Payment Method Selection */}
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-4">Select Payment Method</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { id: "card", label: "Credit/Debit Card", icon: "💳" },
                { id: "netbanking", label: "Net Banking", icon: "🏦" },
                { id: "upi", label: "UPI", icon: "📱" },
              ].map((method) => (
                <label
                  key={method.id}
                  className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition"
                  style={{
                    borderColor: paymentMethod === method.id ? "#3B5BFF" : "#E5E7EB",
                    background: paymentMethod === method.id ? "#F3F6FF" : "#FFFFFF",
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="text-xl">{method.icon}</span>
                  <span className="font-medium text-blue-900">{method.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Card Details (shown when card is selected) */}
          {paymentMethod === "card" && (
            <div className="space-y-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ borderColor: "#E5E7EB", background: "#FFFFFF" }}
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">MM/YY</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: "#E5E7EB", background: "#FFFFFF" }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: "#E5E7EB", background: "#FFFFFF" }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">ZIP</label>
                  <input
                    type="text"
                    placeholder="ZIP"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: "#E5E7EB", background: "#FFFFFF" }}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Terms Checkbox */}
          <label
            className="flex items-start gap-3 p-4 border rounded-lg"
            style={{
              borderColor: "#E5E7EB",
              background: "#F7F9FC",
            }}
          >
            <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 accent-blue-600" required />
            <span className="text-sm text-blue-900">
              I agree to the terms and conditions and authorize the payment of ₹{amount} for the renewal application.
            </span>
          </label>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 px-6 py-3 border-2 border-blue-300 text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition"
              style={{ borderColor: "#E5E7EB" }}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={processing}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Lock size={18} />
              {processing ? "Processing..." : `Pay ₹${amount}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
