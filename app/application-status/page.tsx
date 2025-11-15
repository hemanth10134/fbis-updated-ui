"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FormInput from "@/components/ui/form-input";
import { Search, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function ApplicationStatusPage() {
  const [searchType, setSearchType] = useState("registration");
  const [searchValue, setSearchValue] = useState("");
  const [applicationData, setApplicationData] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  // Mock data for demonstration
  const mockApplications: Record<string, any> = {
    "FA-2024-001": {
      type: "Factory Registration",
      status: "In Progress",
      statusColor: "bg-blue-100 text-blue-800",
      submittedDate: "2024-11-01",
      applicantName: "ABC Manufacturing Ltd",
      address: "123 Industrial Area, Bangalore",
      currentStep: 2,
      totalSteps: 4,
      steps: [
        { step: 1, name: "Application Submitted", completed: true, date: "2024-11-01" },
        { step: 2, name: "Documents Verification", completed: true, date: "2024-11-05" },
        { step: 3, name: "Site Inspection", completed: false },
        { step: 4, name: "License Issued", completed: false },
      ],
    },
    "BR-2024-002": {
      type: "Boiler Registration",
      status: "Approved",
      statusColor: "bg-green-100 text-green-800",
      submittedDate: "2024-10-15",
      applicantName: "XYZ Boiler Works",
      boilerType: "Fire Tube Boiler",
      capacity: "5000 kg/hr",
      currentStep: 4,
      totalSteps: 4,
      steps: [
        { step: 1, name: "Application Submitted", completed: true, date: "2024-10-15" },
        { step: 2, name: "Documents Review", completed: true, date: "2024-10-18" },
        { step: 3, name: "Inspection Conducted", completed: true, date: "2024-10-25" },
        { step: 4, name: "Certificate Issued", completed: true, date: "2024-11-01" },
      ],
    },
    "REN-2024-003": {
      type: "License Renewal",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800",
      submittedDate: "2024-11-08",
      applicantName: "Industrial Solutions Pvt Ltd",
      renewalFor: "Factory License",
      currentStep: 1,
      totalSteps: 3,
      steps: [
        { step: 1, name: "Renewal Request Received", completed: true, date: "2024-11-08" },
        { step: 2, name: "Processing", completed: false },
        { step: 3, name: "Renewal Issued", completed: false },
      ],
    },
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      setSearched(true);
      const data = mockApplications[searchValue.toUpperCase()];
      if (data) {
        setApplicationData(data);
      } else {
        setApplicationData(null);
      }
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === "Approved") return <CheckCircle2 className="text-green-600" size={24} />;
    if (status === "In Progress") return <Clock className="text-blue-600" size={24} />;
    return <AlertCircle className="text-yellow-600" size={24} />;
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FDFDFE" }}>
      <Navbar />

      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50 to-pink-100 opacity-60" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
              <Search className="text-purple-600" size={40} />
              Application Status Tracker
            </h1>
            <p className="text-gray-600 text-lg">
              Track your factory and boiler application status in real-time
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-white rounded-xl p-8 shadow-lg mb-8 border border-purple-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Search Your Application</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Search Type
                  </label>
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="registration">By Registration Number</option>
                    <option value="email">By Email Address</option>
                    <option value="name">By Factory/Boiler Name</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Enter {searchType === "registration" ? "Registration Number" : "Details"}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      searchType === "registration"
                        ? "e.g., FA-2024-001"
                        : searchType === "email"
                        ? "e.g., abc@gmail.com"
                        : "e.g., ABC Manufacturing"
                    }
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleSearch}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:shadow-lg transition"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Sample Numbers */}
              <p className="text-sm text-gray-500 mt-4">
                💡 Try searching with: FA-2024-001, BR-2024-002, or REN-2024-003
              </p>
            </div>
          </div>

          {/* Results */}
          {searched && !applicationData && (
            <div className="bg-red-50 border border-red-300 rounded-xl p-8 text-center">
              <AlertCircle className="mx-auto text-red-600 mb-4" size={48} />
              <h3 className="text-xl font-bold text-red-900 mb-2">Application Not Found</h3>
              <p className="text-red-700">No matching application found for the provided details.</p>
            </div>
          )}

          {applicationData && (
            <div className="space-y-6">
              {/* Application Summary */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-purple-200">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {applicationData.applicantName}
                    </h2>
                    <p className="text-gray-600">
                      <strong>Application Type:</strong> {applicationData.type}
                    </p>
                    {applicationData.address && (
                      <p className="text-gray-600">
                        <strong>Address:</strong> {applicationData.address}
                      </p>
                    )}
                    <p className="text-gray-600 mt-2">
                      <strong>Submitted:</strong> {applicationData.submittedDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(applicationData.status)}
                      <span
                        className={`px-4 py-2 rounded-full font-semibold text-sm ${applicationData.statusColor}`}
                      >
                        {applicationData.status}
                      </span>
                    </div>
                    <div className="text-gray-600 text-sm mt-4">
                      <p>
                        Step {applicationData.currentStep} of {applicationData.totalSteps}
                      </p>
                      <div className="w-32 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                          style={{
                            width: `${(applicationData.currentStep / applicationData.totalSteps) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Application Timeline</h3>

                <div className="relative pl-8">
                  {applicationData.steps.map((step: any, index: number) => (
                    <div key={step.step} className="mb-8 relative">
                      {/* Timeline dot */}
                      <div
                        className={`absolute left-[-32px] top-0 w-6 h-6 rounded-full flex items-center justify-center ${
                          step.completed
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 border-4 border-white"
                        }`}
                      >
                        {step.completed && <CheckCircle2 size={16} />}
                      </div>

                      {/* Timeline line */}
                      {index < applicationData.steps.length - 1 && (
                        <div
                          className={`absolute left-[-26px] top-6 w-1 h-12 ${
                            step.completed ? "bg-green-500" : "bg-gray-300"
                          }`}
                        />
                      )}

                      {/* Content */}
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{step.name}</h4>
                        {step.completed ? (
                          <p className="text-green-600 text-sm mt-1">✓ Completed on {step.date}</p>
                        ) : (
                          <p className="text-gray-500 text-sm mt-1">Pending...</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              {applicationData.status !== "Approved" && (
                <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
                  <h3 className="text-lg font-bold text-blue-900 mb-4">📋 Next Steps</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>✓ You will receive an email notification when your application moves to the next stage</li>
                    <li>✓ Required documents: Please keep them ready for inspection</li>
                    <li>✓ For queries, contact the department at 080-26531200</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* How to Search Section */}
          {!searched && (
            <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Track Your Application</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border-l-4 border-purple-600 pl-6">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">📝 Step 1</h4>
                  <p className="text-gray-600">Enter your registration number (provided after submission)</p>
                </div>
                <div className="border-l-4 border-purple-600 pl-6">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">🔍 Step 2</h4>
                  <p className="text-gray-600">Click Search to view your application status</p>
                </div>
                <div className="border-l-4 border-purple-600 pl-6">
                  <h4 className="font-bold text-gray-900 text-lg mb-2">📊 Step 3</h4>
                  <p className="text-gray-600">View real-time progress and required documents</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
