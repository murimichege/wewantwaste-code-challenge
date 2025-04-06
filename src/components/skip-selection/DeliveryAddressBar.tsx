"use client"

import { MapPin, Edit2 } from "lucide-react"

interface DeliveryAddressBarProps {
  address: string
  onChangeAddress: () => void
}

export function DeliveryAddressBar({ address, onChangeAddress }: DeliveryAddressBarProps) {
  return (
    <div className="bg-[#131b2c] rounded-lg p-4 mb-8 flex items-center justify-between">
      <div className="flex items-center">
        <MapPin className="text-blue-500 mr-3 h-5 w-5 flex-shrink-0" />
        <div>
          <p className="text-gray-400 text-sm">Delivering to:</p>
          <p className="font-medium">{address}</p>
        </div>
      </div>
      <button onClick={onChangeAddress} className="text-blue-500 hover:text-blue-400 flex items-center">
        <Edit2 className="h-4 w-4 mr-1" />
        <span className="hidden sm:inline">Change Address</span>
        <span className="sm:hidden">Change</span>
      </button>
    </div>
  )
}

