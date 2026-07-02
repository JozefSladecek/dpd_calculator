import { z } from "zod"

export const priceCalculatorSchema = z.object({
    country: z.string().min(1, "Vyber krajinu"),
    height: z.number({ message: "Zadaj kladné číslo" }).positive("Zadaj kladné číslo"),
    width: z.number({ message: "Zadaj kladné číslo" }).positive("Zadaj kladné číslo"),
    length: z.number({ message: "Zadaj kladné číslo" }).positive("Zadaj kladné číslo"),
    weight: z.number({ message: "Zadaj kladné číslo" }).positive("Zadaj kladné číslo"),
})

export type PriceCalculatorFormValues = z.infer<typeof priceCalculatorSchema>