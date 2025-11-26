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

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">

                {/* Row 1 */}

                {/* 1. GitHub (Code) */}
                <div className="flex flex-col items-center gap-4 relative group md:col-start-1 md:row-start-1">
                    <motion.div custom={0} variants={nodeVariants} initial="hidden" animate="visible"
                        className="h-20 w-20 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg group-hover:border-white transition-colors z-10">
                        <SiGithub className="h-10 w-10 text-white" />
                    </motion.div>
                    <div className="text-center">
                        <div className="font-bold text-white">GitHub</div>
                        <div className="text-xs text-zinc-500">Source Code</div>
                    </div>

                    {/* Arrow to Jenkins */}
                    <div className="hidden md:block absolute left-1/2 top-10 w-full h-[2px] bg-zinc-800 -z-10">
                        <motion.div variants={pathVariants} initial="hidden" animate="visible" className="h-full w-full bg-gradient-to-r from-white to-blue-500 origin-left" />
                    </div>
                </div>

                {/* 2. Jenkins */}
                <div className="flex flex-col items-center gap-4 relative group md:col-start-2 md:row-start-1">
                    <motion.div custom={1} variants={nodeVariants} initial="hidden" animate="visible"
                        className="h-20 w-20 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg group-hover:border-blue-500 transition-colors z-10">
                        <SiJenkins className="h-10 w-10 text-blue-500" />
                    </motion.div>
                    <div className="text-center">
                        <div className="font-bold text-white">Jenkins</div>
                        <div className="text-xs text-zinc-500">CI Build & Test</div>
                    </div>

                    {/* Arrow to DockerHub */}
                    <div className="hidden md:block absolute left-1/2 top-10 w-full h-[2px] bg-zinc-800 -z-10">
                        <motion.div variants={pathVariants} initial="hidden" animate="visible" className="h-full w-full bg-gradient-to-r from-blue-500 to-cyan-500 origin-left" />
                    </div>

                    {/* Arrow to GitHub (Vertical Down) */}
                    <div className="hidden md:block absolute top-20 left-1/2 w-[2px] h-32 bg-zinc-800 -z-10 -translate-x-1/2">
                        <motion.div variants={pathVariants} initial="hidden" animate="visible" className="h-full w-full bg-gradient-to-b from-blue-500 to-white origin-top" />
                    </div>
                </div>

                {/* 3. DockerHub */}
                <div className="flex flex-col items-center gap-4 relative group md:col-start-3 md:row-start-1">
                    <motion.div custom={2} variants={nodeVariants} initial="hidden" animate="visible"
                        className="h-20 w-20 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg group-hover:border-cyan-500 transition-colors z-10">
                        <SiDocker className="h-10 w-10 text-cyan-500" />
                    </motion.div>
                    <div className="text-center">
                        <div className="font-bold text-white">DockerHub</div>
                        <div className="text-xs text-zinc-500">Image Registry</div>
                    </div>
                </div>

                {/* Row 2 */}

                {/* 4. GitHub (Config) */}
                <div className="flex flex-col items-center gap-4 relative group md:col-start-2 md:row-start-2 mt-8 md:mt-0">
                    <motion.div custom={3} variants={nodeVariants} initial="hidden" animate="visible"
                        className="h-20 w-20 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg group-hover:border-white transition-colors z-10">
                        <SiGithub className="h-10 w-10 text-white" />
                    </motion.div>
                    <div className="text-center">
                        <div className="font-bold text-white">GitHub</div>
                        <div className="text-xs text-zinc-500">Config Repo</div>
                    </div>

                    {/* Arrow to ArgoCD */}
                    <div className="hidden md:block absolute left-1/2 top-10 w-full h-[2px] bg-zinc-800 -z-10">
                        <motion.div variants={pathVariants} initial="hidden" animate="visible" className="h-full w-full bg-gradient-to-r from-white to-orange-500 origin-left" />
                    </div>
                </div>

                {/* 5. ArgoCD */}
                <div className="flex flex-col items-center gap-4 relative group md:col-start-3 md:row-start-2 mt-8 md:mt-0">
                    <motion.div custom={4} variants={nodeVariants} initial="hidden" animate="visible"
                        className="h-20 w-20 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg group-hover:border-orange-500 transition-colors z-10">
                        <SiArgo className="h-10 w-10 text-orange-500" />
                    </motion.div>
                    <div className="text-center">
                        <div className="font-bold text-white">ArgoCD</div>
                        <div className="text-xs text-zinc-500">GitOps Sync</div>
                    </div>

                    {/* Arrow to K8s */}
                    <div className="hidden md:block absolute left-1/2 top-10 w-full h-[2px] bg-zinc-800 -z-10">
                        <motion.div variants={pathVariants} initial="hidden" animate="visible" className="h-full w-full bg-gradient-to-r from-orange-500 to-blue-400 origin-left" />
                    </div>
                </div>

                {/* 6. Kubernetes */}
                <div className="flex flex-col items-center gap-4 relative group md:col-start-4 md:row-start-2 mt-8 md:mt-0">
                    <motion.div custom={5} variants={nodeVariants} initial="hidden" animate="visible"
                        className="h-20 w-20 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg group-hover:border-blue-400 transition-colors z-10">
                        <SiKubernetes className="h-10 w-10 text-blue-400" />
                    </motion.div>
                    <div className="text-center">
                        <div className="font-bold text-white">Kubernetes</div>
                        <div className="text-xs text-zinc-500">Production</div>
                    </div>
                </div>
            </div>

            {/* Mobile Flow Indicators (SVG Overlay) */}
            <div className="md:hidden absolute inset-0 pointer-events-none z-0">
                <svg className="w-full h-full" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                        </linearGradient>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                        </linearGradient>
                        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 1 }} />
                        </linearGradient>
                        <linearGradient id="grad4" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
                        </linearGradient>
                        <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>

                    {/* 1->2 Horizontal */}
                    <motion.path d="M 25% 40px H 75%" stroke="url(#grad1)" strokeWidth="2" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, repeat: Infinity }} />

                    {/* 2->3 Z-Shape */}
                    <motion.path d="M 75% 80px V 120px H 25% V 160px" stroke="url(#grad2)" strokeWidth="2" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />

                    {/* 3->4 Horizontal */}
                    <motion.path d="M 25% 200px H 75%" stroke="url(#grad3)" strokeWidth="2" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.0 }} />

                    {/* 4->5 Z-Shape */}
                    <motion.path d="M 75% 240px V 280px H 25% V 320px" stroke="url(#grad4)" strokeWidth="2" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, repeat: Infinity, delay: 1.5 }} />

                    {/* 5->6 Horizontal */}
                    <motion.path d="M 25% 360px H 75%" stroke="url(#grad5)" strokeWidth="2" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, repeat: Infinity, delay: 2.0 }} />
                </svg>
            </div>
        </div>
    )
}
