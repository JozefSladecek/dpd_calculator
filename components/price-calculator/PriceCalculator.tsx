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
        defaultValues: {
            cashOnDelivery: false,
        },
    })

    function onSubmit(data: PriceCalculatorFormValues) {
        setPrice(calculatePrice(data))
    }

    return (
        <div className="bg-neutral-200 py-12">
            <div className="mx-auto max-w-3xl bg-white p-8 rounded-md">
                <h2 className="text-2xl font-semibold text-neutral-800 text-center mb-8">
                    Cenová kalkulačka
                </h2>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-2 gap-x-16 items-start">
                        <label htmlFor="country" className="text-sm text-neutral-700 block mb-3">
                            Cieľová krajina:
                        </label>
                        <label className="flex items-center gap-2 text-sm text-neutral-700 mb-3">
                            <input
                                type="checkbox"
                                {...form.register("cashOnDelivery")}
                                className="h-4 w-4 accent-red-600"
                            />
                            Dobierka
                        </label>

                        <select
                            id="country"
                            {...form.register("country")}
                            className="w-full border-0 border-b border-neutral-300 bg-transparent py-2 text-neutral-700 focus:outline-none focus:border-red-600"
                        >
                            <option value="">-- vyber krajinu --</option>
                            <option value="SK">Slovensko</option>
                            <option value="CZ">Česká republika</option>
                            <option value="DE">Nemecko</option>
                            <option value="PL">Poľsko</option>
                            <option value="HU">Maďarsko</option>
                            <option value="AT">Rakúsko</option>
                        </select>

                        <div className="min-h-10.5">
                        {form.watch("cashOnDelivery") ? (
                            <input
                                id="cashOnDeliveryAmount"
                                type="number"
                                placeholder="Dobierková suma"
                                {...form.register("cashOnDeliveryAmount", { valueAsNumber: true })}
                                className="w-full border-0 border-b border-neutral-300 bg-transparent py-2 text-neutral-400 placeholder-neutral-400 focus:outline-none focus:border-red-600"
                            />
                        ) : (
                            <div />
                        )}
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-neutral-700 mb-4">Rozmery balíka</p>
                        <div className="grid grid-cols-4 gap-6">
                            <div>
                                <label htmlFor="height" className="block text-xs text-neutral-500 mb-2">
                                    Výška (cm)
                                </label>
                                <input
                                    id="height"
                                    type="number"
                                    {...form.register("height", { valueAsNumber: true })}
                                    className="w-full border-0 border-b border-neutral-300 bg-transparent py-2 text-neutral-700 focus:outline-none focus:border-red-600"
                                />
                                {form.formState.errors.height && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {form.formState.errors.height.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="width" className="block text-xs text-neutral-500 mb-2">
                                    Šírka (cm)
                                </label>
                                <input
                                    id="width"
                                    type="number"
                                    {...form.register("width", { valueAsNumber: true })}
                                    className="w-full border-0 border-b border-neutral-300 bg-transparent py-2 text-neutral-700 focus:outline-none focus:border-red-600"
                                />
                                {form.formState.errors.width && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {form.formState.errors.width.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="length" className="block text-xs text-neutral-500 mb-2">
                                    Dĺžka (cm)
                                </label>
                                <input
                                    id="length"
                                    type="number"
                                    {...form.register("length", { valueAsNumber: true })}
                                    className="w-full border-0 border-b border-neutral-300 bg-transparent py-2 text-neutral-700 focus:outline-none focus:border-red-600"
                                />
                                {form.formState.errors.length && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {form.formState.errors.length.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="weight" className="block text-xs text-neutral-500 mb-2">
                                    Hmotnosť (kg)
                                </label>
                                <input
                                    id="weight"
                                    type="number"
                                    {...form.register("weight", { valueAsNumber: true })}
                                    className="w-full border-0 border-b border-neutral-300 bg-transparent py-2 text-neutral-700 focus:outline-none focus:border-red-600"
                                />
                                {form.formState.errors.weight && (
                                    <p className="text-red-600 text-xs mt-1">
                                        {form.formState.errors.weight.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center pt-2">
                        <button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 text-white font-medium px-10 py-3 rounded transition-colors"
                        >
                            Vypočítať
                        </button>
                    </div>
                </form>

                {price !== null && (
                    <div className="text-center mt-8 space-y-2 text-neutral-800">
                        <p>Cena pri vyzdvihnutí zásielky kuriérom je {price} EUR</p>
                        <p>Cena pri odoslaní zásielky z odberného miesta Pickup je {(price - 10).toFixed(2)} EUR</p>
                    </div>
                )}
            </div>
        </div>
    )
}