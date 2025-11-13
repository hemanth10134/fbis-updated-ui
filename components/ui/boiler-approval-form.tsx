"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface BoilerApprovalFormProps {
  onNext?: (data: any) => void; // <-- FIXED (optional callback)
}

export default function BoilerApprovalForm({ onNext }: BoilerApprovalFormProps) {

  const [formData, setFormData] = useState({
    applicantName: "",
    mobileNumber: "",
    address1: "",
    address2: "",
    post: "",
    pincode: "",
    district: "",
    taluk: "",
    boilerMakerNo: "",
    feeAmount: "",
    feeInWords: "",
    file1: null as File | null,
    file2: null as File | null,
    file3: null as File | null,
    file4: null as File | null,
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // 🔥 Call the onNext function from parent page
    onNext?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl mx-auto">

      {/* SECTION 1: Personal Details */}
      <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm">
        <h3 className="text-xl font-bold text-blue-900 mb-6">
          1. Full Address of the Applicant
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="block text-sm text-blue-900 mb-2">Applicant Name</label>
            <input
              name="applicantName"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-blue-50"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-sm text-blue-900 mb-2">Mobile Number</label>
            <input
              name="mobileNumber"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-blue-50"
              placeholder="Phone number"
            />
          </div>

          <div>
            <label className="block text-sm text-blue-900 mb-2">Address Line 1</label>
            <input
              name="address1"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-blue-50"
              placeholder="Address"
            />
          </div>

          <div>
            <label className="block text-sm text-blue-900 mb-2">Address Line 2</label>
            <input
              name="address2"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-blue-50"
              placeholder="Address"
            />
          </div>

          <div>
            <label className="block text-sm text-blue-900 mb-2">Post</label>
            <input
              name="post"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-blue-50"
              placeholder="Post"
            />
          </div>

          <div>
            <label className="block text-sm text-blue-900 mb-2">Pincode</label>
            <input
              name="pincode"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-blue-50"
              placeholder="Pincode"
            />
          </div>

          <div>
            <label className="block text-sm text-blue-900 mb-2">District</label>
            <input
              name="district"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-blue-50"
              placeholder="District"
            />
          </div>

          <div>
            <label className="block text-sm text-blue-900 mb-2">Taluk</label>
            <input
              name="taluk"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-blue-50"
              placeholder="Taluk"
            />
          </div>

        </div>
      </div>

      {/* SECTION 2: Boiler Details */}
      <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm">
        <h3 className="text-xl font-bold text-blue-900 mb-6">
          2. Boiler Maker's Number
        </h3>

        <input
          name="boilerMakerNo"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-blue-50"
          placeholder="Boiler Maker Number"
        />
      </div>

      {/* SECTION 3: Fee Details */}
      <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm">
        <h3 className="text-xl font-bold text-blue-900 mb-6">
          3. Fee Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            name="feeAmount"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-blue-50"
            placeholder="Rs Amount"
          />

          <input
            name="feeInWords"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg bg-blue-50"
            placeholder="Amount in Words"
          />
        </div>
      </div>

      {/* SECTION 4: File Upload */}
      <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm">
        <h3 className="text-xl font-bold text-blue-900 mb-6">
          4. Mandatory Documents to be Submitted
        </h3>

        <div className="space-y-5">

          <div>
            <p className="font-semibold text-blue-900 mb-2">
              IBR Design / Strength Calculations
            </p>
            <input type="file" name="file1" onChange={handleChange} className="w-full" />
          </div>

          <div>
            <p className="font-semibold text-blue-900 mb-2">
              Recognition of Manufacturing Firm
            </p>
            <input type="file" name="file2" onChange={handleChange} className="w-full" />
          </div>

          <div>
            <p className="font-semibold text-blue-900 mb-2">
              Drawings as per IBR 1950 Amendments
            </p>
            <input type="file" name="file3" onChange={handleChange} className="w-full" />
          </div>

          <div>
            <p className="font-semibold text-blue-900 mb-2">
              Other Documents (if any)
            </p>
            <input type="file" name="file4" onChange={handleChange} className="w-full" />
          </div>

        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg
          hover:shadow-lg hover:scale-105 transition flex items-center gap-2"
        >
          Proceed <ChevronRight size={20} />
        </button>
      </div>

    </form>
  );
}
