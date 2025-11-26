"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileCode } from "lucide-react"
import { CodeBlock } from "@/components/ui/code-block"
import { cn } from "@/lib/utils"

interface Manifest {
    name: string
    filename: string
    description: string
    code: string
}

interface ManifestViewerProps {
    manifests: Manifest[]
}

export function ManifestViewer({ manifests }: ManifestViewerProps) {
    const [active, setActive] = useState<string>(manifests[0].filename)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar List */}
            <div className="lg:col-span-4 space-y-2">
                {manifests.map((manifest) => (
                    <button
                        key={manifest.filename}
                        onClick={() => setActive(manifest.filename)}
                        className={cn(
                            "w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between group",
                            active === manifest.filename
                                ? "bg-blue-500/10 border-blue-500/50 text-blue-400"
                                : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <FileCode className="h-4 w-4" />
                            <span className="font-mono text-sm">{manifest.filename}</span>
                        </div>
                        {active === manifest.filename && (
                            <motion.div layoutId="active-indicator" className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                    {manifests.map((manifest) => (
                        active === manifest.filename && (
                            <motion.div
                                key={manifest.filename}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-4"
                            >
                                <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                                    <h4 className="text-lg font-semibold text-white mb-2">{manifest.name}</h4>
                                    <p className="text-zinc-400 text-sm">{manifest.description}</p>
                                </div>
                                <CodeBlock language="yaml" code={manifest.code} />
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}
