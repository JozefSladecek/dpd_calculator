import type { PriceCalculatorFormValues } from "@/lib/validation/price-calculator.schema"

const VOLUMETRIC_DIVISOR = 5000

const BASE_PRICE = 3.5
const PRICE_PER_KG = 0.8

export function calculatePrice(data: PriceCalculatorFormValues): number {
    const volumeCm3 = data.height * data.width * data.length
    const volumetricWeight = volumeCm3 / VOLUMETRIC_DIVISOR

    const chargeableWeight = Math.max(data.weight, volumetricWeight)

    const price = BASE_PRICE + chargeableWeight * PRICE_PER_KG

    return Math.round(price * 100) / 100
}