"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ZoomIn, Activity, GitMerge, Box, LayoutDashboard } from "lucide-react"

export function ArgoCDSetup() {
    const [selectedImage, setSelectedImage] = useState<{ src: string, title: string } | null>(null)

    return (
        <div className="space-y-16">
            {/* Visual Reference Gallery */}
            <div className="space-y-8">
                <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                    <h3 className="text-xl font-semibold text-white">Visual Reference</h3>
                    <span className="text-xs text-zinc-500 bg-zinc-900 px-2 py-1 rounded-full border border-zinc-800">Click to enlarge</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    <GalleryItem
                        src="/screenshots/argocd-sync_1.png"
                        title="Application Sync Status"
                        delay={0}
                        onClick={() => setSelectedImage({ src: "/screenshots/argocd-sync_1.png", title: "Application Sync Status" })}
                        icon={<Activity className="h-4 w-4 text-blue-400" />}
                    />
                    <GalleryItem
                        src="/screenshots/argocd-sync_2.png"
                        title="Sync Operation Details"
                        delay={0.1}
                        onClick={() => setSelectedImage({ src: "/screenshots/argocd-sync_2.png", title: "Sync Operation Details" })}
                        icon={<GitMerge className="h-4 w-4 text-green-400" />}
                    />
                    <GalleryItem
                        src="/screenshots/argocd-app-detail.png"
                        title="Application Details"
                        delay={0.2}
                        onClick={() => setSelectedImage({ src: "/screenshots/argocd-app-detail.png", title: "Application Details" })}
                        icon={<LayoutDashboard className="h-4 w-4 text-purple-400" />}
                    />
                    <GalleryItem
                        src="/screenshots/argocd-podview.png"
                        title="Pod View & Resource Map"
                        delay={0.3}
                        onClick={() => setSelectedImage({ src: "/screenshots/argocd-podview.png", title: "Pod View & Resource Map" })}
                        icon={<Box className="h-4 w-4 text-orange-400" />}
                    />
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
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 p-2 text-zinc-400 hover:text-white transition-colors"
                            >
                                <X className="h-8 w-8" />
                            </button>

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
