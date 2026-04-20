"use client";

import { useState } from "react";
import { CameraType, Condition } from "@/types";
import { cn } from "@/lib/utils";

interface FilterSidebarProps {
  types: CameraType[];
  conditions: Condition[];
  selectedTypes: CameraType[];
  selectedConditions: Condition[];
  onToggleType: (type: CameraType) => void;
  onToggleCondition: (cond: Condition) => void;
  className?: string;
}

export default function FilterSidebar({
  types,
  conditions,
  selectedTypes,
  selectedConditions,
  onToggleType,
  onToggleCondition,
  className,
}: FilterSidebarProps) {
  return (
    <div className={cn("bg-surface/50 p-6 rounded-2xl border border-surface", className)}>
      <h3 className="font-heading font-bold text-xl mb-6">Filters</h3>
      
      <div className="mb-8">
        <h4 className="font-medium text-text mb-4">Camera Type</h4>
        <div className="space-y-3">
          {types.map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group">
              <div
                className={cn(
                  "w-5 h-5 rounded flex items-center justify-center border transition-colors",
                  selectedTypes.includes(type)
                    ? "bg-primary border-primary"
                    : "border-muted group-hover:border-primary/50 bg-background"
                )}
              >
                {selectedTypes.includes(type) && (
                  <svg className="w-3.5 h-3.5 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={cn("text-sm", selectedTypes.includes(type) ? "text-text" : "text-muted")}>
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-text mb-4">Condition</h4>
        <div className="space-y-3">
          {conditions.map((cond) => (
            <label key={cond} className="flex items-center gap-3 cursor-pointer group">
              <div
                className={cn(
                  "w-5 h-5 rounded flex items-center justify-center border transition-colors",
                  selectedConditions.includes(cond)
                    ? "bg-primary border-primary"
                    : "border-muted group-hover:border-primary/50 bg-background"
                )}
              >
                {selectedConditions.includes(cond) && (
                  <svg className="w-3.5 h-3.5 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={cn("text-sm", selectedConditions.includes(cond) ? "text-text" : "text-muted")}>
                {cond}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
