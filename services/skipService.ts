import type { Skip } from "@/types/skip"

/**
 * Service for handling skip-related data transformations
 */
class SkipService {
  /**
   * Calculates the total price including VAT
   */
  calculateTotalPrice(skip: Skip): number | null {
    if (skip.price_before_vat) {
      return skip.price_before_vat * (1 + skip.vat / 100)
    } else if (skip.transport_cost && skip.size < 20) {
      // For skips with transport cost pricing model
      return skip.transport_cost * (1 + skip.vat / 100)
    }
    return null // Price on request for large skips
  }

  /**
   * Formats a price as currency
   */
  formatCurrency(amount: number): string {
    return `£${amount.toFixed(2)}`
  }

  /**
   * Determines the size category of a skip
   */
  getSkipSizeCategory(size: number): string {
    if (size <= 6) return "Small"
    if (size <= 10) return "Medium"
    if (size <= 16) return "Large"
    return "Extra Large"
  }

  /**
   * Estimates the capacity of a skip in black bags
   */
  estimateCapacity(size: number): string {
    return `~${size * 10} black bags`
  }
}

export const skipService = new SkipService()

