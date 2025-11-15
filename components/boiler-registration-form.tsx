"use client";

import { useState } from "react";
import { Flame, MapPin, CheckCircle2 } from "lucide-react";
import FormInput from "@/components/ui/form-input";
import FormSection from "@/components/ui/form-section";
import Tabs from "@/components/ui/tabs-custom";

interface BoilerFormProps {
  onNext?: (data: any) => void;
}

export default function BoilerRegistrationForm({ onNext }: BoilerFormProps) {
  const [activeTab, setActiveTab] = useState("basic");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    // Basic Information
    boilerType: "",
    manufacturerName: "",
    manufacturerAddress: "",
    modelNumber: "",
    serialNumber: "",

    // Boiler Specifications
    workingPressure: "",
    designPressure: "",
    steamCapacity: "",
    heatingArea: "",
    fuelType: "",
    boilerAge: "",

    // Installation Details
    installationAddress: "",
    installationCity: "",
    installationState: "Karnataka",
    installationPincode: "",

    // User Information
    userType: "factory",
    userName: "",
    userEmail: "",
    userPhone: "",
    userAddress: "",

    // Safety Details
    safetyValves: "",
    pressureGauge: "",
    waterGaugeGlass: "",
    feedWaterPlant: "",
    lastInspection: "",

    // Amount
    totalAmount: "18000",
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
    if (!formData.boilerType.trim())
      newErrors.boilerType = "Boiler type is required";
    if (!formData.manufacturerName.trim())
      newErrors.manufacturerName = "Manufacturer name is required";
    if (!formData.installationAddress.trim())
      newErrors.installationAddress = "Installation address is required";
    if (!formData.userName.trim())
      newErrors.userName = "User name is required";
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
          { id: "specs", label: "⚙️ Specifications" },
          { id: "installation", label: "📍 Installation" },
          { id: "user", label: "👤 User Details" },
          { id: "safety", label: "🛡️ Safety" },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {/* Basic Information Tab */}
        {activeTab === "basic" && (
          <FormSection
            title="Boiler Basic Information"
            description="Enter boiler manufacturer and identification details"
            icon="🔥"
          >
            <div className="space-y-6">
              <FormInput
                label="Boiler Type"
                value={formData.boilerType}
                onChange={handleChange}
                name="boilerType"
                error={errors.boilerType}
                options={[
                  { value: "fire-tube", label: "Fire Tube Boiler" },
                  { value: "water-tube", label: "Water Tube Boiler" },
                  { value: "packaged", label: "Packaged Boiler" },
                  { value: "coil", label: "Coil Boiler" },
                  { value: "fluidized", label: "Fluidized Bed" },
                ]}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Manufacturer Name"
                  placeholder="e.g., XYZ Boiler Manufacturing Co."
                  value={formData.manufacturerName}
                  onChange={handleChange}
                  name="manufacturerName"
                  error={errors.manufacturerName}
                  required
                />
                <FormInput
                  label="Manufacturer Address"
                  placeholder="Complete address"
                  value={formData.manufacturerAddress}
                  onChange={handleChange}
                  name="manufacturerAddress"
                />
                <FormInput
                  label="Model Number"
                  placeholder="e.g., BM-2500-SS"
                  value={formData.modelNumber}
                  onChange={handleChange}
                  name="modelNumber"
                />
                <FormInput
                  label="Serial Number"
                  placeholder="Unique serial number"
                  value={formData.serialNumber}
                  onChange={handleChange}
                  name="serialNumber"
                />
              </div>
            </div>
          </FormSection>
        )}

        {/* Specifications Tab */}
        {activeTab === "specs" && (
          <FormSection
            title="Boiler Specifications"
            description="Technical specifications and operating parameters"
            icon="⚙️"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Working Pressure (bar)"
                  type="number"
                  placeholder="e.g., 10"
                  value={formData.workingPressure}
                  onChange={handleChange}
                  name="workingPressure"
                  helper="Current operating pressure"
                />
                <FormInput
                  label="Design Pressure (bar)"
                  type="number"
                  placeholder="e.g., 12"
                  value={formData.designPressure}
                  onChange={handleChange}
                  name="designPressure"
                  helper="Maximum rated pressure"
                />
                <FormInput
                  label="Steam Capacity (kg/hr)"
                  type="number"
                  placeholder="e.g., 5000"
                  value={formData.steamCapacity}
                  onChange={handleChange}
                  name="steamCapacity"
                />
                <FormInput
                  label="Heating Area (m²)"
                  type="number"
                  placeholder="e.g., 100"
                  value={formData.heatingArea}
                  onChange={handleChange}
                  name="heatingArea"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Fuel Type"
                  value={formData.fuelType}
                  onChange={handleChange}
                  name="fuelType"
                  options={[
                    { value: "coal", label: "Coal" },
                    { value: "gas", label: "Natural Gas" },
                    { value: "oil", label: "Fuel Oil" },
                    { value: "biomass", label: "Biomass" },
                    { value: "electric", label: "Electric" },
                  ]}
                />
                <FormInput
                  label="Boiler Age (years)"
                  type="number"
                  placeholder="e.g., 5"
                  value={formData.boilerAge}
                  onChange={handleChange}
                  name="boilerAge"
                />
              </div>
            </div>
          </FormSection>
        )}

        {/* Installation Tab */}
        {activeTab === "installation" && (
          <FormSection
            title="Installation Location"
            description="Where the boiler is installed"
            icon="📍"
          >
            <div className="space-y-6">
              <FormInput
                label="Installation Address"
                placeholder="Complete installation address"
                value={formData.installationAddress}
                onChange={handleChange}
                name="installationAddress"
                error={errors.installationAddress}
                multiline
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormInput
                  label="City"
                  placeholder="e.g., Bangalore"
                  value={formData.installationCity}
                  onChange={handleChange}
                  name="installationCity"
                />
                <FormInput
                  label="State"
                  value={formData.installationState}
                  onChange={handleChange}
                  name="installationState"
                  options={[
                    { value: "Karnataka", label: "Karnataka" },
                    { value: "Tamil Nadu", label: "Tamil Nadu" },
                    { value: "Maharashtra", label: "Maharashtra" },
                  ]}
                />
                <FormInput
                  label="PIN Code"
                  placeholder="e.g., 560001"
                  value={formData.installationPincode}
                  onChange={handleChange}
                  name="installationPincode"
                />
              </div>
            </div>
          </FormSection>
        )}

        {/* User Details Tab */}
        {activeTab === "user" && (
          <FormSection
            title="Boiler User/Owner Information"
            description="Details of the organization/person using the boiler"
            icon="👤"
          >
            <div className="space-y-6">
              <FormInput
                label="User Type"
                value={formData.userType}
                onChange={handleChange}
                name="userType"
                options={[
                  { value: "factory", label: "Factory/Manufacturing" },
                  { value: "hospital", label: "Hospital/Healthcare" },
                  { value: "hotel", label: "Hotel/Hospitality" },
                  { value: "institution", label: "Educational Institution" },
                  { value: "other", label: "Other" },
                ]}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="User Name"
                  placeholder="Organization or owner name"
                  value={formData.userName}
                  onChange={handleChange}
                  name="userName"
                  error={errors.userName}
                  required
                />
                <FormInput
                  label="Email Address"
                  type="email"
                  placeholder="user@email.com"
                  value={formData.userEmail}
                  onChange={handleChange}
                  name="userEmail"
                />
                <FormInput
                  label="Phone Number"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.userPhone}
                  onChange={handleChange}
                  name="userPhone"
                />
              </div>
              <FormInput
                label="User Address"
                placeholder="Complete address"
                value={formData.userAddress}
                onChange={handleChange}
                name="userAddress"
                multiline
              />
            </div>
          </FormSection>
        )}

        {/* Safety Tab */}
        {activeTab === "safety" && (
          <FormSection
            title="Safety Equipment & Inspection"
            description="Safety devices and last inspection details"
            icon="🛡️"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Safety Valves Installed"
                  value={formData.safetyValves}
                  onChange={handleChange}
                  name="safetyValves"
                  options={[
                    { value: "yes", label: "Yes - Number: 2 or more" },
                    { value: "single", label: "Single Safety Valve" },
                    { value: "no", label: "No" },
                  ]}
                />
                <FormInput
                  label="Pressure Gauge"
                  value={formData.pressureGauge}
                  onChange={handleChange}
                  name="pressureGauge"
                  options={[
                    { value: "yes-dual", label: "Yes - Dual (main + auxiliary)" },
                    { value: "yes-single", label: "Yes - Single" },
                    { value: "no", label: "No" },
                  ]}
                />
                <FormInput
                  label="Water Gauge Glass"
                  value={formData.waterGaugeGlass}
                  onChange={handleChange}
                  name="waterGaugeGlass"
                  options={[
                    { value: "yes", label: "Yes - Working" },
                    { value: "damaged", label: "Damaged - Replacement Needed" },
                    { value: "no", label: "Not Installed" },
                  ]}
                />
                <FormInput
                  label="Feed Water Plant"
                  value={formData.feedWaterPlant}
                  onChange={handleChange}
                  name="feedWaterPlant"
                  options={[
                    { value: "yes", label: "Yes - Treatment Available" },
                    { value: "partial", label: "Partial Treatment" },
                    { value: "no", label: "No Treatment" },
                  ]}
                />
              </div>
              <FormInput
                label="Last Inspection Date"
                type="date"
                value={formData.lastInspection}
                onChange={handleChange}
                name="lastInspection"
                helper="Date of last annual/hydrostatic test"
              />
            </div>
          </FormSection>
        )}
      </Tabs>

      {/* Amount Display */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg border-2 border-amber-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700 font-semibold">Boiler Registration Fee</p>
            <p className="text-sm text-gray-600">Initial Registration + Inspection Certificate</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-amber-900">₹ {formData.totalAmount}</p>
            <p className="text-xs text-gray-600 mt-1">Inclusive of all taxes</p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-lg rounded-lg hover:shadow-lg hover:scale-105 transition transform flex items-center justify-center gap-2"
      >
        <CheckCircle2 size={22} />
        Proceed to Payment
      </button>
    </form>
  );
}
