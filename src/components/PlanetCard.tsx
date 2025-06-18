import Link from "next/link";
import { Globe } from "lucide-react";
import type { Planet } from "@/lib/types";

interface PlanetCardProps {
    planet: Planet;
}

export function PlanetCard({ planet }: PlanetCardProps) {
    return (
        <li className="relative group overflow-hidden rounded-xl border border-[var(--color-accent)]/40 bg-[var(--color-background)] shadow-md transition-shadow hover:shadow-[0_0_16px_var(--color-primary)]/40">
            {/* Hover glow overlay */}
            <span
                className="absolute inset-0 -z-10 scale-110 bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-[var(--color-accent)]/10 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                aria-hidden="true"
            />

            <div className="p-6 space-y-3 text-[var(--color-foreground)]">
                <h2 className="text-lg font-semibold text-[var(--color-primary-soft)] glow-title">
                    {planet.name}
                </h2>

                <p className="text-sm">
                    <span className="font-medium text-[var(--color-foreground)]">Climate:</span>{" "}
                    <span className="text-[var(--color-secondary)]">{planet.climate}</span>
                </p>

                <p className="text-sm">
                    <span className="font-medium text-[var(--color-foreground)]">Population:</span>{" "}
                    <span className="text-[var(--color-secondary)]">{planet.population}</span>
                </p>

                <div className="pt-4">
                    <Link
                        href={`/planets/${encodeURIComponent(planet.name)}`}
                        className="btn btn-sm border-[var(--color-primary)] text-[var(--color-primary-soft)] transition-colors hover:bg-[var(--color-primary)] hover:text-black dark:hover:text-[var(--color-background)]"
                    >
                        View Details
                        <Globe className="ml-2 h-4 w-4 shrink-0" />
                    </Link>
                </div>
            </div>
        </li>
    );
}
