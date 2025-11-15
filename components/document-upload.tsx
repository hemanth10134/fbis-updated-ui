"use client";

import React, { useState } from "react";
import { Upload, File, CheckCircle2, X, AlertCircle } from "lucide-react";

interface DocumentUploadProps {
  onDocumentsUpload: (documents: FileData[]) => void;
  onProceed: () => void;
}

interface FileData {
  name: string;
  file: File;
  size: string;
  uploaded: boolean;
}

const REQUIRED_DOCUMENTS = [
  {
    id: "gst",
    name: "GST Certificate",
    description: "Valid GST registration certificate (PDF/JPG)",
    required: true,
  },
  {
    id: "pan",
    name: "PAN Card",
    description: "Owner's PAN card (PDF/JPG)",
    required: true,
  },
  {
    id: "address",
    name: "Address Proof",
    description: "Factory address proof - Utility bill or lease (PDF/JPG)",
    required: true,
  },
  {
    id: "ownership",
    name: "Ownership Document",
    description: "Property deed or lease agreement (PDF)",
    required: true,
  },
  {
    id: "industrial",
    name: "Industrial License",
    description: "State industrial license (if applicable)",
    required: false,
  },
  {
    id: "environmental",
    name: "Environmental Clearance",
    description: "Environmental clearance from pollution board",
    required: false,
  },
];

export default function DocumentUpload({
  onDocumentsUpload,
  onProceed,
}: DocumentUploadProps) {
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, FileData>>({});
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileSelect = (docId: string, file: File | null) => {
    if (!file) return;

    const validTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [docId]: "Only PDF, JPG, or PNG files allowed",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [docId]: "File size must be less than 5MB",
      }));
      return;
    }

    setUploadedDocs((prev) => ({
      ...prev,
      [docId]: {
        name: file.name,
        file: file,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        uploaded: true,
      },
    }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[docId];
      return newErrors;
    });
  };

  const handleDragOver = (e: React.DragEvent, docId: string) => {
    e.preventDefault();
    setDragOver(docId);
  };

  const handleDrop = (e: React.DragEvent, docId: string) => {
    e.preventDefault();
    setDragOver(null);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(docId, file);
  };

  const removeFile = (docId: string) => {
    setUploadedDocs((prev) => {
      const newDocs = { ...prev };
      delete newDocs[docId];
      return newDocs;
    });
  };

  const requiredDocsUploaded = REQUIRED_DOCUMENTS.filter(
    (doc) => doc.required
  ).every((doc) => uploadedDocs[doc.id]?.uploaded);

  const handleProceed = () => {
    if (requiredDocsUploaded) {
      const documentsList = Object.values(uploadedDocs);
      onDocumentsUpload(documentsList);
      onProceed();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-l-4 border-blue-600">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">
          📄 Upload Required Documents
        </h2>
        <p className="text-gray-700">
          Please upload the necessary documents for factory registration. We will extract information
          and pre-fill your application form for faster processing.
        </p>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REQUIRED_DOCUMENTS.map((doc) => (
          <div
            key={doc.id}
            className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:bg-blue-50 transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  {doc.name}
                  {doc.required && <span className="text-red-500 font-bold">*</span>}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
              </div>
            </div>

            {!uploadedDocs[doc.id]?.uploaded ? (
              <div
                onDragOver={(e) => handleDragOver(e, doc.id)}
                onDragLeave={() => setDragOver(null)}
                onDrop={(e) => handleDrop(e, doc.id)}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
                  dragOver === doc.id
                    ? "border-blue-500 bg-blue-100"
                    : "border-gray-300 hover:border-blue-400"
                }`}
              >
                <Upload className="mx-auto text-gray-400 mb-3" size={32} />
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Drag & drop your file here
                </p>
                <p className="text-xs text-gray-500 mb-4">or</p>
                <label className="inline-block">
                  <input
                    type="file"
                    onChange={(e) => handleFileSelect(doc.id, e.target.files?.[0] || null)}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                  <span className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 inline-block text-sm font-medium">
                    Browse Files
                  </span>
                </label>
                <p className="text-xs text-gray-500 mt-4">
                  Max size: 5MB | Formats: PDF, JPG, PNG
                </p>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-green-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {uploadedDocs[doc.id].name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {uploadedDocs[doc.id].size}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(doc.id)}
                    className="text-red-600 hover:text-red-700 p-1"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            )}

            {errors[doc.id] && (
              <div className="flex items-center gap-2 mt-3 text-red-600 text-sm">
                <AlertCircle size={16} />
                {errors[doc.id]}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Upload Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {Object.values(uploadedDocs).length}
            </p>
            <p className="text-sm text-gray-600">Documents Uploaded</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {REQUIRED_DOCUMENTS.filter((doc) => doc.required).length}
            </p>
            <p className="text-sm text-gray-600">Required</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {REQUIRED_DOCUMENTS.filter((doc) => doc.required && uploadedDocs[doc.id]?.uploaded).length}
            </p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              {REQUIRED_DOCUMENTS.filter(
                (doc) => doc.required && !uploadedDocs[doc.id]?.uploaded
              ).length}
            </p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
        </div>
      </div>

      {/* Proceed Button */}
      <div className="flex flex-col gap-4">
        {!requiredDocsUploaded && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-amber-900">Missing Required Documents</p>
              <p className="text-sm text-amber-800 mt-1">
                Please upload all required documents (marked with *) before proceeding.
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleProceed}
          disabled={!requiredDocsUploaded}
          className={`w-full py-4 font-bold text-lg rounded-lg transition flex items-center justify-center gap-2 ${
            requiredDocsUploaded
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <CheckCircle2 size={22} />
          {requiredDocsUploaded
            ? "Proceed to Auto-Fill Form"
            : "Upload Required Documents First"}
        </button>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-3">💡 How This Works</h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>✓ Upload your documents (we accept PDF, JPG, PNG)</li>
          <li>✓ Our system will automatically extract information</li>
          <li>✓ Your application form will be pre-filled with extracted data</li>
          <li>✓ Review and update any information if needed</li>
          <li>✓ Submit your application for processing</li>
        </ul>
      </div>
    </div>
  );
}
