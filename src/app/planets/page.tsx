import Link from "next/link";
import { getAllPlanets } from "@/lib/api";
import { Globe } from "lucide-react";

export default async function PlanetsPage() {
    const planets = await getAllPlanets();

    return (
        <main className="max-w-6xl mx-auto px-4 py-10 space-y-8 text-foreground">
            <h1 className="text-4xl font-bold text-center text-primary">Explore Planets</h1>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {planets.map((planet) => (
                    <div
                        key={planet.name}
                        className="card bg-background text-foreground border border-accent/40 shadow-lg hover:shadow-primary/40 transition-shadow"
                    >
                        <div className="card-body">
                            <h2 className="card-title text-primary">{planet.name}</h2>

                            <p>
                                <span className="font-medium text-foreground">Climate:</span>{" "}
                                <span className="text-secondary">{planet.climate}</span>
                            </p>

                            <p>
                                <span className="font-medium text-foreground">Population:</span>{" "}
                                <span className="text-secondary">{planet.population}</span>
                            </p>

                            <div className="card-actions justify-end mt-4">
                                <Link
                                    href={`/planets/${encodeURIComponent(planet.name)}`}
                                    className="btn btn-sm border-primary text-primary hover:bg-primary hover:text-background"
                                >
                                    View Details <Globe className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
