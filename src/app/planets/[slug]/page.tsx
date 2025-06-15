import { getPlanetByName } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function PlanetDetailPage({
    params,
}: {
    params: { slug: string };
}) {
    const name = decodeURIComponent(params.slug);
    const planet = await getPlanetByName(name);

    if (!planet) return notFound();

    return (
        <main className="max-w-3xl mx-auto px-4 py-10 space-y-8 text-foreground">
            {/* Back link */}
            <Link
                href="/planets"
                className="inline-flex items-center gap-2 btn btn-sm border-primary text-primary hover:bg-primary hover:text-background transition-colors"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Planets
            </Link>

            {/* Heading */}
            <div className="space-y-2">
                <h1 className="text-4xl font-bold text-primary">{planet.name}</h1>
                <p className="opacity-80 text-lg">
                    Climate: <span className="text-secondary">{planet.climate}</span>
                </p>
            </div>

            {/* Planet stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {([
                    { label: "Population", value: planet.population },
                    { label: "Terrain", value: planet.terrain },
                    { label: "Gravity", value: planet.gravity },
                    { label: "Diameter", value: `${planet.diameter} km` },
                    { label: "Rotation Period", value: `${planet.rotation_period} hours` },
                    { label: "Orbital Period", value: `${planet.orbital_period} days` },
                ] as { label: string; value: string | number }[]).map(({ label, value }) => (
                    <div
                        key={label}
                        className="p-4 rounded-lg border border-accent/40 bg-background/60 shadow-sm"
                    >
                        <h3 className="font-semibold text-foreground mb-1">{label}</h3>
                        <p className="text-secondary break-words">{value}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}