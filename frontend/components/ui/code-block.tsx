"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
    code: string
    language?: string
}

export function CodeBlock({ code, language = "bash", className, ...props }: CodeBlockProps) {
    const [hasCopied, setHasCopied] = React.useState(false)

    const onCopy = React.useCallback(() => {
        navigator.clipboard.writeText(code)
        setHasCopied(true)
        setTimeout(() => setHasCopied(false), 2000)
    }, [code])

    return (
        <div className={cn("relative rounded-lg bg-zinc-950 p-4 font-mono text-sm text-zinc-50 border border-zinc-800", className)} {...props}>
            <div className="absolute right-4 top-4">
                <button
                    onClick={onCopy}
                    className="rounded-md p-2 hover:bg-zinc-800 transition-colors"
                    aria-label="Copy code"
                >
                    {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-zinc-400" />}
                </button>
            </div>
            <div className="overflow-x-auto pr-10">
                <pre>
                    <code className={`language-${language}`}>{code}</code>
                </pre>
            </div>
        </div>
    )
}
