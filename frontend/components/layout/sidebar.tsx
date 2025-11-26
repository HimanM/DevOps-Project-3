"use client"

import { motion } from "framer-motion"
import { LayoutDashboard, Server, GitBranch, Box, Settings, Menu, X, Infinity as InfinityIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"

const menuItems = [
    { icon: LayoutDashboard, label: "Overview", href: "#overview" },
    { icon: Box, label: "Architecture", href: "#architecture" },
    { icon: Server, label: "Kubernetes", href: "#kubernetes" },
    { icon: Settings, label: "Jenkins CI", href: "#jenkins" },
    { icon: GitBranch, label: "ArgoCD GitOps", href: "#argocd" },
]

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-zinc-900 text-white md:hidden"
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            {/* Sidebar */}
            <motion.div
                className={cn(
                    "fixed top-0 left-0 h-full w-64 bg-zinc-950 border-r border-zinc-800 z-40 p-6",
                    "transform transition-transform duration-300 ease-in-out md:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex items-center gap-3 mb-10">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                        <InfinityIcon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-xl text-white">DevOps</span>
                        <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Project 3 By HimanM</span>
                    </div>
                </div>

                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-6 left-6 right-6">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                        <h4 className="text-sm font-semibold text-blue-400 mb-1">Status</h4>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs text-zinc-400">System Operational</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                />
            )}
        </>
    )
}
