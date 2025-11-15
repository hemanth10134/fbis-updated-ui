"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FormInput from "@/components/ui/form-input";
import { Calculator, DollarSign } from "lucide-react";

export default function FeeCalculatorPage() {
  const [applicationType, setApplicationType] = useState("factory");
  const [category, setCategory] = useState("");
  const [workers, setWorkers] = useState("");
  const [calculations, setCalculations] = useState<any>(null);

  const calculateFees = () => {
    let baseFee = 0;
    let processingFee = 0;
    let inspectionFee = 0;
    let total = 0;

    if (applicationType === "factory") {
      baseFee = 15000;
      processingFee = 2000;
      inspectionFee = 8000;

      if (workers) {
        const workerCount = parseInt(workers);
        if (workerCount > 100) {
          inspectionFee += (workerCount - 100) * 10;
        }
      }
    } else if (applicationType === "boiler") {
      baseFee = 10000;
      processingFee = 1500;
      inspectionFee = 6500;
    } else if (applicationType === "renewal-factory") {
      baseFee = 12000;
      processingFee = 1000;
      inspectionFee = 6000;
    } else if (applicationType === "renewal-boiler") {
      baseFee = 8000;
      processingFee = 800;
      inspectionFee = 4000;
    }

    total = baseFee + processingFee + inspectionFee;

    setCalculations({
      baseFee,
      processingFee,
      inspectionFee,
      total,
      gst: Math.round(total * 0.18),
      finalAmount: Math.round(total * 1.18),
    });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FDFDFE" }}>
      <Navbar />

      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50 to-emerald-100 opacity-60" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
              <Calculator className="text-green-600" size={40} />
              Fee Calculator
            </h1>
            <p className="text-gray-600 text-lg">
              Calculate fees for your factory and boiler registrations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-green-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Fee</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Application Type
                  </label>
                  <select
                    value={applicationType}
                    onChange={(e) => {
                      setApplicationType(e.target.value);
                      setCalculations(null);
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="factory">Factory Registration</option>
                    <option value="boiler">Boiler Registration</option>
                    <option value="renewal-factory">Factory License Renewal</option>
                    <option value="renewal-boiler">Boiler Certificate Renewal</option>
                  </select>
                </div>

                {applicationType === "factory" && (
                  <>
                    <FormInput
                      label="Product Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      options={[
                        { value: "textile", label: "Textile Manufacturing" },
                        { value: "food", label: "Food & Beverage" },
                        { value: "chemical", label: "Chemical" },
                        { value: "electronics", label: "Electronics" },
                      ]}
                    />
                    <FormInput
                      label="Estimated Number of Workers"
                      type="number"
                      value={workers}
                      onChange={(e) => setWorkers(e.target.value)}
                      placeholder="e.g., 150"
                      helper="Additional fee applies for workers > 100"
                    />
                  </>
                )}

                <button
                  onClick={calculateFees}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg transition"
                >
                  Calculate Fee
                </button>
              </div>
            </div>

            {/* Results */}
            {calculations && (
              <div className="space-y-4">
                {/* Fee Breakdown */}
                <div className="bg-white rounded-xl p-8 shadow-lg border border-green-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Fee Breakdown</h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-gray-700 font-medium">Base Registration Fee</span>
                      <span className="text-lg font-bold">₹ {calculations.baseFee}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-gray-700 font-medium">Processing Fee</span>
                      <span className="text-lg font-bold">₹ {calculations.processingFee}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-gray-700 font-medium">Inspection/Certificate Fee</span>
                      <span className="text-lg font-bold">₹ {calculations.inspectionFee}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b-2 border-green-300 mb-3">
                      <span className="text-gray-700 font-medium">Subtotal</span>
                      <span className="text-lg font-bold">₹ {calculations.total}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b">
                      <span className="text-gray-700 font-medium">GST (18%)</span>
                      <span className="text-lg font-bold text-blue-600">+ ₹ {calculations.gst}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                      <span className="text-gray-900 font-bold text-lg">Total Amount Payable</span>
                      <span className="text-3xl font-bold text-green-600">₹ {calculations.finalAmount}</span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3">📋 Fee Summary</h4>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>✓ Valid for 5 years from issuance</li>
                    <li>✓ Includes inspection and certification</li>
                    <li>✓ Payment via online gateway</li>
                    <li>✓ Certificate issued within 7-10 business days</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Fee Structure Info */}
          <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Standard Fee Structure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="font-bold text-gray-900 text-lg mb-2">Factory Registration</h3>
                <p className="text-gray-600">₹ 25,000 (incl. GST)</p>
                <p className="text-sm text-gray-500 mt-1">Includes 5-year license validity</p>
              </div>
              <div className="border-l-4 border-amber-600 pl-6">
                <h3 className="font-bold text-gray-900 text-lg mb-2">Boiler Registration</h3>
                <p className="text-gray-600">₹ 18,000 (incl. GST)</p>
                <p className="text-sm text-gray-500 mt-1">Includes initial inspection</p>
              </div>
              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="font-bold text-gray-900 text-lg mb-2">Factory License Renewal</h3>
                <p className="text-gray-600">₹ 20,000 (incl. GST)</p>
                <p className="text-sm text-gray-500 mt-1">For 5-year renewal period</p>
              </div>
              <div className="border-l-4 border-purple-600 pl-6">
                <h3 className="font-bold text-gray-900 text-lg mb-2">Boiler Certificate Renewal</h3>
                <p className="text-gray-600">₹ 14,000 (incl. GST)</p>
                <p className="text-sm text-gray-500 mt-1">Annual certificate renewal</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
