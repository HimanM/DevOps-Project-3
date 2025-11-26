"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Shield, Settings, Play, Key, GitBranch, Server, X, ZoomIn, Lock, Hammer, Rocket, LayoutDashboard } from "lucide-react"

export function JenkinsSetup() {
    const [selectedImage, setSelectedImage] = useState<{ src: string, title: string } | null>(null)

    return (
        <div className="space-y-16">
            {/* Instructions Section (Text Only) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6 md:space-y-8"
                >
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <Key className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-white">1. Configure Credentials</h3>
                    </div>

                    <div className="space-y-4 md:space-y-6 pl-4 border-l-2 border-zinc-800">
                        <div className="space-y-2">
                            <h4 className="text-sm md:text-base font-medium text-zinc-200 flex items-center gap-2">
                                <span className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-zinc-800 text-[10px] md:text-xs flex items-center justify-center">A</span>
                                DockerHub
                            </h4>
                            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                                Go to <strong>Manage Jenkins &gt; Credentials</strong>. Add a new "Username with password" credential.
                                <br />
                                <span className="text-zinc-500">ID:</span> <code className="text-blue-400 bg-blue-500/10 px-1 rounded">dockerhub-username</code>
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-sm md:text-base font-medium text-zinc-200 flex items-center gap-2">
                                <span className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-zinc-800 text-[10px] md:text-xs flex items-center justify-center">B</span>
                                GitHub Token
                            </h4>
                            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                                Add a new "Secret text" credential for your Personal Access Token (PAT).
                                <br />
                                <span className="text-zinc-500">ID:</span> <code className="text-blue-400 bg-blue-500/10 px-1 rounded">github-token</code>
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6 md:space-y-8"
                >
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <Settings className="h-4 w-4 md:h-5 md:w-5 text-purple-400" />
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-white">2. Create Pipelines</h3>
                    </div>

                    <div className="space-y-4 md:space-y-6 pl-4 border-l-2 border-zinc-800">
                        <div className="space-y-2">
                            <h4 className="text-sm md:text-base font-medium text-zinc-200 flex items-center gap-2">
                                <span className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-zinc-800 text-[10px] md:text-xs flex items-center justify-center">A</span>
                                CI Pipeline
                            </h4>
                            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                                Create a Pipeline job named <code className="text-purple-400 bg-purple-500/10 px-1 rounded">DevOps-Project-3</code>.
                                <br />
                                <span className="text-zinc-500">Script Path:</span> <code className="text-zinc-300">Jenkinsfile</code>
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-sm md:text-base font-medium text-zinc-200 flex items-center gap-2">
                                <span className="h-5 w-5 md:h-6 md:w-6 rounded-full bg-zinc-800 text-[10px] md:text-xs flex items-center justify-center">B</span>
                                CD Pipeline
                            </h4>
                            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                                Create a Pipeline job named <code className="text-purple-400 bg-purple-500/10 px-1 rounded">DevOps-Deploy</code>.
                                <br />
                                <span className="text-zinc-500">Script Path:</span> <code className="text-zinc-300">Jenkinsfile.deploy</code>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Visual Reference Gallery */}
            <div className="space-y-8">
                <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                    <h3 className="text-xl font-semibold text-white">Visual Reference</h3>
                    <span className="text-xs text-zinc-500 bg-zinc-900 px-2 py-1 rounded-full border border-zinc-800">Click to enlarge</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    <GalleryItem
                        src="/screenshots/jenkins_dockerhub_credentials_config.png"
                        title="DockerHub Credentials"
                        delay={0}
                        onClick={() => setSelectedImage({ src: "/screenshots/jenkins_dockerhub_credentials_config.png", title: "DockerHub Credentials" })}
                        icon={<Lock className="h-4 w-4 text-blue-400" />}
                    />
                    <GalleryItem
                        src="/screenshots/jenkins_github_token_credentials_config.png"
                        title="GitHub Token"
                        delay={0.1}
                        onClick={() => setSelectedImage({ src: "/screenshots/jenkins_github_token_credentials_config.png", title: "GitHub Token" })}
                        icon={<Key className="h-4 w-4 text-yellow-400" />}
                    />
                    <GalleryItem
                        src="/screenshots/jenkins_ci_pipeline.png"
                        title="CI Pipeline"
                        delay={0.2}
                        onClick={() => setSelectedImage({ src: "/screenshots/jenkins_ci_pipeline.png", title: "CI Pipeline Configuration" })}
                        icon={<Hammer className="h-4 w-4 text-purple-400" />}
                    />
                    <GalleryItem
                        src="/screenshots/jenkins_devops_deploy_pipeline.png"
                        title="CD Pipeline"
                        delay={0.3}
                        onClick={() => setSelectedImage({ src: "/screenshots/jenkins_devops_deploy_pipeline.png", title: "CD Pipeline Configuration" })}
                        icon={<Rocket className="h-4 w-4 text-green-400" />}
                    />
                    <div className="md:col-span-2 lg:col-span-2">
                        <GalleryItem
                            src="/screenshots/jenkins_project_3_pipelines_overview.png"
                            title="Pipelines Dashboard"
                            delay={0.4}
                            onClick={() => setSelectedImage({ src: "/screenshots/jenkins_project_3_pipelines_overview.png", title: "Pipelines Dashboard" })}
                            icon={<LayoutDashboard className="h-4 w-4 text-orange-400" />}
                        />
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-7xl w-full max-h-[90vh] flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute -top-12 right-0 flex items-center gap-4">
                                <a
                                    href={selectedImage.src}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-zinc-400 hover:text-white transition-colors"
                                    title="Open original"
                                >
                                    <ZoomIn className="h-6 w-6" />
                                </a>
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="p-2 text-zinc-400 hover:text-white transition-colors"
                                >
                                    <X className="h-8 w-8" />
                                </button>
                            </div>

                            <div className="relative w-full h-[80vh] rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl">
                                <Image
                                    src={selectedImage.src}
                                    alt={selectedImage.title}
                                    fill
                                    className="object-contain"
                                    quality={100}
                                />
                            </div>

                            <div className="mt-4 text-center">
                                <h3 className="text-xl font-semibold text-white">{selectedImage.title}</h3>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function GalleryItem({ src, title, delay, onClick, icon }: { src: string, title: string, delay: number, onClick: () => void, icon?: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            onClick={onClick}
            className="group space-y-3 cursor-pointer"
        >
            <div className="relative aspect-video rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors z-10 flex items-center justify-center">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 group-hover:scale-100 duration-300" />
                </div>
                <Image
                    src={src}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className="flex items-center justify-center gap-2">
                {icon}
                <p className="text-xs text-center text-zinc-500 font-medium group-hover:text-zinc-300 transition-colors">{title}</p>
            </div>
        </motion.div>
    )
}
