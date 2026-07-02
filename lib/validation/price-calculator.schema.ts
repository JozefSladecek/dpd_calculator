import { z } from "zod"

export const priceCalculatorSchema = z.object({
    country: z.string().min(1, "Vyber krajinu"),
    height: z.coerce.number().positive("Zadaj kladné číslo"),
    width: z.coerce.number().positive("Zadaj kladné číslo"),
    length: z.coerce.number().positive("Zadaj kladné číslo"),
    weight: z.coerce.number().positive("Zadaj kladné číslo"),
})

export type PriceCalculatorFormValues = z.infer<typeof priceCalculatorSchema>