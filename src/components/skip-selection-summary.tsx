"use client"

import { ArrowRight } from "lucide-react"

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

interface SkipSelectionSummaryProps {
  skip: Skip
  onBack: () => void
  onContinue: () => void
}

export default function SkipSelectionSummary({ skip, onBack, onContinue }: SkipSelectionSummaryProps) {
  // Get size category based on skip size
  const getSizeCategory = (size: number) => {
    if (size <= 6) return "Small"
    if (size <= 10) return "Medium"
    if (size <= 16) return "Large"
    return "Extra Large"
  }

  // Estimate capacity in black bags
  const estimateCapacity = (size: number) => {
    return `~${size * 10} black bags`
  }

  // Calculate the total price including VAT
  const calculateTotalPrice = () => {
    if (skip.price_before_vat) {
      return skip.price_before_vat * (1 + skip.vat / 100)
    }
    return 366.18 // Default price for demo purposes
  }

  const totalPrice = calculateTotalPrice()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#171c2c] border-t border-gray-800 py-4 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <button onClick={onBack} className="bg-[#1e2538] text-white py-3 px-6 rounded-md hover:bg-[#2a3349]">
          Back
        </button>

        {/* Center section - Skip summary */}
        <div className="flex items-center bg-[#1a2234] rounded-md overflow-hidden">
          {/* Skip image */}
          <div className="bg-[#e59029] flex items-center justify-center" style={{ width: "80px", height: "70px" }}>
            <div className="text-white font-bold text-xl">{skip.size} YD</div>
          </div>

          {/* Skip details */}
          <div className="flex items-center">
            {/* Skip name and category */}
            <div className="px-4">
              <div className="text-white">{skip.size} Yard Skip</div>
              <div className="text-gray-400 text-sm">{getSizeCategory(skip.size)}</div>
            </div>

            {/* Vertical divider */}
            <div className="h-16 w-px bg-gray-700"></div>

            {/* Capacity */}
            <div className="px-6">
              <div className="text-gray-400 text-sm">Capacity</div>
              <div className="text-white">{estimateCapacity(skip.size)}</div>
            </div>

            {/* Vertical divider */}
            <div className="h-16 w-px bg-gray-700"></div>

            {/* Hire Period */}
            <div className="px-6">
              <div className="text-gray-400 text-sm">Hire Period</div>
              <div className="text-white">{skip.hire_period_days} days</div>
            </div>

            {/* Vertical divider */}
            <div className="h-16 w-px bg-gray-700"></div>

            {/* Total Price */}
            <div className="px-6">
              <div className="text-gray-400 text-sm">Total Price</div>
              <div className="text-blue-500 font-bold">£{totalPrice.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <button
          onClick={onContinue}
          className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 flex items-center"
        >
          Continue <ArrowRight className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  )
}

