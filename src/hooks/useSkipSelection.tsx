"use client"

import { useState, useMemo } from "react"
import { skipService } from "@/services/skipService"
import type { Skip } from "@/types/skip"

type WasteTypeId = "garden" | "home" | "construction" | "commercial" | null
type ViewMode = "grid" | "compare"

interface FilterOptions {
  roadPlacement: boolean
  heavyWaste: boolean
}

export function useSkipSelection() {
  // State for skips data and loading status
  const [skips, setSkips] = useState<Skip[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Selection and filter states
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null)
  const [selectedWasteType, setSelectedWasteType] = useState<WasteTypeId>("home")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [filters, setFilters] = useState<FilterOptions>({
    roadPlacement: false,
    heavyWaste: false,
  })

  // Fetch skips data
  const fetchSkips = async (postcode: string, area?: string) => {
    try {
      setLoading(true)
      setError(null)

      // Fetch skips from the API
      const skipsData = await skipService.getSkipsByLocation(postcode, area)

      // Sort skips by size
      const sortedSkips = [...skipsData].sort((a, b) => a.size - b.size)
      setSkips(sortedSkips)

      setLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch skip options")
      setLoading(false)
    }
  }

  // Filtered skips based on waste type and other filters
  const filteredSkips = useMemo(() => {
    let result = [...skips]

    // Filter by waste type
    if (selectedWasteType) {
      switch (selectedWasteType) {
        case "garden":
          // Garden waste: Smaller skips (4-8 yards)
          result = result.filter((skip) => skip.size >= 4 && skip.size <= 8)
          break
        case "home":
          // Home renovation: Medium skips (6-12 yards)
          result = result.filter((skip) => skip.size >= 6 && skip.size <= 12)
          break
        case "construction":
          // Construction: Medium to large skips (8-16 yards)
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

    return result
  }, [skips, selectedWasteType, filters.roadPlacement, filters.heavyWaste])

  // Handler for selecting a skip
  const selectSkip = (skip: Skip) => {
    setSelectedSkip(skip)
  }

  // Handler for selecting waste type
  const selectWasteType = (typeId: WasteTypeId) => {
    setSelectedWasteType(typeId)
    // Reset selected skip when changing waste type
    setSelectedSkip(null)
  }

  // Handler for changing filter options
  const updateFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters)
    // Reset selected skip when changing filters
    setSelectedSkip(null)
  }

  // Handler for continuing to the next step
  const handleContinue = () => {
    if (!selectedSkip) return

    // In a real implementation, this would navigate to the next step
    // For now, we'll just log the selected skip
    console.log("Continuing with skip:", selectedSkip)

    // You could add navigation logic here, e.g.:
    // router.push(`/permit-check?skipId=${selectedSkip.id}`)
  }

  // Handler for going back to the previous step
  const handleBack = () => {
    // In a real implementation, this would navigate to the previous step
    console.log("Going back to previous step")

    // You could add navigation logic here, e.g.:
    // router.push('/waste-type')
  }

  return {
    // Data
    skips: filteredSkips,
    loading,
    error,
    selectedSkip,
    selectedWasteType,
    viewMode,
    filters,

    // Actions
    fetchSkips,
    selectSkip,
    selectWasteType,
    setViewMode,
    updateFilters,
    handleContinue,
    handleBack,
  }
}

