"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    priceCalculatorSchema,
    type PriceCalculatorFormValues,
} from "@/lib/validation/price-calculator.schema"
import { calculatePrice } from "@/lib/pricing/calculate-price"

export function PriceCalculator() {
    const [price, setPrice] = useState<number | null>(null)

    const form = useForm<PriceCalculatorFormValues>({
        resolver: zodResolver(priceCalculatorSchema),
    })

    function onSubmit(data: PriceCalculatorFormValues) {
        const result = calculatePrice(data)
        setPrice(result)
    }

    return (
        <div>
            <h2>Cenová kalkulačka</h2>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="country">Cieľová krajina</label>
                    <select id="country" {...form.register("country")}>
                        <option value="">-- vyber krajinu --</option>
                        <option value="SK">Slovensko</option>
                        <option value="CZ">Česká republika</option>
                        <option value="DE">Nemecko</option>
                        <option value="PL">Poľsko</option>
                        <option value="HU">Maďarsko</option>
                        <option value="AT">Rakúsko</option>
                    </select>
                    {form.formState.errors.country && (
                        <p>{form.formState.errors.country.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="height">Výška (cm)</label>
                    <input
                        id="height"
                        type="number"
                        {...form.register("height", { valueAsNumber: true })}
                    />
                    {form.formState.errors.height && (
                        <p>{form.formState.errors.height.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="width">Šírka (cm)</label>
                    <input
                        id="width"
                        type="number"
                        {...form.register("width", { valueAsNumber: true })}
                    />
                    {form.formState.errors.width && (
                        <p>{form.formState.errors.width.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="length">Dĺžka (cm)</label>
                    <input
                        id="length"
                        type="number"
                        {...form.register("length", { valueAsNumber: true })}
                    />
                    {form.formState.errors.length && (
                        <p>{form.formState.errors.length.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="weight">Hmotnosť (kg)</label>
                    <input
                        id="weight"
                        type="number"
                        {...form.register("weight", { valueAsNumber: true })}
                    />
                    {form.formState.errors.weight && (
                        <p>{form.formState.errors.weight.message}</p>
                    )}
                </div>

                <button type="submit">Vypočítať</button>
            </form>
            {price !== null && (
                <p>Cena prepravy: {price} €</p>
            )}
        </div>
    )
}