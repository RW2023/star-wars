"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type ItemCardProps = {
    href: string;
    title: string;
    className?: string;
};

export default function ItemCard({
    href,
    title,
    className = "",
}: ItemCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={`card bg-base-200 hover:shadow-xl transition-shadow duration-200 cursor-pointer ${className}`}
        >
            <Link
                href={href}
                className="card-body h-full w-full flex items-center group"
            >
                <h3 className="card-title text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    {title}
                </h3>
            </Link>
        </motion.div>
    );
}
