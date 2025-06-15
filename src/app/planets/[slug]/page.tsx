import { getPlanetByName } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function PlanetDetailPage({ params }: { params: { slug: string } }) {
    const name = decodeURIComponent(params.slug);
    const planet = await getPlanetByName(name);

    if (!planet) return notFound();

    return (
        <main className="max-w-3xl mx-auto px-4 py-10 space-y-6 text-[var(--foreground)]">
            <Link href="/planets" className="btn btn-sm btn-outline">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Planets
            </Link>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">{planet.name}</h1>
                <p className="opacity-70 text-lg">Climate: {planet.climate}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-base-200 p-4 rounded-lg"><h3 className="font-semibold">Population</h3><p>{planet.population}</p></div>
                <div className="bg-base-200 p-4 rounded-lg"><h3 className="font-semibold">Terrain</h3><p>{planet.terrain}</p></div>
                <div className="bg-base-200 p-4 rounded-lg"><h3 className="font-semibold">Gravity</h3><p>{planet.gravity}</p></div>
                <div className="bg-base-200 p-4 rounded-lg"><h3 className="font-semibold">Diameter</h3><p>{planet.diameter} km</p></div>
                <div className="bg-base-200 p-4 rounded-lg"><h3 className="font-semibold">Rotation Period</h3><p>{planet.rotation_period} hours</p></div>
                <div className="bg-base-200 p-4 rounded-lg"><h3 className="font-semibold">Orbital Period</h3><p>{planet.orbital_period} days</p></div>
            </div>
        </main>
    );
}
