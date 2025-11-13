"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import RenewalForm from "@/components/renewal-form"
import PaymentForm from "@/components/payment-form"
import SuccessMessage from "@/components/success-message"

type Step = "form" | "payment" | "success"

export default function RenewalPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>("form")
  const [amount, setAmount] = useState("15000")

  const handleFormNext = (data: any) => {
    console.log("Form data:", data)
    setAmount(data.amountPayable)
    setStep("payment")
  }

  const handlePaymentSuccess = () => {
    setStep("success")
    // Auto-redirect after 5 seconds
    setTimeout(() => {
      router.push("/dashboard")
    }, 5000)
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FDFDFE" }}>
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-blue-100 opacity-60"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex justify-between items-center">
              {[
                { label: "Application Form", key: "form" },
                { label: "Payment", key: "payment" },
                { label: "Confirmation", key: "success" },
              ].map((item, index) => (
                <div key={item.key} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      step === item.key
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white scale-110"
                        : ["form", "payment", "success"].indexOf(step) > index
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <p className={`ml-3 font-semibold ${step === item.key ? "text-blue-900" : "text-gray-600"}`}>
                    {item.label}
                  </p>
                  {index < 2 && (
                    <div
                      className={`flex-1 h-1 mx-4 transition-all ${
                        ["form", "payment", "success"].indexOf(step) > index ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div
            className="bg-white rounded-2xl p-8 border border-blue-200"
            style={{
              background: "#FFFFFF",
              borderColor: "#E5E7EB",
              boxShadow: "0px 4px 18px rgba(0,0,0,0.04)",
            }}
          >
            {step === "form" && <RenewalForm onNext={handleFormNext} />}
            {step === "payment" && (
              <PaymentForm amount={amount} onSuccess={handlePaymentSuccess} onBack={() => setStep("form")} />
            )}
            {step === "success" && <SuccessMessage />}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
