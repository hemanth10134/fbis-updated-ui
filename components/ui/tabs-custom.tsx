"use client";

import React from "react";

interface TabsProps {
  tabs: { id: string; label: string; badge?: number }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  children: React.ReactNode;
}

export default function Tabs({
  tabs,
  activeTab,
  onTabChange,
  children,
}: TabsProps) {
  return (
    <div>
      <div className="flex border-b-2 border-gray-200 gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-6 py-3 font-semibold whitespace-nowrap transition-all relative ${
              activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {tab.label}
            {tab.badge && (
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}
