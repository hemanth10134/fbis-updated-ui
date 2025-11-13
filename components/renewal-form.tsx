"use client"

import type React from "react"
import { useState } from "react"
import { ChevronRight } from "lucide-react"

interface FormData {
  applicantName: string
  mobileNumber: string
  workAddress1: string
  workAddress2: string
  post: string
  pincode: string
  district: string
  taluk: string
  dateOfBirth: string
  fatherName: string
  educationalQualifications: string
  professionalExperience: string
  membershipDetails: string
  facilitiesDetails: string
  calibrationArrangement: string
  otherInfo: string
  selectedPurposes: string[]
  amountPayable: string
}

interface RenewalFormProps {
  onNext: (data: FormData) => void
}

export default function RenewalForm({ onNext }: RenewalFormProps) {
  const [formData, setFormData] = useState<FormData>({
    applicantName: "",
    mobileNumber: "",
    workAddress1: "",
    workAddress2: "",
    post: "",
    pincode: "",
    district: "BANGALORE (RURAL)",
    taluk: "BANGALORE (RURAL)",
    dateOfBirth: "",
    fatherName: "",
    educationalQualifications: "",
    professionalExperience: "",
    membershipDetails: "",
    facilitiesDetails: "",
    calibrationArrangement: "",
    otherInfo: "",
    selectedPurposes: [],
    amountPayable: "15000",
  })

  const purposes = [
    {
      id: "10a",
      title: "Factories Act 1948, Section 28/29",
      desc: "Lift & Hoist /Lifting machines, Chains, Ropes, Lifting tackles",
    },
    { id: "10b", title: "Factories Act 1948, Section 31", desc: "Pressure Vessels & Pressure Plants" },
    { id: "10c", title: "Karnataka Factories Rules 1989, Rule 57", desc: "Centrifugal Machines" },
    { id: "10d", title: "Karnataka Factories Rules 1989, Rule 57", desc: "Power Press" },
    { id: "10e", title: "Karnataka Factories Rules 1989, Rule 88", desc: "Ovens & Driers" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePurposeToggle = (purposeId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedPurposes: prev.selectedPurposes.includes(purposeId)
        ? prev.selectedPurposes.filter((id) => id !== purposeId)
        : [...prev.selectedPurposes, purposeId],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section 1: Personal Details */}
      <div
        className="bg-white rounded-2xl p-6 border border-blue-200"
        style={{
          background: "#FFFFFF",
          borderColor: "#E5E7EB",
          boxShadow: "0px 4px 18px rgba(0,0,0,0.04)",
        }}
      >
        <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-bold">
            1
          </span>
          Personal Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">Name of Applicant *</label>
            <input
              type="text"
              name="applicantName"
              value={formData.applicantName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: "#E5E7EB", background: "#F7F9FC" }}
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">Mobile Number *</label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: "#E5E7EB", background: "#F7F9FC" }}
              placeholder="10-digit number"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">Work Address 1 *</label>
            <input
              type="text"
              name="workAddress1"
              value={formData.workAddress1}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: "#E5E7EB", background: "#F7F9FC" }}
              placeholder="Address line 1"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">Work Address 2</label>
            <input
              type="text"
              name="workAddress2"
              value={formData.workAddress2}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: "#E5E7EB", background: "#F7F9FC" }}
              placeholder="Address line 2"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">Post *</label>
            <input
              type="text"
              name="post"
              value={formData.post}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: "#E5E7EB", background: "#F7F9FC" }}
              placeholder="Post name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">Pincode *</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: "#E5E7EB", background: "#F7F9FC" }}
              placeholder="6-digit pincode"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">District *</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: "#E5E7EB", background: "#F7F9FC" }}
            >
              <option>BANGALORE (RURAL)</option>
              <option>BANGALORE (URBAN)</option>
              <option>BELGAUM</option>
              <option>MANGALORE</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">Taluk *</label>
            <select
              name="taluk"
              value={formData.taluk}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: "#E5E7EB", background: "#F7F9FC" }}
            >
              <option>BANGALORE (RURAL)</option>
              <option>WHITEFIELD</option>
              <option>CHIKBALLAPUR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 2: Additional Information */}
      <div
        className="bg-white rounded-2xl p-6 border border-blue-200"
        style={{
          background: "#FFFFFF",
          borderColor: "#E5E7EB",
          boxShadow: "0px 4px 18px rgba(0,0,0,0.04)",
        }}
      >
        <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-bold">
            2
          </span>
          Additional Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">Date of Birth *</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: "#E5E7EB", background: "#F7F9FC" }}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">Father's Name *</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: "#E5E7EB", background: "#F7F9FC" }}
              placeholder="Father's name"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-blue-900 mb-2">Educational Qualifications *</label>
            <input
              type="text"
              name="educationalQualifications"
              value={formData.educationalQualifications}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: "#E5E7EB", background: "#F7F9FC" }}
              placeholder="List your qualifications"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-blue-900 mb-2">Professional Experience *</label>
            <textarea
              name="professionalExperience"
              value={formData.professionalExperience}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ borderColor: "#E5E7EB", background: "#F7F9FC" }}
              placeholder="Describe your experience"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Section 3: Purpose */}
      <div
        className="bg-white rounded-2xl p-6 border border-blue-200"
        style={{
          background: "#FFFFFF",
          borderColor: "#E5E7EB",
          boxShadow: "0px 4px 18px rgba(0,0,0,0.04)",
        }}
      >
        <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-bold">
            3
          </span>
          Purpose for Competency Certificate
        </h3>

        <div className="space-y-3">
          {purposes.map((purpose) => (
            <label
              key={purpose.id}
              className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:bg-blue-50 transition"
              style={{
                borderColor: "#E5E7EB",
                background: formData.selectedPurposes.includes(purpose.id) ? "#F3F6FF" : "#FFFFFF",
              }}
            >
              <input
                type="checkbox"
                checked={formData.selectedPurposes.includes(purpose.id)}
                onChange={() => handlePurposeToggle(purpose.id)}
                className="mt-1 w-5 h-5 rounded accent-blue-600"
              />
              <div>
                <p className="font-semibold text-blue-900 text-sm">{purpose.title}</p>
                <p className="text-blue-700 text-xs">{purpose.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Amount */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-blue-700 mb-1">Amount Payable</p>
            <p className="text-3xl font-bold text-blue-900">₹{formData.amountPayable}</p>
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
          >
            Continue to Payment <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </form>
  )
}
