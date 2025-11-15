"use client";

import React from "react";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  helper?: string;
  options?: { value: string; label: string }[];
  multiline?: boolean;
  rows?: number;
  name?: string;
}

export default function FormInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  helper,
  options,
  multiline = false,
  rows = 4,
}: FormInputProps) {
  const baseClasses =
    "w-full px-4 py-3 border-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500";
  const errorClasses = error ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-blue-300";
  const disabledClasses = disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : "bg-white";

  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {multiline ? (
        <textarea
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`${baseClasses} ${errorClasses} ${disabledClasses} resize-none`}
        />
      ) : options ? (
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`${baseClasses} ${errorClasses} ${disabledClasses}`}
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`${baseClasses} ${errorClasses} ${disabledClasses}`}
        />
      )}

      {error && (
        <div className="flex items-center gap-1 mt-2 text-red-600 text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {helper && !error && (
        <p className="text-xs text-gray-500 mt-2">{helper}</p>
      )}
    </div>
  );
}
