'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const navLinks = [
    { href: '/people', label: 'People' },
    { href: '/planets', label: 'Planets' },
    { href: '/species', label: 'Species' },
    { href: '/films', label: 'Films' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 bg-base-100 border-b border-base-300">
            <nav className="navbar max-w-7xl mx-auto px-4">
                <div className="flex-1">
                    <Link href="/" className="text-xl font-bold tracking-wide text-primary hover:opacity-80 transition-opacity">
                        StarWars<span className="text-accent">DB</span>
                    </Link>
                </div>

                <div className="hidden md:flex gap-4">
                    {navLinks.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={clsx(
                                'btn btn-ghost btn-sm',
                                pathname.startsWith(href) && 'text-primary font-semibold'
                            )}
                        >
                            {label}
                        </Link>
                    ))}
                </div>

                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="btn btn-ghost btn-sm"
                        aria-label="Toggle menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </nav>

            {isOpen && (
                <div className="md:hidden bg-base-200 border-t border-base-300">
                    <ul className="menu p-2 space-y-1">
                        {navLinks.map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    onClick={() => setIsOpen(false)}
                                    className={clsx(
                                        'btn btn-ghost justify-start w-full',
                                        pathname.startsWith(href) && 'text-primary font-semibold'
                                    )}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}
