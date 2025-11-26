"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Database, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { CodeBlock } from "@/components/ui/code-block"

export function BackendStatus() {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/data")
                if (!res.ok) throw new Error("Failed to fetch")
                const json = await res.json()
                setData(json)
            } catch (err) {
                setError("Failed to connect to backend")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <div className="p-3 md:p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900">
                <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
                    <h3 className="font-semibold text-sm md:text-base text-white">Backend API Status</h3>
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm">
                    {loading ? (
                        <span className="flex items-center gap-1 text-zinc-400">
                            <Loader2 className="h-3 w-3 animate-spin" /> Connecting...
                        </span>
                    ) : error ? (
                        <span className="flex items-center gap-1 text-red-400">
                            <XCircle className="h-3 w-3" /> Disconnected
                        </span>
                    ) : (
                        <span className="flex items-center gap-1 text-green-400">
                            <CheckCircle className="h-3 w-3" /> Connected
                        </span>
                    )}
                </div>
            </div>

            <div className="p-4 md:p-6">
                <p className="text-xs md:text-base text-zinc-400 mb-3 md:mb-4">
                    This component fetches data from the Python Flask backend via the Next.js API proxy.
                    It demonstrates the full-stack connectivity within the Kubernetes cluster.
                </p>

                <div className="space-y-2">
                    <div className="text-[10px] md:text-xs font-mono text-zinc-500 uppercase">Response from /api/data</div>
                    {loading ? (
                        <div className="h-24 rounded-lg bg-zinc-900 animate-pulse" />
                    ) : error ? (
                        <div className="p-3 md:p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs md:text-sm font-mono">
                            Error: {error}
                        </div>
                    ) : (
                        <CodeBlock
                            language="json"
                            code={JSON.stringify(data, null, 2)}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
