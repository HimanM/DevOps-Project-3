"use client"

import { motion } from "framer-motion"
import { SiGithub, SiJenkins, SiDocker, SiArgo, SiKubernetes } from "react-icons/si"
import { useEffect, useRef, useState } from "react"

export function WorkflowDiagram() {
    const containerRef = useRef<HTMLDivElement>(null)
    const nodeRefs = useRef<(HTMLDivElement | null)[]>([])
    const [paths, setPaths] = useState<string[]>([])

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

    const updateArrows = () => {
        if (!containerRef.current || nodeRefs.current.length < 6) return

        const containerRect = containerRef.current.getBoundingClientRect()
        const getCenter = (index: number) => {
            const node = nodeRefs.current[index]
            if (!node) return { x: 0, y: 0 }
            const rect = node.getBoundingClientRect()
            return {
                x: rect.left + rect.width / 2 - containerRect.left,
                y: rect.top + rect.height / 2 - containerRect.top
            }
        }

        const p0 = getCenter(0) // GitHub
        const p1 = getCenter(1) // Jenkins
        const p2 = getCenter(2) // DockerHub
        const p3 = getCenter(3) // GitHub Config
        const p4 = getCenter(4) // ArgoCD
        const p5 = getCenter(5) // K8s

        // Calculate paths
        const newPaths = [
            `M ${p0.x} ${p0.y} L ${p1.x} ${p1.y}`, // 1->2 Horizontal
            `M ${p1.x} ${p1.y} C ${p1.x} ${p1.y + 50}, ${p2.x} ${p2.y - 50}, ${p2.x} ${p2.y}`, // 2->3 Curved
            `M ${p2.x} ${p2.y} L ${p3.x} ${p3.y}`, // 3->4 Horizontal
            `M ${p3.x} ${p3.y} C ${p3.x} ${p3.y + 50}, ${p4.x} ${p4.y - 50}, ${p4.x} ${p4.y}`, // 4->5 Curved
            `M ${p4.x} ${p4.y} L ${p5.x} ${p5.y}`  // 5->6 Horizontal
        ]
        setPaths(newPaths)
    }

    useEffect(() => {
        updateArrows()
        window.addEventListener('resize', updateArrows)
        return () => window.removeEventListener('resize', updateArrows)
    }, [])

    return (
        <div ref={containerRef} className="w-full bg-zinc-950 rounded-xl border border-zinc-800 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto">

                {/* Row 1 */}

                {/* 1. GitHub (Code) */}
                <div ref={el => { nodeRefs.current[0] = el }} className="flex flex-col items-center gap-2 md:gap-4 relative group md:col-start-1 md:row-start-1">
                    <motion.div custom={0} variants={nodeVariants} initial="hidden" animate="visible"
                        className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg group-hover:border-white transition-colors z-10">
                        <SiGithub className="h-6 w-6 md:h-10 md:w-10 text-white" />
                    </motion.div>
                    <div className="text-center">
                        <div className="text-sm md:text-base font-bold text-white">GitHub</div>
                        <div className="text-[10px] md:text-xs text-zinc-500">Source Code</div>
                    </div>

                    {/* Desktop Arrow to Jenkins */}
                    <div className="hidden md:block absolute left-1/2 top-10 w-full h-[2px] bg-zinc-800 -z-10">
                        <motion.div variants={pathVariants} initial="hidden" animate="visible" className="h-full w-full bg-gradient-to-r from-white to-blue-500 origin-left" />
                    </div>
                </div>

                {/* 2. Jenkins */}
                <div ref={el => { nodeRefs.current[1] = el }} className="flex flex-col items-center gap-2 md:gap-4 relative group md:col-start-2 md:row-start-1">
                    <motion.div custom={1} variants={nodeVariants} initial="hidden" animate="visible"
                        className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg group-hover:border-blue-500 transition-colors z-10">
                        <SiJenkins className="h-6 w-6 md:h-10 md:w-10 text-blue-500" />
                    </motion.div>
                    <div className="text-center">
                        <div className="text-sm md:text-base font-bold text-white">Jenkins</div>
                        <div className="text-[10px] md:text-xs text-zinc-500">CI Build & Test</div>
                    </div>

                    {/* Desktop Arrow to DockerHub */}
                    <div className="hidden md:block absolute left-1/2 top-10 w-full h-[2px] bg-zinc-800 -z-10">
                        <motion.div variants={pathVariants} initial="hidden" animate="visible" className="h-full w-full bg-gradient-to-r from-blue-500 to-cyan-500 origin-left" />
                    </div>

                    {/* Desktop Arrow to GitHub (Vertical Down) */}
                    <div className="hidden md:block absolute top-20 left-1/2 w-[2px] h-32 bg-zinc-800 -z-10 -translate-x-1/2">
                        <motion.div variants={pathVariants} initial="hidden" animate="visible" className="h-full w-full bg-gradient-to-b from-blue-500 to-white origin-top" />
                    </div>
                </div>

                {/* 3. DockerHub */}
                <div ref={el => { nodeRefs.current[2] = el }} className="flex flex-col items-center gap-2 md:gap-4 relative group md:col-start-3 md:row-start-1">
                    <motion.div custom={2} variants={nodeVariants} initial="hidden" animate="visible"
                        className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg group-hover:border-cyan-500 transition-colors z-10">
                        <SiDocker className="h-6 w-6 md:h-10 md:w-10 text-cyan-500" />
                    </motion.div>
                    <div className="text-center">
                        <div className="text-sm md:text-base font-bold text-white">DockerHub</div>
                        <div className="text-[10px] md:text-xs text-zinc-500">Image Registry</div>
                    </div>
                </div>

                {/* Row 2 */}

                {/* 4. GitHub (Config) */}
                <div ref={el => { nodeRefs.current[3] = el }} className="flex flex-col items-center gap-2 md:gap-4 relative group md:col-start-2 md:row-start-2 mt-8 md:mt-0">
                    <motion.div custom={3} variants={nodeVariants} initial="hidden" animate="visible"
                        className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg group-hover:border-white transition-colors z-10">
                        <SiGithub className="h-6 w-6 md:h-10 md:w-10 text-white" />
                    </motion.div>
                    <div className="text-center">
                        <div className="text-sm md:text-base font-bold text-white">GitHub</div>
                        <div className="text-[10px] md:text-xs text-zinc-500">Config Repo</div>
                    </div>

                    {/* Desktop Arrow to ArgoCD */}
                    <div className="hidden md:block absolute left-1/2 top-10 w-full h-[2px] bg-zinc-800 -z-10">
                        <motion.div variants={pathVariants} initial="hidden" animate="visible" className="h-full w-full bg-gradient-to-r from-white to-orange-500 origin-left" />
                    </div>
                </div>

                {/* 5. ArgoCD */}
                <div ref={el => { nodeRefs.current[4] = el }} className="flex flex-col items-center gap-2 md:gap-4 relative group md:col-start-3 md:row-start-2 mt-8 md:mt-0">
                    <motion.div custom={4} variants={nodeVariants} initial="hidden" animate="visible"
                        className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg group-hover:border-orange-500 transition-colors z-10">
                        <SiArgo className="h-6 w-6 md:h-10 md:w-10 text-orange-500" />
                    </motion.div>
                    <div className="text-center">
                        <div className="text-sm md:text-base font-bold text-white">ArgoCD</div>
                        <div className="text-[10px] md:text-xs text-zinc-500">GitOps Sync</div>
                    </div>

                    {/* Desktop Arrow to K8s */}
                    <div className="hidden md:block absolute left-1/2 top-10 w-full h-[2px] bg-zinc-800 -z-10">
                        <motion.div variants={pathVariants} initial="hidden" animate="visible" className="h-full w-full bg-gradient-to-r from-orange-500 to-blue-400 origin-left" />
                    </div>
                </div>

                {/* 6. Kubernetes */}
                <div ref={el => { nodeRefs.current[5] = el }} className="flex flex-col items-center gap-2 md:gap-4 relative group md:col-start-4 md:row-start-2 mt-8 md:mt-0">
                    <motion.div custom={5} variants={nodeVariants} initial="hidden" animate="visible"
                        className="h-16 w-16 md:h-20 md:w-20 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-lg group-hover:border-blue-400 transition-colors z-10">
                        <SiKubernetes className="h-6 w-6 md:h-10 md:w-10 text-blue-400" />
                    </motion.div>
                    <div className="text-center">
                        <div className="text-sm md:text-base font-bold text-white">Kubernetes</div>
                        <div className="text-[10px] md:text-xs text-zinc-500">Production</div>
                    </div>
                </div>
            </div>

            {/* Mobile Flow Indicators (Dynamic SVG Overlay) */}
            <div className="md:hidden absolute inset-0 pointer-events-none z-0">
                <svg className="w-full h-full">
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

                    {paths.map((d, i) => (
                        <motion.path
                            key={i}
                            d={d}
                            stroke={`url(#grad${i + 1})`}
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                        />
                    ))}
                </svg>
            </div>
        </div>
    )
}
