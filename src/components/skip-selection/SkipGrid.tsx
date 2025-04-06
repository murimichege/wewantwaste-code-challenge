"use client"

import type { Skip } from "@/types/skip"
import { SkipCard } from "./SkipCard"

interface SkipGridProps {
  skips: Skip[]
  selectedSkipId: number | undefined
  onSelectSkip: (skip: Skip) => void
}

export function SkipGrid({ skips, selectedSkipId, onSelectSkip }: SkipGridProps) {
  // Filter out the largest skips (typically those over 16 yards)
  // as they might have different pricing models or requirements
  const displaySkips = skips.filter((skip) => skip.size <= 40)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
      {displaySkips.map((skip) => (
        <SkipCard key={skip.id} skip={skip} isSelected={skip.id === selectedSkipId} onSelect={onSelectSkip} />
      ))}
    </div>
  )
}

