"use client"

import { useState } from "react"
import { PlusCircle, Trash2, CheckCircle2, XCircle } from "lucide-react"

type ProsCons = {
  pros: string[]
  cons: string[]
}

interface ProsConsSectionProps {
  formData: {
    pros?: string[]
    cons?: string[]
  }
  handleProsConsChange: (type: "pros" | "cons", value: string[]) => void
}

export default function ProsConsSection({ formData, handleProsConsChange }: ProsConsSectionProps) {
  const [pros, setPros] = useState<string[]>(formData.pros || [""])
  const [cons, setCons] = useState<string[]>(formData.cons || [""])

  const addPro = () => {
    const newPros = [...pros, ""]
    setPros(newPros)
    handleProsConsChange("pros", newPros)
  }

  const addCon = () => {
    const newCons = [...cons, ""]
    setCons(newCons)
    handleProsConsChange("cons", newCons)
  }

  const updatePro = (index: number, value: string) => {
    const newPros = [...pros]
    newPros[index] = value
    setPros(newPros)
    handleProsConsChange("pros", newPros)
  }

  const updateCon = (index: number, value: string) => {
    const newCons = [...cons]
    newCons[index] = value
    setCons(newCons)
    handleProsConsChange("cons", newCons)
  }

  const removePro = (index: number) => {
    const newPros = [...pros]
    newPros.splice(index, 1)
    setPros(newPros)
    handleProsConsChange("pros", newPros)
  }

  const removeCon = (index: number) => {
    const newCons = [...cons]
    newCons.splice(index, 1)
    setCons(newCons)
    handleProsConsChange("cons", newCons)
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Pros & Cons</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pros Section */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-lg font-medium text-green-700 mb-3">Pros</h3>
          <div className="space-y-3">
            {pros.map((pro, index) => (
              <div key={`pro-${index}`} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-2.5 flex-shrink-0" />
                <textarea
                  value={pro}
                  onChange={(e) => updatePro(index, e.target.value)}
                  placeholder="e.g. Exceptional performance for creative professionals"
                  className="flex-grow bg-white border border-gray-300 rounded-md p-2 min-h-[60px] text-sm"
                />
                <button
                  type="button"
                  onClick={() => removePro(index)}
                  className="flex-shrink-0 text-red-500 hover:text-red-700"
                  disabled={pros.length === 1}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addPro}
              className="w-full py-2 border border-dashed border-green-300 rounded-md text-green-700 flex items-center justify-center hover:bg-green-100"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Pros
            </button>
          </div>
        </div>

        {/* Cons Section */}
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h3 className="text-lg font-medium text-red-700 mb-3">Cons</h3>
          <div className="space-y-3">
            {cons.map((con, index) => (
              <div key={`con-${index}`} className="flex items-start gap-2">
                <XCircle className="h-5 w-5 text-red-600 mt-2.5 flex-shrink-0" />
                <textarea
                  value={con}
                  onChange={(e) => updateCon(index, e.target.value)}
                  placeholder="e.g. Expensive compared to Windows alternatives"
                  className="flex-grow bg-white border border-gray-300 rounded-md p-2 min-h-[60px] text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeCon(index)}
                  className="flex-shrink-0 text-red-500 hover:text-red-700"
                  disabled={cons.length === 1}
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addCon}
              className="w-full py-2 border border-dashed border-red-300 rounded-md text-red-700 flex items-center justify-center hover:bg-red-100"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Cons
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
