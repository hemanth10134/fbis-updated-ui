import React from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function FormSection({
  title,
  description,
  children,
  icon,
}: FormSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        {icon && <div className="text-2xl">{icon}</div>}
        <div>
          <h3 className="text-lg font-bold text-blue-900">{title}</h3>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
      </div>
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        {children}
      </div>
    </div>
  );
}
