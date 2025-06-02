"use client";

import { motion } from "motion/react";
import { FiLoader } from "react-icons/fi";

export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
                }}
                style={{ display: "inline-block" }}
            >
                <FiLoader className="h-12 w-12 text-primary" />
            </motion.div>
        </div>
    );
}