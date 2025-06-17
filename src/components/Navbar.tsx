'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const navItems = [
    { name: 'People', href: '/people' },
    { name: 'Planets', href: '/planets' },
    { name: 'Species', href: '/species' },
    { name: 'Films', href: '/films' },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const firstLinkRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        if (mobileOpen) firstLinkRef.current?.focus();
    }, [mobileOpen]);

    return (
        <nav
            className="sticky top-0 z-50 shadow-sm border-b transition-colors duration-300"
            style={{
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
                borderColor: 'rgba(0,0,0,0.1)',
            }}
            aria-label="Main navigation"
        >
            {/* ─── Top bar ───────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo.png"
                        alt="SWAPI Explorer logo"
                        width={40}
                        height={40}
                        className="h-10 w-10 object-contain rounded-full"
                    />
                    <span className="font-bold text-xl">SWAPI Explorer</span>
                </Link>

                {/* desktop nav */}
                <div className="hidden lg:flex items-center space-x-6">
                    {navItems.map(({ name, href }) => (
                        <Link
                            key={name}
                            href={href}
                            className="font-medium hover:underline transition"
                            style={{ color: 'var(--foreground)' }}
                        >
                            {name}
                        </Link>
                    ))}
                    <ThemeToggle />
                </div>

                {/* mobile toggle button */}
                <button
                    type="button"
                    onClick={() => setMobileOpen((p) => !p)}
                    className="lg:hidden p-2"
                    aria-label="Toggle menu"
                    aria-expanded={mobileOpen ? 'true' : 'false'}
                    aria-controls="mobile-menu"
                >
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* ─── Mobile dropdown ───────────────────── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="lg:hidden border-t"
                        style={{
                            backgroundColor: 'var(--background)',
                            color: 'var(--foreground)',
                            borderColor: 'rgba(0,0,0,0.1)',
                        }}
                        role="menu"
                        aria-label="Mobile navigation"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navItems.map(({ name, href }, i) => (
                                <Link
                                    key={name}
                                    href={href}
                                    ref={i === 0 ? firstLinkRef : undefined}
                                    onClick={() => setMobileOpen(false)}
                                    className="block text-lg font-medium hover:underline transition"
                                    role="menuitem"
                                >
                                    {name}
                                </Link>
                            ))}
                            <ThemeToggle />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
