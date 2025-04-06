"use client"

import { Button } from "./button"

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="text-center p-8 bg-[#131b2c] rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold text-red-500 mb-4">Error</h2>
      <p className="text-gray-300 mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} className="bg-blue-600 hover:bg-blue-700">
          Try Again
        </Button>
      )}
    </div>
  )
}

