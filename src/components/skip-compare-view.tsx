"use client"

import { X, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Skip {
  id: number
  size: number
  hire_period_days: number
  transport_cost: number | null
  per_tonne_cost: number | null
  price_before_vat: number | null
  vat: number
  postcode: string
  area: string | null
  forbidden: boolean
  created_at: string
  updated_at: string
  allowed_on_road: boolean
  allows_heavy_waste: boolean
}

interface SkipCompareViewProps {
  skips: Skip[]
  selectedSkipId: number | null
  onSelectSkip: (skipId: number) => void
}

export default function SkipCompareView({ skips, selectedSkipId, onSelectSkip }: SkipCompareViewProps) {
  // Helper function to get skip size category
  const getSizeCategory = (size: number) => {
    if (size <= 6) return "Small"
    if (size <= 10) return "Medium"
    if (size <= 16) return "Large"
    return "Extra Large"
  }

  // Helper function to get suitable for text
  const getSuitableFor = (size: number) => {
    if (size <= 6) return "Small garden projects"
    if (size <= 10) return "Medium renovation projects"
    if (size <= 16) return "Large construction projects"
    return "Commercial & industrial projects"
  }

  // Helper function to calculate total price
  const calculateTotalPrice = (skip: Skip) => {
    if (skip.price_before_vat) {
      return skip.price_before_vat * (1 + skip.vat / 100)
    } else if (skip.transport_cost && skip.size < 20) {
      return skip.transport_cost * (1 + skip.vat / 100)
    }
    return null
  }

  return (
    <div className="overflow-x-auto mb-20">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#171c2c]">
            <th className="text-left p-4 text-white font-semibold">Skip Size</th>
            <th className="text-left p-4 text-white font-semibold">Capacity</th>
            <th className="text-left p-4 text-white font-semibold">Suitable For</th>
            <th className="text-left p-4 text-white font-semibold">Road Placement</th>
            <th className="text-left p-4 text-white font-semibold">Heavy Waste</th>
            <th className="text-left p-4 text-white font-semibold">Hire Period</th>
            <th className="text-left p-4 text-white font-semibold">Price</th>
            <th className="text-left p-4 text-white font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {skips.map((skip) => {
            const totalPrice = calculateTotalPrice(skip)

            return (
              <tr
                key={skip.id}
                className={cn(
                  "border-b border-gray-800 hover:bg-[#1a2234] transition-colors",
                  selectedSkipId === skip.id ? "bg-[#1a2234]" : "",
                )}
              >
                <td className="p-4">
                  <div className="flex items-center">
                    <div className="bg-[#e59029] text-white font-bold p-2 mr-3 flex items-center justify-center rounded-sm">
                      {skip.size} YD
                    </div>
                    <span className="text-white">
                      {skip.size} Yard ({getSizeCategory(skip.size)})
                    </span>
                  </div>
                </td>
                <td className="p-4 text-white">~{skip.size * 10} black bags</td>
                <td className="p-4 text-white">{getSuitableFor(skip.size)}</td>
                <td className="p-4">
                  {skip.allowed_on_road ? (
                    <span className="text-green-500 flex items-center">
                      <Check size={16} className="mr-1" /> Yes
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center">
                      <X size={16} className="mr-1" /> No
                    </span>
                  )}
                </td>
                <td className="p-4">
                  {skip.allows_heavy_waste ? (
                    <span className="text-green-500 flex items-center">
                      <Check size={16} className="mr-1" /> Yes
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center">
                      <X size={16} className="mr-1" /> No
                    </span>
                  )}
                </td>
                <td className="p-4 text-white">{skip.hire_period_days} days</td>
                <td className="p-4">
                  {totalPrice ? (
                    <span className="text-blue-500 font-bold">
                      £{totalPrice.toFixed(2)}
                      <span className="text-gray-400 text-sm font-normal ml-1">per week</span>
                    </span>
                  ) : (
                    <span className="text-blue-500 font-bold">Price on request</span>
                  )}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => onSelectSkip(skip.id)}
                    className={cn(
                      "px-4 py-2 rounded-md",
                      selectedSkipId === skip.id
                        ? "bg-blue-500 text-white"
                        : "bg-[#1e2538] text-white hover:bg-[#2a3349]",
                    )}
                  >
                    {selectedSkipId === skip.id ? "Selected" : "Select"}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

