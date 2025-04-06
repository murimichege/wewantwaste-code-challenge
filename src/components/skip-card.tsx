"use client"

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

interface SkipCardProps {
  skip: Skip
  isSelected: boolean
  onSelect: () => void
}

export default function SkipCard({ skip, isSelected, onSelect }: SkipCardProps) {
  // Calculate the total price including VAT
  const calculateTotalPrice = () => {
    if (skip.price_before_vat) {
      return skip.price_before_vat * (1 + skip.vat / 100)
    }
    return 366.18 // Default price for demo purposes
  }

  const totalPrice = calculateTotalPrice()

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

  return (
    <div
      className={cn("overflow-hidden cursor-pointer rounded-lg relative", isSelected ? "border-2 border-blue-500" : "")}
      onClick={onSelect}
    >
      {/* Top section with skip size */}
      <div className="relative bg-[#1a2234] pt-10 pb-16">
        {/* Size badge */}
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-blue-500 text-white text-xs font-medium px-3 py-0.5 rounded-full">
            {getSizeCategory(skip.size)}
          </div>
        </div>

        {/* Creative skip size display */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Skip container - perspective view */}
            <div className="relative w-[140px] h-[80px] bg-gradient-to-br from-[#f0a040] to-[#d17a20] rounded-sm transform perspective-500 rotate-x-10">
              {/* Skip top edge */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-[#ffc060] transform -translate-y-1 skew-x-[-15deg]"></div>

              {/* Skip side edge */}
              <div className="absolute top-0 right-0 w-3 h-full bg-[#b56518] transform translate-x-1 skew-y-[15deg]"></div>

              {/* Skip size text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-2xl drop-shadow-md">{skip.size} YD</span>
              </div>

              {/* Skip shadow */}
              <div className="absolute -bottom-3 left-2 right-2 h-6 bg-black/20 blur-md rounded-full z-[-1]"></div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#ffc060] rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-[#ffc060] rounded-full opacity-30"></div>
          </div>
        </div>
      </div>

      {/* Bottom section with details */}
      <div className="bg-[#171c2c] p-5">
        {/* Title and subtitle */}
        <h3 className="text-lg font-bold text-white">{skip.size} Yard Skip</h3>
        <p className="text-sm text-gray-400 mb-4">{skip.hire_period_days} day hire period</p>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">Road Placement:</span>
            <span className="text-sm text-green-500 flex items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Allowed
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">Heavy Waste:</span>
            <span className="text-sm text-green-500 flex items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Allowed
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">Capacity:</span>
            <span className="text-sm text-white">{estimateCapacity(skip.size)}</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-blue-500">£{totalPrice.toFixed(2)}</span>
          <span className="text-xs text-gray-400 ml-1">per week</span>
        </div>

        {/* Button */}
        {isSelected ? (
          <div className="w-full py-3 bg-blue-500 text-white text-sm flex items-center justify-center rounded-md">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Selected
          </div>
        ) : (
          <div className="w-full py-3 bg-[#1e2538] text-white text-sm flex items-center justify-center rounded-md">
            Select This Skip
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

