"use client"

import { Check, X, ArrowRight } from "lucide-react"
import type { Skip } from "@/types/skip"
import { skipService } from "@/services/skipService"

interface SkipCardProps {
  skip: Skip
  isSelected: boolean
  onSelect: (skip: Skip) => void
}

export function SkipCard({ skip, isSelected, onSelect }: SkipCardProps) {
  const totalPrice = skipService.calculateTotalPrice(skip)
  const formattedPrice = totalPrice ? skipService.formatCurrency(totalPrice) : "Price on request"
  const sizeCategory = skipService.getSkipSizeCategory(skip.size)
  const capacity = skipService.estimateCapacity(skip.size)

  return (
    <div
      className={`bg-[#131b2c] rounded-lg overflow-hidden transition-all ${isSelected ? "border-2 border-blue-500" : ""}`}
    >
      <div className="relative">
        <div className="absolute right-3 top-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {sizeCategory}
        </div>
        <div className="flex justify-center py-8 bg-[#1a2234]">
          <div className="bg-[#e59029] text-white font-bold text-xl p-6 w-32 h-16 flex items-center justify-center">
            {skip.size} YD
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-1">{skip.size} Yard Skip</h3>
        <p className="text-gray-400 mb-4">{skip.hire_period_days} day hire period</p>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-400">Road Placement:</span>
            <span
              className={skip.allowed_on_road ? "text-green-500 flex items-center" : "text-red-500 flex items-center"}
            >
              {skip.allowed_on_road ? (
                <>
                  <Check className="h-4 w-4 mr-1" /> Allowed
                </>
              ) : (
                <>
                  <X className="h-4 w-4 mr-1" /> Not Allowed
                </>
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Heavy Waste:</span>
            <span
              className={
                skip.allows_heavy_waste ? "text-green-500 flex items-center" : "text-red-500 flex items-center"
              }
            >
              {skip.allows_heavy_waste ? (
                <>
                  <Check className="h-4 w-4 mr-1" /> Allowed
                </>
              ) : (
                <>
                  <X className="h-4 w-4 mr-1" /> Not Allowed
                </>
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Capacity:</span>
            <span>{capacity}</span>
          </div>
        </div>

        <div className="mb-4">
          {totalPrice ? (
            <span className="text-3xl font-bold text-blue-500">£{totalPrice.toFixed(2)}</span>
          ) : (
            <span className="text-3xl font-bold text-blue-500">£Price on request</span>
          )}
          <span className="text-gray-400 ml-2">per week</span>
        </div>

        <button
          onClick={() => onSelect(skip)}
          className={`w-full py-3 flex items-center justify-center ${
            isSelected ? "bg-blue-600 text-white" : "bg-[#1a2234] text-white hover:bg-[#232d42]"
          }`}
        >
          {isSelected ? (
            <>
              <Check className="h-4 w-4 mr-2" /> Selected
            </>
          ) : (
            <>
              Select This Skip <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}

