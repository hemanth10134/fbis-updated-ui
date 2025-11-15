"use client";

import { useState } from "react";
import { Building2, MapPin, FileText, DollarSign, CheckCircle2 } from "lucide-react";
import FormInput from "@/components/ui/form-input";
import FormSection from "@/components/ui/form-section";
import Tabs from "@/components/ui/tabs-custom";

interface FactoryFormProps {
  onNext?: (data: any) => void;
}

export default function FactoryRegistrationForm({ onNext }: FactoryFormProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    // Basic Information
    factoryName: "",
    registrationNumber: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",

    // Address Information
    factoryAddress: "",
    city: "",
    state: "Karnataka",
    pincode: "",
    latitude: "",
    longitude: "",

    // Factory Details
    industryType: "",
    productCategory: "",
    productDescription: "",
    estimatedWorkers: "",
    machineCount: "",

    // Manufacturing Details
    manufacturingProcess: "",
    rawMaterials: "",
    hazardousSubstances: "",
    powerConsumption: "",
    productionCapacity: "",

    // Compliance Details
    pollutionBoard: "",
    fireSafety: "",
    electricalSafety: "",
    buildingPlan: "",

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
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.factoryName.trim())
      newErrors.factoryName = "Factory name is required";
    if (!formData.registrationNumber.trim())
      newErrors.registrationNumber = "Registration number is required";
    if (!formData.ownerName.trim())
      newErrors.ownerName = "Owner name is required";
    if (!formData.ownerEmail.trim())
      newErrors.ownerEmail = "Email is required";
    if (!formData.factoryAddress.trim())
      newErrors.factoryAddress = "Factory address is required";
    if (!formData.industryType)
      newErrors.industryType = "Industry type is required";
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
            description="Enter the basic details of your factory"
            icon="📋"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Factory Name"
                placeholder="e.g., ABC Manufacturing Ltd"
                value={formData.factoryName}
                onChange={handleChange}
                name="factoryName"
                error={errors.factoryName}
                required
              />
              <FormInput
                label="Registration Number"
                placeholder="e.g., KA/2024/001234"
                value={formData.registrationNumber}
                onChange={handleChange}
                name="registrationNumber"
                error={errors.registrationNumber}
                required
              />
              <FormInput
                label="Owner Name"
                placeholder="Full name of factory owner"
                value={formData.ownerName}
                onChange={handleChange}
                name="ownerName"
                error={errors.ownerName}
                required
              />
              <FormInput
                label="Owner Email"
                type="email"
                placeholder="owner@email.com"
                value={formData.ownerEmail}
                onChange={handleChange}
                name="ownerEmail"
                error={errors.ownerEmail}
                required
              />
              <FormInput
                label="Owner Phone"
                type="tel"
                placeholder="+91 9876543210"
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
            description="Provide complete location details"
            icon="📍"
          >
            <div className="space-y-6">
              <FormInput
                label="Factory Address"
                placeholder="Street address, building number, etc."
                value={formData.factoryAddress}
                onChange={handleChange}
                name="factoryAddress"
                error={errors.factoryAddress}
                multiline
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormInput
                  label="City"
                  placeholder="e.g., Bangalore"
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
                  placeholder="e.g., 560001"
                  value={formData.pincode}
                  onChange={handleChange}
                  name="pincode"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Latitude"
                  placeholder="e.g., 12.9716"
                  value={formData.latitude}
                  onChange={handleChange}
                  name="latitude"
                  helper="Optional: For mapping purposes"
                />
                <FormInput
                  label="Longitude"
                  placeholder="e.g., 77.5946"
                  value={formData.longitude}
                  onChange={handleChange}
                  name="longitude"
                  helper="Optional: For mapping purposes"
                />
              </div>
            </div>
          </FormSection>
        )}

        {/* Factory Details Tab */}
        {activeTab === "factory" && (
          <FormSection
            title="Factory & Production Details"
            description="Information about factory operations"
            icon="🏭"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Industry Type"
                value={formData.industryType}
                onChange={handleChange}
                name="industryType"
                error={errors.industryType}
                options={[
                  { value: "textile", label: "Textile Manufacturing" },
                  { value: "food", label: "Food & Beverage" },
                  { value: "chemical", label: "Chemical Manufacturing" },
                  { value: "electronics", label: "Electronics" },
                  { value: "automotive", label: "Automotive" },
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
                  { value: "apparel", label: "Apparel & Clothing" },
                  { value: "machinery", label: "Machinery & Parts" },
                  { value: "chemicals", label: "Chemicals" },
                  { value: "plastics", label: "Plastics & Polymers" },
                ]}
              />
              <FormInput
                label="Product Description"
                placeholder="Describe main products manufactured"
                value={formData.productDescription}
                onChange={handleChange}
                name="productDescription"
                multiline
              />
              <FormInput
                label="Estimated Workers"
                type="number"
                placeholder="e.g., 150"
                value={formData.estimatedWorkers}
                onChange={handleChange}
                name="estimatedWorkers"
              />
              <FormInput
                label="Number of Machines"
                type="number"
                placeholder="e.g., 25"
                value={formData.machineCount}
                onChange={handleChange}
                name="machineCount"
              />
              <FormInput
                label="Production Capacity (units/month)"
                type="number"
                placeholder="e.g., 5000"
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
            description="Details about manufacturing processes and materials"
            icon="⚙️"
          >
            <div className="space-y-6">
              <FormInput
                label="Manufacturing Process"
                placeholder="Describe the primary manufacturing process"
                value={formData.manufacturingProcess}
                onChange={handleChange}
                name="manufacturingProcess"
                multiline
              />
              <FormInput
                label="Raw Materials Used"
                placeholder="List main raw materials (comma separated)"
                value={formData.rawMaterials}
                onChange={handleChange}
                name="rawMaterials"
                multiline
              />
              <FormInput
                label="Hazardous Substances (if any)"
                placeholder="List any hazardous materials handled"
                value={formData.hazardousSubstances}
                onChange={handleChange}
                name="hazardousSubstances"
                multiline
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Power Consumption (KW)"
                  type="number"
                  placeholder="e.g., 500"
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
