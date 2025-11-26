"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [message, setMessage] = useState<string>("")
  const [data, setData] = useState<number[]>([])

  const fetchData = async () => {
    try {
      const res = await fetch("/api/data")
      const json = await res.json()
      setData(json.data)
      setMessage(json.status)
    } catch (error) {
      console.error("Error fetching data:", error)
      setMessage("Error fetching data")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
      <h1 className="text-4xl font-bold">Next.js + Python + Jenkins</h1>
      <p className="text-lg">Frontend: Next.js + Tailwind + Shadcn</p>
      <p className="text-lg">Backend: Python Flask</p>

      <div className="p-4 border rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Backend Data</h2>
        <p>Status: {message}</p>
        <p>Data: {data.join(", ")}</p>
        <Button onClick={fetchData} className="mt-4">
          Fetch Data from Backend
        </Button>
      </div>
    </div>
  )
}
