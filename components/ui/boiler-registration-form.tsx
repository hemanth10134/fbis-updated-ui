"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function BoilerRegistrationForm({ onNext }: any) {
  const [formData, setFormData] = useState<any>({
    ownerName: "",
    factoryName: "",
    address1: "",
    address2: "",
    district: "",
    taluk: "",
    post: "",
    pincode: "",
    landline: "",
    email: "",
    mobileNo: "",
    boilerRating: "",
    feeAmount: "1200",
    feeInWords: "",
    boilerMakerNo: "",
    typeOfBoiler: "",
    heatingSurface: "",
    boilerPurpose: "",
    nearestRailwayStation: "",
    distanceFromStation: "",
    workOfFactory: "",
    workingSeason: "",
    boilerUsedFor: "",
    relievedBySpare: "Yes",
    feedWaterNature: "",
    fuelUsed: "",
    doc1: null,
    doc2: null,
    doc3: null,
    doc4: null,
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData((p: any) => ({ ...p, [name]: files ? files[0] : value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10 max-w-5xl mx-auto">

      {/* SECTION 1 */}
      <div className="bg-white p-6 rounded-2xl shadow border border-blue-200">
        <h3 className="text-xl font-bold text-blue-900 mb-4">
          1. Full Name of the Owner
        </h3>
        <input
          name="ownerName"
          onChange={handleChange}
          className="w-full p-3 border rounded-lg bg-blue-50"
          placeholder="Owner Name"
        />
      </div>

      {/* SECTION 2 */}
      <div className="bg-white p-6 rounded-2xl shadow border border-blue-200">
        <h3 className="text-xl font-bold text-blue-900 mb-4">
          2. Factory Address Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="factoryName" placeholder="Factory Name" className="input" onChange={handleChange} />
          <input name="post" placeholder="Post" className="input" onChange={handleChange} />
          <input name="address1" placeholder="Address 1" className="input" onChange={handleChange} />
          <input name="pincode" placeholder="Pincode" className="input" onChange={handleChange} />
          <input name="address2" placeholder="Address 2" className="input" onChange={handleChange} />
          <input name="landline" placeholder="Landline" className="input" onChange={handleChange} />
          <input name="district" placeholder="District" className="input" onChange={handleChange} />
          <input name="email" placeholder="Email" className="input" onChange={handleChange} />
          <input name="taluk" placeholder="Taluk" className="input" onChange={handleChange} />
          <input name="mobileNo" placeholder="Mobile Number" className="input" onChange={handleChange} />
        </div>

      </div>

      {/* SECTION 3 */}
      <div className="bg-white p-6 rounded-2xl shadow border border-blue-200">
        <h3 className="text-xl font-bold text-blue-900 mb-4">
          3. Boiler Rating & Fee Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="boilerRating" className="input" onChange={handleChange} placeholder="Boiler Rating" />
          <input name="feeAmount" className="input" value="1200" onChange={handleChange} />
          <input name="feeInWords" className="input" onChange={handleChange} placeholder="Amount in words" />
        </div>
      </div>

      {/* SECTION 4 */}
      <div className="bg-white p-6 rounded-2xl shadow border border-blue-200">
        <h3 className="text-xl font-bold text-blue-900 mb-4">
          4. Boiler Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="boilerMakerNo" placeholder="Boiler Maker Number" className="input" onChange={handleChange} />
          <input name="typeOfBoiler" placeholder="Type of Boiler" className="input" onChange={handleChange} />
          <input name="heatingSurface" placeholder="Heating Surface" className="input" onChange={handleChange} />
          <input name="boilerPurpose" placeholder="Boiler Purpose" className="input" onChange={handleChange} />
          <input name="nearestRailwayStation" placeholder="Nearest Railway Station" className="input" onChange={handleChange} />
          <input name="distanceFromStation" placeholder="Distance from Railway Station (KM)" className="input" onChange={handleChange} />
          <input name="workOfFactory" placeholder="Work of Factory" className="input" onChange={handleChange} />
          <input name="workingSeason" placeholder="Working Season" className="input" onChange={handleChange} />
          <input name="boilerUsedFor" placeholder="Boiler is Used for" className="input" onChange={handleChange} />
          <input name="relievedBySpare" placeholder="Relieved by Spare Boiler" className="input" onChange={handleChange} />
          <input name="feedWaterNature" placeholder="Nature of Feed Water" className="input" onChange={handleChange} />
          <input name="fuelUsed" placeholder="Fuel Used" className="input" onChange={handleChange} />
        </div>
      </div>

      {/* Section 5: File Upload */}
      <div className="bg-white p-6 rounded-2xl shadow border border-blue-200">
        <h3 className="text-xl font-bold text-blue-900 mb-4">
          Mandatory Documents
        </h3>

        <div className="space-y-3">
          <input type="file" name="doc1" onChange={handleChange} />
          <input type="file" name="doc2" onChange={handleChange} />
          <input type="file" name="doc3" onChange={handleChange} />
          <input type="file" name="doc4" onChange={handleChange} />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:scale-105 flex items-center gap-2"
        >
          Proceed <ChevronRight size={20} />
        </button>
      </div>

    </form>
  );
}
