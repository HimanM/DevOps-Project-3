"use client"

import { motion } from "framer-motion"
import { SiGithub, SiJenkins, SiDocker, SiArgo, SiKubernetes } from "react-icons/si"

export function WorkflowDiagram() {
    const pathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 1.5,
                ease: "easeInOut" as any,
                repeat: Infinity,
                repeatType: "loop" as const,
                repeatDelay: 0.5
            }
        }
    }

    const nodeVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: (i: number) => ({
            scale: 1,
            opacity: 1,
            transition: { delay: i * 0.2, duration: 0.5 }
        })
    }

    return (
        <div className="w-full bg-zinc-950 rounded-xl border border-zinc-800 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 max-w-5xl mx-auto">

                {/* 1. GitHub (Code) */}
                <div className="flex flex-col items-center gap-4 relative group">
                    <motion.div custom={0} variants={nodeVariants} initial="hidden" animate="visible"
                        className="h-20 w-20 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg group-hover:border-white transition-colors">
                        <SiGithub className="h-10 w-10 text-white" />
                    </motion.div>
                    <div className="text-center">
                        <div className="font-bold text-white">GitHub</div>
                        <div className="text-xs text-zinc-500">Source Code</div>
                    </div>

                    {/* Arrow to Jenkins */}
                    <div className="hidden md:block absolute left-full top-10 w-full h-[2px] bg-zinc-800 -z-10 translate-x-4">
                        <motion.div variants={pathVariants} initial="hidden" animate="visible" className="h-full w-full bg-gradient-to-r from-white to-blue-500 origin-left" />
                    </div>
                </div>

                {/* 2. Jenkins */}
                <div className="flex flex-col items-center gap-4 relative group">
                    <motion.div custom={1} variants={nodeVariants} initial="hidden" animate="visible"
                        className="h-20 w-20 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg group-hover:border-blue-500 transition-colors">
                        <SiJenkins className="h-10 w-10 text-blue-500" />
                    </motion.div>
                    <div className="text-center">
                        <div className="font-bold text-white">Jenkins</div>
                        <div className="text-xs text-zinc-500">CI Build & Test</div>
                    </div>

                    {/* Arrow to DockerHub */}
                    <div className="hidden md:block absolute left-full top-10 w-full h-[2px] bg-zinc-800 -z-10 translate-x-4">
                        <motion.div variants={pathVariants} initial="hidden" animate="visible" className="h-full w-full bg-gradient-to-r from-blue-500 to-cyan-500 origin-left" />
                    </div>
                </div>

                {/* 3. DockerHub */}
                <div className="flex flex-col items-center gap-4 relative group">
                    <motion.div custom={2} variants={nodeVariants} initial="hidden" animate="visible"
                        className="h-20 w-20 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg group-hover:border-cyan-500 transition-colors">
                        <SiDocker className="h-10 w-10 text-cyan-500" />
                    </motion.div>
                    <div className="text-center">
                        <div className="font-bold text-white">DockerHub</div>
                        <div className="text-xs text-zinc-500">Image Registry</div>
                    </div>

                    {/* Arrow to GitHub Config (Curved down and back) */}
                    {/* Simplified for linear flow representation in this view, but conceptually circular */}
                    <div className="hidden md:block absolute left-full top-10 w-full h-[2px] bg-zinc-800 -z-10 translate-x-4">
                        <motion.div variants={pathVariants} initial="hidden" animate="visible" className="h-full w-full bg-gradient-to-r from-cyan-500 to-orange-500 origin-left" />
                    </div>
                </div>

                {/* 4. ArgoCD */}
                <div className="flex flex-col items-center gap-4 relative group">
                    <motion.div custom={3} variants={nodeVariants} initial="hidden" animate="visible"
                        className="h-20 w-20 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg group-hover:border-orange-500 transition-colors">
                        <SiArgo className="h-10 w-10 text-orange-500" />
                    </motion.div>
                    <div className="text-center">
                        <div className="font-bold text-white">ArgoCD</div>
                        <div className="text-xs text-zinc-500">GitOps Sync</div>
                    </div>

                    {/* Arrow to K8s */}
                    <div className="hidden md:block absolute left-full top-10 w-full h-[2px] bg-zinc-800 -z-10 translate-x-4">
                        <motion.div variants={pathVariants} initial="hidden" animate="visible" className="h-full w-full bg-gradient-to-r from-orange-500 to-blue-400 origin-left" />
                    </div>
                </div>

                {/* 5. Kubernetes */}
                <div className="flex flex-col items-center gap-4 relative group">
                    <motion.div custom={4} variants={nodeVariants} initial="hidden" animate="visible"
                        className="h-20 w-20 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg group-hover:border-blue-400 transition-colors">
                        <SiKubernetes className="h-10 w-10 text-blue-400" />
                    </motion.div>
                    <div className="text-center">
                        <div className="font-bold text-white">Kubernetes</div>
                        <div className="text-xs text-zinc-500">Production</div>
                    </div>
                </div>
            </div>

            {/* Mobile Flow Indicators (Vertical) */}
            <div className="md:hidden absolute left-1/2 top-0 bottom-0 w-[2px] bg-zinc-800 -z-10 -translate-x-1/2" />
        </div>
    )
}
