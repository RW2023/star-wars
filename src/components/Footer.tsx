import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';

/**
 * Footer component for the SWAPI Explorer app
 *
 * - Responsive layout: stacked on mobile, horizontal on medium+
 * - Uses DaisyUI/Tailwind for consistent theming
 * - Includes navigation links and social icons
 */
export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-base-200 text-base-content py-8 px-4">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                {/* Copyright */}
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <p className="text-sm opacity-70">© {year} SWAPI Explorer. All rights reserved.</p>
                </div>

                {/* Navigation Links */}
                <nav className="flex space-x-4 mb-4 md:mb-0">
                    <Link href="/" className="hover:opacity-80 transition-opacity">Home</Link>
                    <Link href="/planets" className="hover:opacity-80 transition-opacity">Planets</Link>
                    <Link href="/species" className="hover:opacity-80 transition-opacity">Species</Link>
                    <Link href="/films" className="hover:opacity-80 transition-opacity">Films</Link>
                </nav>

                {/* Social Icons */}
                <div className="flex space-x-4">
                    <Link
                        href="https://github.com/your-username/star-wars-explorer"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub repository"
                        className="hover:opacity-80 transition-opacity"
                    >
                        <Github className="w-5 h-5" />
                    </Link>
                    <Link
                        href="https://twitter.com/your-handle"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter profile"
                        className="hover:opacity-80 transition-opacity"
                    >
                        <Twitter className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
