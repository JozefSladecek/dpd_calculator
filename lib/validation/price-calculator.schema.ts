// src/lib/validation/price-calculator.schema.ts
import { z } from "zod"

export const priceCalculatorSchema = z
    .object({
        country: z.string().min(1, "Vyber krajinu"),
        height: z.number({ message: "Zadaj kladné číslo" }).positive("Zadaj kladné číslo"),
        width: z.number({ message: "Zadaj kladné číslo" }).positive("Zadaj kladné číslo"),
        length: z.number({ message: "Zadaj kladné číslo" }).positive("Zadaj kladné číslo"),
        weight: z.number({ message: "Zadaj kladné číslo" }).positive("Zadaj kladné číslo"),
        cashOnDelivery: z.boolean(),
        cashOnDeliveryAmount: z.number().positive().optional(),
    })
    .refine(
        (data) => !data.cashOnDelivery || data.cashOnDeliveryAmount !== undefined,
        {
            message: "Zadaj dobierkovú sumu",
            path: ["cashOnDeliveryAmount"],
        }
    )

export type PriceCalculatorFormValues = z.infer<typeof priceCalculatorSchema>