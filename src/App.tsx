import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function App() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [previousValue, setPreviousValue] = useState<number | null>(null)

  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const performOperation = (op: string) => {
    const currentNumber = Number.parseFloat(input)

    if (isNaN(currentNumber)) {
      alert("Please enter a valid number")
      return
    }

    if (previousValue !== null && operation && input !== "") {
      // Perform the pending operation first
      const prev = previousValue
      let newResult: number

      switch (operation) {
        case "add":
          newResult = prev + currentNumber
          break
        case "subtract":
          newResult = prev - currentNumber
          break
        case "multiply":
          newResult = prev * currentNumber
          break
        case "divide":
          if (currentNumber === 0) {
            alert("Cannot divide by zero")
            return
          }
          newResult = prev / currentNumber
          break
        default:
          newResult = currentNumber
      }

      setResult(newResult)
      setPreviousValue(newResult)
    } else {
      setPreviousValue(currentNumber)
      setResult(currentNumber)
    }

    setOperation(op)
    setInput("")
  }

  const calculateResult = () => {
    if (previousValue === null || operation === null || input === "") {
      return
    }

    const currentNumber = Number.parseFloat(input)

    if (isNaN(currentNumber)) {
      alert("Please enter a valid number")
      return
    }

    let finalResult: number

    switch (operation) {
      case "add":
        finalResult = previousValue + currentNumber
        break
      case "subtract":
        finalResult = previousValue - currentNumber
        break
      case "multiply":
        finalResult = previousValue * currentNumber
        break
      case "divide":
        if (currentNumber === 0) {
          alert("Cannot divide by zero")
          return
        }
        finalResult = previousValue / currentNumber
        break
      default:
        finalResult = currentNumber
    }

    setResult(finalResult)
    setPreviousValue(null)
    setOperation(null)
    setInput("")
  }

  const resetInput = () => {
    setInput("")
  }

  const resetResult = () => {
    setInput("")
    setResult(null)
    setOperation(null)
    setPreviousValue(null)
  }

  return (
    <div className="flex w-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Display */}
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              {previousValue !== null && operation && (
                <span>
                  {previousValue}{" "}
                  {operation === "add" ? "+" : operation === "subtract" ? "-" : operation === "multiply" ? "×" : "÷"}
                </span>
              )}
            </div>
            <Input
              type="number"
              value={input}
              onChange={handleNumberInput}
              placeholder="Enter a number"
              className="text-lg text-center"
            />
            <div className="text-right text-lg font-semibold">Result: {result !== null ? result : "—"}</div>
          </div>

          {/* Operation Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button onClick={() => performOperation("add")} variant="default" className="h-12">
              Add (+)
            </Button>
            <Button onClick={() => performOperation("subtract")} variant="default" className="h-12">
              Subtract (-)
            </Button>
            <Button onClick={() => performOperation("multiply")} variant="default" className="h-12">
              Multiply (×)
            </Button>
            <Button onClick={() => performOperation("divide")} variant="default" className="h-12">
              Divide (÷)
            </Button>
          </div>

          {/* Calculate Button */}
          <Button
            onClick={calculateResult}
            variant="secondary"
            className="w-full h-12 text-lg font-semibold text-white"
            disabled={!operation || !input}
          >
            Calculate (=)
          </Button>

          {/* Reset Buttons */}
          <div className="grid grid-cols-2 gap-2 text-white">
            <Button onClick={resetInput} variant="default" className="h-10">
              Reset Input
            </Button>
            <Button onClick={resetResult} variant="default" className="h-10">
              Reset Result
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
