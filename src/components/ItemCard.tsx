"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ItemCard({ href, title }: { href: string; title: string }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="card bg-base-200 shadow-lg cursor-pointer"
        >
            <Link href={href} className="card-body">
                <h3 className="card-title">{title}</h3>
            </Link>
        </motion.div>
    );
}