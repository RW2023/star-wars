// app/not-found.tsx

import Link from "next/link";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-base-200 text-base-content px-4">
            <div className="max-w-md text-center space-y-8">
                {/* Lucide warning icon */}
                <AlertTriangle className="mx-auto h-16 w-16 text-warning" />

                {/* Headline */}
                <h1 className="text-5xl font-bold tracking-tight">
                    404 – Page Not Found
                </h1>

                {/* Theme-flavoured copy */}
                <p className="text-lg leading-relaxed">
                    Uh-oh! This route is<strong> not in the Jedi archives</strong>.
                    <br />The Force suggests returning to safer coordinates.
                </p>

                {/* CTA buttons */}
                <div className="flex flex-wrap justify-center gap-3">
                    <Link
                        href="/"
                        className="btn btn-primary gap-2"
                    >
                        <Home className="h-4 w-4" />
                        Take me home
                    </Link>

                    <Link
                        href="/people"
                        className="btn btn-outline gap-2"
                    >
                        Explore Characters
                    </Link>
                </div>
            </div>
        </main>
    );
}
