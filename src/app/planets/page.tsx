import Link from "next/link";
import { getAllPlanets } from "@/lib/api";
import { Globe } from "lucide-react";

export const metadata = { title: "Explore Planets · Star-Wars Visualizer" };

export default async function PlanetsPage() {
    const planets = await getAllPlanets();

    return (
        <main className="max-w-6xl mx-auto px-4 py-14 space-y-10">
            {/* Heading */}
            <h1 className="text-4xl font-extrabold tracking-widest text-primary drop-shadow-[0_0_10px_var(--color-primary)]">
                Explore&nbsp;Planets
            </h1>

            {/* Responsive card grid */}
            <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {planets.map((planet) => (
                    <li
                        key={planet.name}
                        className="
              group overflow-hidden rounded-xl
              border border-accent/40 bg-background
              shadow transition-shadow hover:shadow-primary/40"
                    >
                        {/* Decorative hover glow */}
                        <span className="
              absolute inset-0 -z-10
              scale-110 bg-gradient-to-br from-primary/5 via-transparent to-accent/5
              opacity-0 transition-all duration-300
              group-hover:scale-100 group-hover:opacity-100" />

                        <div className="p-6 space-y-3">
                            <h2 className="text-lg font-semibold text-primary">
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
                                    className="
                    btn btn-sm border-primary text-primary
                    transition-colors hover:bg-primary
                    hover:text-background"
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
