"use client";

import { useState } from "react";
import { CheckCircle, ChevronRight } from "lucide-react";
import BoilerRegistrationForm from "@/components/ui/boiler-registration-form";

export default function BoilerRegistrationPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<any>(null);

  const handleFormSubmit = (data: any) => {
    setFormData(data);
    setStep(2);
  };

  const handlePayment = () => {
    setStep(3);
  };

  return (
    <div className="min-h-screen p-6">

      {step === 1 && (
        <BoilerRegistrationForm onNext={handleFormSubmit} />
      )}

      {step === 2 && (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-blue-200">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Payment Details
          </h2>

          <p className="text-lg text-blue-700 mb-4">Amount Payable:</p>

          <p className="text-4xl font-bold text-blue-900 mb-6">
            ₹ 1200
          </p>

          <button
            onClick={handlePayment}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg transition hover:scale-105 flex items-center justify-center gap-2"
          >
            Pay Now <ChevronRight size={20} />
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center justify-center py-20">
          <CheckCircle className="text-green-600" size={80} />
          <h2 className="text-3xl font-bold text-green-700 mt-6 mb-4">
            Boiler Registration Submitted!
          </h2>

          <p className="text-blue-700 mb-8 text-center max-w-md">
            Your Application for Registration of New Small Industrial Boiler has been successfully submitted.
          </p>

          <a
            href="/dashboard"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-bold"
          >
            Back to Dashboard
          </a>
        </div>
      )}

    </div>
  );
}
