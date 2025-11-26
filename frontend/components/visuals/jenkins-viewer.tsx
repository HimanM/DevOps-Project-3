"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CodeBlock } from "@/components/ui/code-block"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface JenkinsFile {
    name: string
    filename: string
    description: string
    code: string
    icon: LucideIcon
}

interface JenkinsViewerProps {
    files: JenkinsFile[]
}

export function JenkinsViewer({ files }: JenkinsViewerProps) {
    const [active, setActive] = useState<string>(files[0].filename)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar List */}
            <div className="lg:col-span-4 space-y-2">
                {files.map((file) => (
                    <button
                        key={file.filename}
                        onClick={() => setActive(file.filename)}
                        className={cn(
                            "w-full text-left p-4 rounded-lg border transition-all flex items-center justify-between group",
                            active === file.filename
                                ? "bg-blue-500/10 border-blue-500/50 text-blue-400"
                                : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <file.icon className="h-5 w-5" />
                            <div>
                                <div className="font-semibold text-sm">{file.name}</div>
                                <div className="text-xs text-zinc-500 font-mono">{file.filename}</div>
                            </div>
                        </div>
                        {active === file.filename && (
                            <motion.div layoutId="active-jenkins" className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                    {files.map((file) => (
                        active === file.filename && (
                            <motion.div
                                key={file.filename}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-4"
                            >
                                <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                                    <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                                        <file.icon className="h-5 w-5 text-blue-400" />
                                        {file.name}
                                    </h4>
                                    <p className="text-zinc-400 text-sm">{file.description}</p>
                                </div>
                                <CodeBlock language="groovy" code={file.code} />
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}
