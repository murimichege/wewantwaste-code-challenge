"use client"

import { X } from "lucide-react"

interface SizeGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#171c2c] rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Skip Size Guide</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid gap-6">
            <div className="border border-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Small Skips (4-6 Yards)</h3>
              <p className="text-gray-300 mb-2">Ideal for small garden projects and home clearances.</p>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>Approximately 40-60 black bags of waste</li>
                <li>Suitable for soil, plants, grass, and small branches</li>
                <li>Perfect for small garden renovations</li>
                <li>Can typically be placed on roads (permit may be required)</li>
              </ul>
            </div>

            <div className="border border-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Medium Skips (8-10 Yards)</h3>
              <p className="text-gray-300 mb-2">Perfect for medium-sized renovation projects.</p>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>Approximately 80-100 black bags of waste</li>
                <li>Suitable for furniture, appliances, and general waste</li>
                <li>Ideal for home renovations and kitchen refits</li>
                <li>May require more space for placement</li>
              </ul>
            </div>

            <div className="border border-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Large Skips (12-16 Yards)</h3>
              <p className="text-gray-300 mb-2">Best for large construction and demolition projects.</p>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>Approximately 120-160 black bags of waste</li>
                <li>Suitable for bricks, concrete, tiles, and wood</li>
                <li>Perfect for large construction projects</li>
                <li>Typically not allowed on public roads</li>
                <li>Requires substantial space for placement</li>
              </ul>
            </div>

            <div className="border border-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Extra Large Skips (20-40 Yards)</h3>
              <p className="text-gray-300 mb-2">For commercial and industrial projects.</p>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>Approximately 200-400 black bags of waste</li>
                <li>Suitable for large-scale projects and industrial waste</li>
                <li>Typically used for commercial construction</li>
                <li>Requires significant space and special arrangements</li>
                <li>Often priced on request based on specific requirements</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-800 flex justify-end">
          <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

