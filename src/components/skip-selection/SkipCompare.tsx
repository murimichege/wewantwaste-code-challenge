"use client"

import { X, Check, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { skipService } from "@/services/skipService"
import type { Skip } from "@/types/skip"

interface SkipCompareProps {
  skips: Skip[]
  selectedSkipId: number | undefined
  onSelectSkip: (skip: Skip) => void
}

export function SkipCompare({ skips, selectedSkipId, onSelectSkip }: SkipCompareProps) {
  // Helper function to get suitable for text based on skip size
  const getSuitableFor = (size: number) => {
    if (size <= 6) return "Small garden projects"
    if (size <= 10) return "Medium renovation projects"
    if (size <= 16) return "Large construction projects"
    return "Commercial & industrial projects"
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
            const totalPrice = skipService.calculateTotalPrice(skip)
            const formattedPrice = totalPrice ? skipService.formatCurrency(totalPrice) : "Price on request"
            const sizeCategory = skipService.getSkipSizeCategory(skip.size)
            const capacity = skipService.estimateCapacity(skip.size)
            const isSelected = skip.id === selectedSkipId

            return (
              <tr
                key={skip.id}
                className={cn(
                  "border-b border-gray-800 hover:bg-[#1a2234] transition-colors",
                  isSelected ? "bg-[#1a2234]" : "",
                )}
              >
                <td className="p-4">
                  <div className="flex items-center">
                    <div className="bg-[#e59029] text-white font-bold p-2 mr-3 flex items-center justify-center rounded-sm">
                      {skip.size} YD
                    </div>
                    <span className="text-white">
                      {skip.size} Yard ({sizeCategory})
                    </span>
                  </div>
                </td>
                <td className="p-4 text-white">{capacity}</td>
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
                  <span className="text-blue-500 font-bold">
                    {formattedPrice}
                    {totalPrice && <span className="text-gray-400 text-sm font-normal ml-1">per week</span>}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => onSelectSkip(skip)}
                    className={cn(
                      "px-4 py-2 rounded-md flex items-center justify-center",
                      isSelected ? "bg-blue-500 text-white" : "bg-[#1e2538] text-white hover:bg-[#2a3349]",
                    )}
                  >
                    {isSelected ? (
                      <>
                        <Check className="h-4 w-4 mr-2" /> Selected
                      </>
                    ) : (
                      <>
                        Select <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Mobile-friendly message for small screens */}
      <div className="md:hidden text-center mt-4 text-gray-400">
        <p>Swipe horizontally to see more details</p>
      </div>
    </div>
  )
}

