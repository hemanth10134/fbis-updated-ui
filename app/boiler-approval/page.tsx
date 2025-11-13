"use client";

import { useState } from "react";
import BoilerApprovalForm from "@/components/ui/boiler-approval-form";
import { CheckCircle, ChevronRight } from "lucide-react";

export default function BoilerApprovalPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<any>(null);

  // Step 1 → After form submit
  const handleFormSubmit = (data: any) => {
    setFormData(data);
    setStep(2); // go to payment step
  };

  // Step 2 → Complete payment
  const handlePayment = () => {
    setStep(3); // go to success step
  };

  return (
    <div className="min-h-screen p-6">

      {step === 1 && (
        <BoilerApprovalForm onNext={handleFormSubmit} />
      )}

      {step === 2 && (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-blue-200">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">
            Payment Details
          </h2>

          <p className="text-lg text-blue-700 mb-4">
            Amount Payable:
          </p>

          <p className="text-4xl font-bold text-blue-900 mb-6">
            ₹ 15000
          </p>

          <button
            onClick={handlePayment}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:scale-105 transition flex items-center justify-center gap-2"
          >
            Pay Now <ChevronRight size={20} />
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center justify-center py-20">
          <CheckCircle className="text-green-600" size={80} />
          <h2 className="text-3xl font-bold text-green-700 mt-6 mb-4">
            Successfully Submitted!
          </h2>
          <p className="text-blue-700 mb-8 text-center max-w-md">
            Your Boiler / Boiler Component Approval Application has been submitted successfully.
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
