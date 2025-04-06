"use client"

import { useState, useEffect, useMemo } from "react"
import ProgressBar from "./progress-bar"
import DeliveryAddressBar from "./delivery-address-bar"
import FilterOptions, { type FilterOptions as FilterOptionsType } from "./filter-options"
import WasteTypeSelector from "./waste-type-selector"
import SkipCard from "./skip-card"
import SkipCompareView from "./skip-compare-view"
import SkipSelectionSummary from "./skip-selection-summary"
import SizeGuideModal from "./size-guide-modal"

// Define the Skip type
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

interface SkipSelectionPageProps {
  skips: Skip[]
}

export default function SkipSelectionPage({ skips }: SkipSelectionPageProps) {
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "compare">("grid")
  const [wasteType, setWasteType] = useState<"garden" | "home" | "construction" | "commercial" | null>("home")
  const [filters, setFilters] = useState<FilterOptionsType>({
    roadPlacement: false,
    heavyWaste: false,
  })
  const [filteredSkips, setFilteredSkips] = useState<Skip[]>([])
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)

  // Memoize the sorted skips to prevent recreating the array on each render
  const sortedSkips = useMemo(() => {
    return [...skips].sort((a, b) => a.size - b.size)
  }, [skips])

  // Filter skips based on selected waste type and filters
  useEffect(() => {
    let result = [...sortedSkips]

    // Filter by waste type
    if (wasteType) {
      switch (wasteType) {
        case "garden":
          // Garden waste: Smaller skips (4-8 yards)
          result = result.filter((skip) => skip.size >= 4 && skip.size <= 8)
          break
        case "home":
          // Home renovation: Medium skips (6-12 yards)
          result = result.filter((skip) => skip.size >= 6 && skip.size <= 12)
          break
        case "construction":
          // Construction: Medium to large skips (8-16 yards), prefer those that allow heavy waste
          result = result.filter((skip) => skip.size >= 8 && skip.size <= 16)
          break
        case "commercial":
          // Commercial: Largest skips (12-40 yards)
          result = result.filter((skip) => skip.size >= 12)
          break
      }
    }

    // Apply additional filters
    if (filters.roadPlacement) {
      result = result.filter((skip) => skip.allowed_on_road)
    }

    if (filters.heavyWaste) {
      result = result.filter((skip) => skip.allows_heavy_waste)
    }

    setFilteredSkips(result)
  }, [wasteType, filters.roadPlacement, filters.heavyWaste, sortedSkips])

  const handleSelectSkip = (skipId: number) => {
    setSelectedSkipId(skipId)
  }

  const handleContinue = () => {
    if (selectedSkipId) {
      // In a real implementation, this would navigate to the next step
      alert(`Continuing with skip ID: ${selectedSkipId}`)
    }
  }

  const handleBack = () => {
    // In a real implementation, this would navigate to the previous step
    alert("Going back to previous step")
  }

  const handleChangeAddress = () => {
    // In a real implementation, this would open an address change modal
    alert("Change address clicked")
  }

  const handleFilterChange = (newFilters: FilterOptionsType) => {
    setFilters(newFilters)
  }

  const handleWasteTypeSelect = (type: "garden" | "home" | "construction" | "commercial" | null) => {
    setWasteType(type)
    // Reset selected skip when changing waste type
    setSelectedSkipId(null)
  }

  const selectedSkip = skips.find((skip) => skip.id === selectedSkipId)

  return (
    <div className="min-h-screen bg-[#0f1117] pb-24">
      {/* Progress Bar */}
      <ProgressBar currentStep={3} />

      <div className="container mx-auto px-4 py-8">
        {/* Delivery Address */}
        <DeliveryAddressBar address="193 Ashby Road, Hinckley, LE10 1SH" onChangeAddress={handleChangeAddress} />

        {/* Page Header */}
        <div className="text-center my-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Choose Your Skip Size</h1>
          <p className="mt-2 text-gray-400">Select the skip size that best suits your needs</p>
        </div>

        {/* Filter Options */}
        <FilterOptions
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onFilterChange={handleFilterChange}
          onSizeGuideOpen={() => setIsSizeGuideOpen(true)}
        />

        {/* Waste Type Selector */}
        <WasteTypeSelector selectedType={wasteType} onSelect={handleWasteTypeSelect} />

        {/* Skip Selection - Grid or Compare View */}
        {filteredSkips.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {filteredSkips.map((skip) => (
                <SkipCard
                  key={skip.id}
                  skip={skip}
                  isSelected={selectedSkipId === skip.id}
                  onSelect={() => handleSelectSkip(skip.id)}
                />
              ))}
            </div>
          ) : (
            <SkipCompareView skips={filteredSkips} selectedSkipId={selectedSkipId} onSelectSkip={handleSelectSkip} />
          )
        ) : (
          <div className="text-center py-12 mb-20">
            <p className="text-gray-400 text-lg">
              No skips available for the selected filters. Please try different options.
            </p>
          </div>
        )}
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        {selectedSkip ? (
          <SkipSelectionSummary skip={selectedSkip} onBack={handleBack} onContinue={handleContinue} />
        ) : (
          <div className="bg-[#171c2c] border-t border-gray-800 py-4">
            <div className="container mx-auto flex items-center justify-between px-4">
              <button onClick={handleBack} className="bg-[#1e2538] text-white py-3 px-6 rounded-md hover:bg-[#2a3349]">
                Back
              </button>

              <div className="text-gray-400">Select a skip to continue</div>

              <button disabled className="bg-gray-700 text-gray-400 py-3 px-6 rounded-md cursor-not-allowed">
                Continue
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </div>
  )
}

