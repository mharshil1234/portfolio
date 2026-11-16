"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

export type ToastState = { type: "success" | "error"; message: string } | null;

export function Toast({ toast, onClose, duration = 4000 }: { toast: ToastState; onClose: () => void; duration?: number }) {
    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(onClose, duration);
        return () => clearTimeout(t);
    }, [toast, onClose, duration]);

    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4">
        <AnimatePresence>
            {toast && (
                <motion.div
                    role="status"
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    className={`pointer-events-auto flex items-center gap-3 rounded-full border px-6 py-3 shadow-2xl backdrop-blur-xl ${
                        toast.type === "success"
                            ? "border-emerald-400/30 bg-emerald-950/80 text-emerald-100"
                            : "border-red-400/30 bg-red-950/80 text-red-100"
                    }`}
                >
                    {toast.type === "success" ? <HiCheckCircle className="text-xl" /> : <HiXCircle className="text-xl" />}
                    <span className="text-sm font-medium">{toast.message}</span>
                </motion.div>
            )}
        </AnimatePresence>
        </div>
    );
}
