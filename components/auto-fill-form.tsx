"use client";

import { useState } from "react";
import { AlertCircle, Edit2, CheckCircle2 } from "lucide-react";
import FormInput from "@/components/ui/form-input";
import FormSection from "@/components/ui/form-section";
import Tabs from "@/components/ui/tabs-custom";

interface AutoFillFormProps {
  uploadedDocuments: any[];
  onNext?: (data: any) => void;
}

export default function AutoFillForm({
  uploadedDocuments,
  onNext,
}: AutoFillFormProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const [edited, setEdited] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock auto-filled data from documents
  const [formData, setFormData] = useState({
    // Basic Information (extracted from GST & PAN)
    factoryName: "ABC Manufacturing Pvt Ltd",
    registrationNumber: "KA/2024/001234",
    ownerName: "Rajesh Kumar Singh",
    ownerEmail: "rajesh.singh@abcmfg.com",
    ownerPhone: "+91 9876543210",

    // Address Information (extracted from documents)
    factoryAddress: "Sy. No. 456, Industrial Area, Peenya Phase 1, Bangalore",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560058",
    latitude: "13.1939",
    longitude: "77.5941",

    // Factory Details
    industryType: "manufacturing",
    productCategory: "machinery",
    productDescription: "Industrial machinery components and parts",
    estimatedWorkers: "150",
    machineCount: "25",

    // Manufacturing Details
    manufacturingProcess: "CNC machining and assembly",
    rawMaterials: "Steel, Aluminum, Brass",
    hazardousSubstances: "None",
    powerConsumption: "500",
    productionCapacity: "5000",

    // Compliance Details
    pollutionBoard: "yes",
    fireSafety: "yes",
    electricalSafety: "yes",
    buildingPlan: "yes",

    // Amount
    totalAmount: "25000",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setEdited(true);
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.factoryName.trim())
      newErrors.factoryName = "Factory name is required";
    if (!formData.ownerEmail.trim())
      newErrors.ownerEmail = "Email is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext?.(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Auto-Fill Notification */}
      <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 flex items-start gap-4">
        <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={24} />
        <div className="flex-1">
          <h3 className="font-bold text-green-900 mb-1">✓ Form Auto-Filled Successfully</h3>
          <p className="text-sm text-green-800 mb-3">
            We've extracted information from your uploaded documents. Please review and update any information if needed.
          </p>
          {edited && (
            <div className="flex items-center gap-2 text-sm text-green-700">
              <Edit2 size={16} />
              You've made changes to the form
            </div>
          )}
        </div>
      </div>

      {/* Documents Uploaded Summary */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3">📎 Uploaded Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {uploadedDocuments.map((doc, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <CheckCircle2 size={16} className="text-green-600" />
              <span className="text-gray-700">{doc.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { id: "basic", label: "📋 Basic Info" },
          { id: "address", label: "📍 Address" },
          { id: "factory", label: "🏭 Factory Details" },
          { id: "manufacturing", label: "⚙️ Manufacturing" },
          { id: "compliance", label: "✅ Compliance" },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {/* Basic Information Tab */}
        {activeTab === "basic" && (
          <FormSection
            title="Basic Factory Information"
            description="Review and update factory owner details"
            icon="📋"
          >
            <div className="space-y-4 mb-4">
              <div className="flex items-start gap-3 bg-amber-50 p-4 rounded-lg border border-amber-200">
                <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-amber-800">
                  <strong>Extracted from documents:</strong> Factory name, owner information, and contact details have been pre-filled from your GST certificate and PAN card.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Factory Name"
                value={formData.factoryName}
                onChange={handleChange}
                name="factoryName"
                error={errors.factoryName}
                required
              />
              <FormInput
                label="Registration Number"
                value={formData.registrationNumber}
                onChange={handleChange}
                name="registrationNumber"
                required
              />
              <FormInput
                label="Owner Name"
                value={formData.ownerName}
                onChange={handleChange}
                name="ownerName"
                required
              />
              <FormInput
                label="Owner Email"
                type="email"
                value={formData.ownerEmail}
                onChange={handleChange}
                name="ownerEmail"
                error={errors.ownerEmail}
                required
              />
              <FormInput
                label="Owner Phone"
                type="tel"
                value={formData.ownerPhone}
                onChange={handleChange}
                name="ownerPhone"
              />
            </div>
          </FormSection>
        )}

        {/* Address Tab */}
        {activeTab === "address" && (
          <FormSection
            title="Factory Location & Address"
            description="Review location details extracted from your documents"
            icon="📍"
          >
            <div className="space-y-4 mb-4">
              <div className="flex items-start gap-3 bg-amber-50 p-4 rounded-lg border border-amber-200">
                <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-amber-800">
                  <strong>Extracted from address proof:</strong> Complete factory address and location details.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <FormInput
                label="Factory Address"
                value={formData.factoryAddress}
                onChange={handleChange}
                name="factoryAddress"
                multiline
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormInput
                  label="City"
                  value={formData.city}
                  onChange={handleChange}
                  name="city"
                />
                <FormInput
                  label="State"
                  value={formData.state}
                  onChange={handleChange}
                  name="state"
                  options={[
                    { value: "Karnataka", label: "Karnataka" },
                    { value: "Tamil Nadu", label: "Tamil Nadu" },
                    { value: "Maharashtra", label: "Maharashtra" },
                  ]}
                />
                <FormInput
                  label="PIN Code"
                  value={formData.pincode}
                  onChange={handleChange}
                  name="pincode"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  name="latitude"
                />
                <FormInput
                  label="Longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  name="longitude"
                />
              </div>
            </div>
          </FormSection>
        )}

        {/* Factory Details Tab */}
        {activeTab === "factory" && (
          <FormSection
            title="Factory & Production Details"
            description="Please fill in or update factory operational details"
            icon="🏭"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Industry Type"
                value={formData.industryType}
                onChange={handleChange}
                name="industryType"
                options={[
                  { value: "textile", label: "Textile Manufacturing" },
                  { value: "food", label: "Food & Beverage" },
                  { value: "chemical", label: "Chemical Manufacturing" },
                  { value: "electronics", label: "Electronics" },
                  { value: "manufacturing", label: "Manufacturing" },
                  { value: "others", label: "Others" },
                ]}
                required
              />
              <FormInput
                label="Product Category"
                value={formData.productCategory}
                onChange={handleChange}
                name="productCategory"
                options={[
                  { value: "machinery", label: "Machinery & Components" },
                  { value: "apparel", label: "Apparel & Clothing" },
                  { value: "chemicals", label: "Chemicals" },
                  { value: "plastics", label: "Plastics & Polymers" },
                ]}
              />
              <FormInput
                label="Product Description"
                value={formData.productDescription}
                onChange={handleChange}
                name="productDescription"
                multiline
              />
              <FormInput
                label="Estimated Workers"
                type="number"
                value={formData.estimatedWorkers}
                onChange={handleChange}
                name="estimatedWorkers"
              />
              <FormInput
                label="Number of Machines"
                type="number"
                value={formData.machineCount}
                onChange={handleChange}
                name="machineCount"
              />
              <FormInput
                label="Production Capacity (units/month)"
                type="number"
                value={formData.productionCapacity}
                onChange={handleChange}
                name="productionCapacity"
              />
            </div>
          </FormSection>
        )}

        {/* Manufacturing Tab */}
        {activeTab === "manufacturing" && (
          <FormSection
            title="Manufacturing & Materials Information"
            description="Details about manufacturing processes"
            icon="⚙️"
          >
            <div className="space-y-6">
              <FormInput
                label="Manufacturing Process"
                value={formData.manufacturingProcess}
                onChange={handleChange}
                name="manufacturingProcess"
                multiline
              />
              <FormInput
                label="Raw Materials Used"
                value={formData.rawMaterials}
                onChange={handleChange}
                name="rawMaterials"
                multiline
              />
              <FormInput
                label="Hazardous Substances (if any)"
                value={formData.hazardousSubstances}
                onChange={handleChange}
                name="hazardousSubstances"
                multiline
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Power Consumption (KW)"
                  type="number"
                  value={formData.powerConsumption}
                  onChange={handleChange}
                  name="powerConsumption"
                />
              </div>
            </div>
          </FormSection>
        )}

        {/* Compliance Tab */}
        {activeTab === "compliance" && (
          <FormSection
            title="Compliance & Certifications"
            description="Safety and regulatory compliance details"
            icon="✅"
          >
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 bg-green-50 p-4 rounded-lg border border-green-200">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-green-800">
                  <strong>Extracted from documents:</strong> Your uploaded documents show all required certifications are available.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Pollution Board Clearance"
                value={formData.pollutionBoard}
                onChange={handleChange}
                name="pollutionBoard"
                options={[
                  { value: "yes", label: "Yes - Certificate Available" },
                  { value: "applied", label: "Applied - Pending" },
                  { value: "no", label: "Not Required" },
                ]}
              />
              <FormInput
                label="Fire Safety Certificate"
                value={formData.fireSafety}
                onChange={handleChange}
                name="fireSafety"
                options={[
                  { value: "yes", label: "Yes - Certificate Available" },
                  { value: "applied", label: "Applied - Pending" },
                  { value: "no", label: "Not Required" },
                ]}
              />
              <FormInput
                label="Electrical Safety Certificate"
                value={formData.electricalSafety}
                onChange={handleChange}
                name="electricalSafety"
                options={[
                  { value: "yes", label: "Yes - Certificate Available" },
                  { value: "applied", label: "Applied - Pending" },
                  { value: "no", label: "Not Required" },
                ]}
              />
              <FormInput
                label="Building Plan Approval"
                value={formData.buildingPlan}
                onChange={handleChange}
                name="buildingPlan"
                options={[
                  { value: "yes", label: "Yes - Approved" },
                  { value: "applied", label: "Applied - Pending" },
                  { value: "no", label: "Not Applicable" },
                ]}
              />
            </div>
          </FormSection>
        )}
      </Tabs>

      {/* Amount Display */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-2 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700 font-semibold">Registration Fee</p>
            <p className="text-sm text-gray-600">Factory Registration + Processing</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-900">₹ {formData.totalAmount}</p>
            <p className="text-xs text-gray-600 mt-1">Inclusive of all taxes</p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-lg hover:shadow-lg hover:scale-105 transition transform flex items-center justify-center gap-2"
      >
        <CheckCircle2 size={22} />
        Proceed to Payment
      </button>
    </form>
  );
}
