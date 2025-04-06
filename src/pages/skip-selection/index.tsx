"use client"

import { useEffect } from "react"
import { useSkipSelection } from "@/hooks/useSkipSelection"
import {ProgressSteps}  from "@/components/navigation/ProgressSteps"
import { DeliveryAddressBar } from "@/components/skip-selection/DeliveryAddressBar"
import { PageHeader } from "@/components/ui/PageHeader"
import { SkipFilters } from "@/components/skip-selection/SkipFilters"
import { WasteTypeSelector } from "@/components/skip-selection/WasteTypeSelector"
import { SkipGrid } from "@/components/skip-selection/SkipGrid"
import { SkipCompare } from "@/components/skip-selection/SkipCompare"
import { SkipSelectionSummary } from "@/components/skip-selection/SkipSelectionSummary"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { ErrorMessage } from "@/components/ui/ErrorMessage"

export default function SkipSelectionPage() {
  const {
    skips,
    loading,
    error,
    selectedSkip,
    selectedWasteType,
    viewMode,
    fetchSkips,
    selectSkip,
    selectWasteType,
    setViewMode,
    handleContinue,
    handleBack,
  } = useSkipSelection()

  useEffect(() => {
    // Fetch skips on component mount
    fetchSkips("NR32", "Lowestoft")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <ErrorMessage message={error} onRetry={() => fetchSkips("NR32", "Lowestoft")} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24">
      {/* Progress Steps - Sticky Header */}
      <ProgressSteps currentStep="select-skip"  />

      <div className="container mx-auto px-4 py-6">
        {/* Delivery Address */}
        <DeliveryAddressBar
          address="193 Ashby Road, Hinckley, LE10 1SH"
          onChangeAddress={() => console.log("Change address clicked")}
        />

        {/* Page Header */}
        <PageHeader title="Choose Your Skip Size" subtitle="Select the skip size that best suits your needs" />

        {/* Filters */}
        <SkipFilters viewMode={viewMode} onViewModeChange={setViewMode} />

        {/* Waste Type Selector */}
        <WasteTypeSelector selectedType={selectedWasteType} onSelect={selectWasteType} />

        {/* Skip Selection */}
        {viewMode === "grid" ? (
          <SkipGrid skips={skips} selectedSkipId={selectedSkip?.id} onSelectSkip={selectSkip} />
        ) : (
          <SkipCompare skips={skips} selectedSkipId={selectedSkip?.id} onSelectSkip={selectSkip} />
        )}

        {/* Add padding at the bottom to account for the fixed footer */}
        <div className="h-24"></div>
      </div>

      {/* Bottom Summary Bar */}
      {selectedSkip && <SkipSelectionSummary skip={selectedSkip} onBack={handleBack} onContinue={handleContinue} />}
    </div>
  )
}

