"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-base-200 text-foreground flex items-center justify-center px-6 py-24">
            <div className="w-full max-w-lg text-center space-y-10">
                {/* Alert icon with pulse */}
                <div className="inline-flex items-center justify-center rounded-full bg-warning/10 p-4 animate-pulse">
                    <AlertTriangle className="h-10 w-10 text-warning" />
                </div>

                {/* Big title */}
                <h1 className="text-5xl font-extrabold tracking-tight text-primary">
                    404 – Not Found
                </h1>

                {/* Subtext */}
                <p className="text-base-content/80 text-lg leading-relaxed">
                    This route is <span className="font-semibold text-accent">not in the Jedi archives</span>.
                    <br />
                    Perhaps you're searching in the wrong galaxy.
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <Link
                        href="/"
                        className="btn btn-primary gap-2 shadow-md hover:shadow-lg transition-shadow"
                    >
                        <Home className="w-4 h-4" />
                        Return Home
                    </Link>

                    <button
                        onClick={() => router.back()}
                        className="btn btn-outline text-accent gap-2 hover:border-accent hover:text-accent-focus"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                </div>
            </div>
        </main>
    );
}
