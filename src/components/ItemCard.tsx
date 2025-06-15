"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type ItemCardProps = {
    href: string;
    title: string;
    className?: string;
};

export default function ItemCard({ href, title, className = "" }: ItemCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={`card bg-base-200 shadow-lg cursor-pointer transition-all ${className}`}
        >
            <Link href={href} className="card-body h-full w-full flex items-center">
                <h3 className="card-title text-foreground group-hover:text-primary transition-colors">
                    {title}
                </h3>
            </Link>
        </motion.div>
    );
}
