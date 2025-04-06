"use client"

import { ArrowRight } from "lucide-react"
import type { Skip } from "@/types/skip"
import { skipService } from "@/services/skipService"

interface SkipSelectionSummaryProps {
  skip: Skip
  onBack: () => void
  onContinue: () => void
}

export function SkipSelectionSummary({ skip, onBack, onContinue }: SkipSelectionSummaryProps) {
  const totalPrice = skipService.calculateTotalPrice(skip)
  const formattedPrice = totalPrice ? skipService.formatCurrency(totalPrice) : "Price on request"
  const capacity = skipService.estimateCapacity(skip.size)
  const sizeCategory = skipService.getSkipSizeCategory(skip.size)

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#131b2c] border-t border-gray-800 py-4 z-10">
      <div className="container mx-auto flex items-center justify-between px-4">
        <button onClick={onBack} className="bg-[#1a2234] text-white py-3 px-6 rounded-md hover:bg-[#232d42]">
          Back
        </button>

        <div className="flex items-center">
          <div className="bg-[#e59029] text-white font-bold p-3 mr-4 flex items-center justify-center">
            <span className="hidden sm:inline">{skip.size} Yard Skip</span>
            <span className="sm:hidden">{skip.size} YD</span>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-1 mr-8">
            <div className="text-gray-400">Capacity</div>
            <div className="text-right">{capacity}</div>
            <div className="text-gray-400">Hire Period</div>
            <div className="text-right">{skip.hire_period_days} days</div>
          </div>

          <div className="mr-4">
            <div className="text-gray-400 text-sm">Total Price</div>
            <div className="text-xl font-bold text-blue-500">{formattedPrice}</div>
          </div>
        </div>

        <button
          onClick={onContinue}
          className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 flex items-center"
        >
          Continue <ArrowRight className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  )
}

