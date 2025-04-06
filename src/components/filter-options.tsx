"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Info } from "lucide-react"

interface FilterOptionsProps {
  viewMode: "grid" | "compare"
  onViewModeChange: (mode: "grid" | "compare") => void
  onFilterChange: (filters: FilterOptions) => void
  onSizeGuideOpen: () => void
}

export interface FilterOptions {
  roadPlacement: boolean
  heavyWaste: boolean
}

export default function FilterOptions({
  viewMode,
  onViewModeChange,
  onFilterChange,
  onSizeGuideOpen,
}: FilterOptionsProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    roadPlacement: false,
    heavyWaste: false,
  })

  const handleFilterChange = (filterName: keyof FilterOptions) => {
    const newFilters = {
      ...filters,
      [filterName]: !filters[filterName],
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="flex flex-wrap justify-between items-center mb-8">
      <div className="flex space-x-2 mb-4 md:mb-0">
        <button
          onClick={() => onViewModeChange("grid")}
          className={cn(
            "flex items-center justify-center p-2 rounded-md",
            viewMode === "grid" ? "bg-blue-500 text-white" : "bg-[#171c2c] text-gray-400",
          )}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 3H3V10H10V3Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 3H14V10H21V3Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 14H14V21H21V14Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 14H3V21H10V14Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={() => onViewModeChange("compare")}
          className={cn(
            "flex items-center justify-center p-2 rounded-md",
            viewMode === "compare" ? "bg-blue-500 text-white" : "bg-[#171c2c] text-gray-400",
          )}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="ml-2">Compare</span>
        </button>
      </div>
      <div className="flex space-x-2">
        <button className="flex items-center bg-[#171c2c] text-white px-3 py-2 rounded-md" onClick={onSizeGuideOpen}>
          <Info size={18} className="mr-2" />
          Size Guide
        </button>
        <button
          className={cn(
            "flex items-center px-3 py-2 rounded-md",
            filters.roadPlacement ? "bg-blue-500 text-white" : "bg-[#171c2c] text-white",
          )}
          onClick={() => handleFilterChange("roadPlacement")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M19 21V5C19 4.46957 18.7893 3.96086 18.4142 3.58579C18.0391 3.21071 17.5304 3 17 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Road Placement
        </button>
        <button
          className={cn(
            "flex items-center px-3 py-2 rounded-md",
            filters.heavyWaste ? "bg-blue-500 text-white" : "bg-[#171c2c] text-white",
          )}
          onClick={() => handleFilterChange("heavyWaste")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Heavy Waste
        </button>
      </div>
    </div>
  )
}

