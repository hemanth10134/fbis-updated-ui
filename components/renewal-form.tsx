"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface RenewalFormProps {
  onNext: (data: any) => void;
}

export default function RenewalForm({ onNext }: RenewalFormProps) {
  const [formData, setFormData] = useState({
    registrationNumber: "",
    email: "",
    phone: "",
    companyName: "",
    factoryAddress: "",
    productCategory: "",
    amountPayable: "15000",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.registrationNumber.trim())
      newErrors.registrationNumber = "Registration Number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.companyName.trim()) newErrors.companyName = "Company Name is required";
    if (!formData.factoryAddress.trim()) newErrors.factoryAddress = "Factory Address is required";
    if (!formData.productCategory.trim()) newErrors.productCategory = "Product Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Registration Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Registration Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            placeholder="Enter registration number"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.registrationNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.registrationNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.registrationNumber}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.companyName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
          )}
        </div>

        {/* Factory Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Factory Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="factoryAddress"
            value={formData.factoryAddress}
            onChange={handleChange}
            placeholder="Enter factory address"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.factoryAddress ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.factoryAddress && (
            <p className="text-red-500 text-sm mt-1">{errors.factoryAddress}</p>
          )}
        </div>

        {/* Product Category */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Category <span className="text-red-500">*</span>
          </label>
          <select
            name="productCategory"
            value={formData.productCategory}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.productCategory ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a category</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="chemical">Chemical</option>
            <option value="textiles">Textiles</option>
            <option value="food">Food Processing</option>
            <option value="other">Other</option>
          </select>
          {errors.productCategory && (
            <p className="text-red-500 text-sm mt-1">{errors.productCategory}</p>
          )}
        </div>
      </div>

      {/* Amount Payable */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-lg font-semibold text-blue-900">
          Amount Payable: <span className="text-2xl">₹ {formData.amountPayable}</span>
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:scale-105 transition flex items-center justify-center gap-2"
      >
        Proceed to Payment <ChevronRight size={20} />
      </button>
    </form>
  );
}
