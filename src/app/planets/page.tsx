//src/app/planets/page.tsx

import Link from "next/link";
import { getAllPlanets } from "@/lib/api";
import { Globe } from "lucide-react";


export default async function PlanetsPage() {
    const planets = await getAllPlanets();

    return (
        <main className="max-w-6xl mx-auto px-4 py-10 space-y-6">
            <h1 className="text-4xl font-bold text-center">Explore Planets</h1>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {planets.map((planet) => (
                    <div key={planet.name} className="card bg-base-100 shadow-xl border border-base-300">
                        <div className="card-body">
                            <h2 className="card-title">{planet.name}</h2>
                            <p><strong>Climate:</strong> {planet.climate}</p>
                            <p><strong>Population:</strong> {planet.population}</p>
                            <div className="card-actions justify-end mt-4">
                                <Link
                                    href={`/planets/${encodeURIComponent(planet.name)}`}
                                    className="btn btn-sm btn-outline"
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
