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
            className="p-4 md:p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors backdrop-blur-sm"
        >
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3 md:mb-4">
                <Icon className="h-5 w-5 md:h-6 md:w-6 text-blue-400" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-1 md:mb-2">{title}</h3>
            <p className="text-sm md:text-base text-zinc-400">{description}</p>
        </motion.div>
    )
}
