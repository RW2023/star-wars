import Link from "next/link";
import { Globe } from "lucide-react";
import type { Planet } from "@/lib/types";

interface PlanetCardProps {
    planet: Planet;
}

export function PlanetCard({ planet }: PlanetCardProps) {
    return (
        <li className="relative group overflow-hidden rounded-xl border border-accent/40 bg-background shadow-md transition-shadow hover:shadow-primary/40">
            {/* Hover glow overlay */}
            <span
                className="absolute inset-0 -z-10 scale-110 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                aria-hidden="true"
            />
            <div className="p-6 space-y-3">
                <h2 className="text-lg font-semibold text-primary glow-title">
                    {planet.name}
                </h2>

                <p className="text-sm">
                    <span className="font-medium text-foreground">Climate:</span>{" "}
                    <span className="text-secondary">{planet.climate}</span>
                </p>

                <p className="text-sm">
                    <span className="font-medium text-foreground">Population:</span>{" "}
                    <span className="text-secondary">{planet.population}</span>
                </p>

                <div className="pt-4">
                    <Link
                        href={`/planets/${encodeURIComponent(planet.name)}`}
                        className="btn btn-sm border-primary text-primary transition-colors hover:bg-primary hover:text-background"
                    >
                        View Details
                        <Globe className="ml-2 h-4 w-4 shrink-0" />
                    </Link>
                </div>
            </div>
        </li>
    );
}
