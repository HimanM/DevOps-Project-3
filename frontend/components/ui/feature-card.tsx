"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface FeatureCardProps {
    title: string
    description: string
    icon: LucideIcon
    delay?: number
}

export function FeatureCard({ title, description, icon: Icon, delay = 0 }: FeatureCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors backdrop-blur-sm"
        >
            <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-zinc-400">{description}</p>
        </motion.div>
    )
}
