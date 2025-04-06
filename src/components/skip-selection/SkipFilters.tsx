"use client"

import { Grid, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SkipFiltersProps {
  viewMode: "grid" | "compare"
  onViewModeChange: (mode: "grid" | "compare") => void
}

export function SkipFilters({ viewMode, onViewModeChange }: SkipFiltersProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-8">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex space-x-2 mb-4 md:mb-0">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
            className={
              viewMode === "grid"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
            }
          >
            <Grid className="h-4 w-4 mr-1" /> Grid
          </Button>
          <Button
            variant={viewMode === "compare" ? "default" : "outline"}
            size="sm"
            onClick={() => onViewModeChange("compare")}
            className={
              viewMode === "compare"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
            }
          >
            <BarChart2 className="h-4 w-4 mr-1" /> Compare
          </Button>
        </div>
      </div>
    </div>
  )
}
