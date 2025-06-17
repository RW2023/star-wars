import Link from "next/link";
import { getAllPlanets } from "@/lib/api";
import { Globe } from "lucide-react";

export const metadata = { title: "Explore Planets · Star-Wars Visualizer" };

export default async function PlanetsPage() {
    const planets = await getAllPlanets();

    return (
        <main className="max-w-6xl mx-auto px-4 py-14 space-y-10 text-[var(--color-foreground)]">
            {/* Heading */}
            <h1 className="text-4xl font-extrabold tracking-widest text-primary drop-shadow-[0_0_10px_var(--color-primary)]">
                Explore&nbsp;Planets
            </h1>

            {/* Responsive card grid */}
            <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {planets.map((planet) => (
                    <li
                        key={planet.name}
                        className="relative group overflow-hidden rounded-xl border border-[var(--color-accent)]/40 bg-[var(--color-background)]
                       shadow-md transition-shadow hover:shadow-[0_0_20px_var(--color-primary)]/40"
                    >
                        {/* Hover glow effect */}
                        <span
                            className="absolute inset-0 -z-10 scale-110 bg-gradient-to-br
                         from-[var(--color-primary)]/10 via-transparent to-[var(--color-accent)]/10
                         opacity-0 transition-all duration-300
                         group-hover:scale-100 group-hover:opacity-100"
                            aria-hidden="true"
                        />

                        <div className="p-6 space-y-3">
                            <h2 className="text-lg font-semibold text-[var(--color-primary)] glow-title">
                                {planet.name}
                            </h2>

                            <p className="text-sm">
                                <span className="font-medium text-[var(--color-foreground)]">
                                    Climate:
                                </span>{" "}
                                <span className="text-[var(--color-secondary)]">{planet.climate}</span>
                            </p>

                            <p className="text-sm">
                                <span className="font-medium text-[var(--color-foreground)]">
                                    Population:
                                </span>{" "}
                                <span className="text-[var(--color-secondary)]">{planet.population}</span>
                            </p>

                            <div className="pt-4">
                                <Link
                                    href={`/planets/${encodeURIComponent(planet.name)}`}
                                    className="btn btn-sm border-[var(--color-primary)] text-[var(--color-primary)]
                             transition-colors hover:bg-[var(--color-primary)]
                             hover:text-black dark:hover:text-[var(--color-background)]"
                                >
                                    View Details
                                    <Globe className="ml-2 h-4 w-4 shrink-0" />
                                </Link>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
}
