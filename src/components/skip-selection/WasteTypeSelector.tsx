"use client"

import { cn } from "@/lib/utils"
import { X } from "lucide-react"

type WasteTypeId = "garden" | "home" | "construction" | "commercial"

interface WasteTypeSelectorProps {
  selectedType: WasteTypeId | null
  onSelect: (typeId: WasteTypeId | null) => void
}

export  function WasteTypeSelector({ selectedType, onSelect }: WasteTypeSelectorProps) {
  // Waste type options with icons and descriptions
  const wasteTypes = [
    {
      id: "garden" as WasteTypeId,
      name: "Garden Waste",
      description: "Soil, plants, grass, small branches",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "home" as WasteTypeId,
      name: "Home Renovation",
      description: "Furniture, appliances, general waste",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 22V12H15V22"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "construction" as WasteTypeId,
      name: "Construction",
      description: "Bricks, concrete, tiles, wood",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 3.5H21V20.5H3V3.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M3 8.5H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 13.5H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 3.5V20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 3.5V20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "commercial" as WasteTypeId,
      name: "Commercial",
      description: "Large-scale projects, industrial waste",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 3H21V21H3V3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 15H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 3V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 3V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ]

  return (
    <div className="mb-6 relative">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-white">What type of waste do you have?</h2>
        {selectedType && (
          <button
            onClick={() => onSelect(null)}
            className="flex items-center text-blue-500 hover:text-blue-400 text-sm"
          >
            <X size={16} className="mr-1" />
            Clear Selection
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {wasteTypes.map((type) => (
          <div
            key={type.id}
            className={cn(
              "bg-[#0f1117] rounded-lg p-3 cursor-pointer transition-all",
              selectedType === type.id ? "border border-blue-500" : "border border-gray-800 hover:border-gray-700",
            )}
            onClick={() => onSelect(type.id)}
          >
            <div className="flex items-center mb-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  selectedType === type.id ? "bg-blue-500 text-white" : "bg-[#171c2c] text-white",
                )}
              >
                {type.icon}
              </div>
              <h3 className="ml-3 font-medium text-white text-base">{type.name}</h3>
            </div>
            <p className="text-gray-400 text-sm">{type.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

