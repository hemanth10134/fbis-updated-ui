"use client";
import { useState } from "react";

export default function SignupFlow() {
  const [step, setStep] = useState(1);

  return (
    <div className="space-y-8">

      {/* STEP 1 — YES/NO */}
      {step === 1 && (
        <div className="text-center space-y-6">
          <p className="text-lg font-medium text-blue-900">
            Do you have factory license?
          </p>

          <div className="flex justify-center gap-6">
            <button
              onClick={() => setStep(3)}
              className="px-8 py-2 rounded border bg-gray-100"
            >
              NO
            </button>

            <button
              onClick={() => setStep(2)}
              className="px-8 py-2 rounded bg-blue-600 text-white shadow"
            >
              YES
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 — License Verification */}
      {step === 2 && (
        <div className="text-center space-y-6">
          <p className="font-medium text-gray-700">
            Enter License number to verify
          </p>

          <input
            type="text"
            placeholder="Factory License Number (MYB-00000)"
            className="w-full border px-4 py-2 rounded"
          />

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-2 bg-gray-200 rounded"
            >
              BACK
            </button>

            <button
              onClick={() => setStep(3)}
              className="px-6 py-2 bg-blue-600 text-white rounded shadow"
            >
              VERIFY
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 — Registration Form */}
      {step === 3 && (
        <div className="space-y-5">
          <h3 className="text-center text-xl font-semibold text-blue-900">
            New Registration
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <input className="border px-4 py-2 rounded" placeholder="User ID *" />
            <input className="border px-4 py-2 rounded" placeholder="Occupier First Name *" />
            <input className="border px-4 py-2 rounded" placeholder="Occupier Last Name *" />
            <input type="date" className="border px-4 py-2 rounded" placeholder="DOB *" />
            <input className="border px-4 py-2 rounded" placeholder="Mobile *" />
            <input className="border px-4 py-2 rounded" placeholder="Email *" />
            <input className="border px-4 py-2 rounded" placeholder="Factory / Boiler Owner Name *" />
            <input className="border px-4 py-2 rounded" placeholder="Address *" />
            <input className="border px-4 py-2 rounded" placeholder="City *" />
            <input className="border px-4 py-2 rounded" placeholder="Pincode *" />
          </div>

          {/* CAPTCHA */}
          <div>
            <label className="font-medium text-gray-700">Captcha *</label>
            <div className="flex gap-4 mt-2">
              <div className="w-40 h-12 bg-gray-300 flex items-center justify-center border">
                penhf
              </div>
              <input className="border px-3 py-2 rounded" />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-2 bg-gray-200 rounded"
            >
              BACK
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded shadow">
              REGISTER
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
