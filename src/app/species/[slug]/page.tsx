// app/species/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSpeciesByName } from "@/lib/api";
import type { Species } from "@/lib/types";

export const metadata = {
    title: "Species Detail · SWAPI Explorer",
};

export default async function SpeciesDetailPage({
    params,
}: {
    params: { slug: string };
}) {
    const name = decodeURIComponent(params.slug);
    const species: Species | undefined = await getSpeciesByName(name);

    if (!species) {
        return notFound();
    }

    return (
        <main className="max-w-3xl mx-auto px-4 py-10 space-y-6 text-[var(--foreground)]">
            <Link href="/species" className="btn btn-sm btn-outline">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Species
            </Link>

            <div className="space-y-2">
                <h1 className="text-4xl font-bold">{species.name}</h1>
                <p className="opacity-70 text-lg">Classification: {species.classification}</p>
                <p className="opacity-70 text-lg">Designation: {species.designation}</p>
                <p>Average Lifespan: {species.average_lifespan}</p>
                <p>Language: {species.language}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-base-200 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Physical Traits</h2>
                    <p>Average Height: {species.average_height}</p>
                    <p>Skin Colors: {species.skin_colors}</p>
                    <p>Hair Colors: {species.hair_colors}</p>
                    <p>Eye Colors: {species.eye_colors}</p>
                </div>
                {species.homeworld && (
                    <div className="bg-base-200 p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Homeworld</h2>
                        <Link
                            href={`/planets/${encodeURIComponent(species.homeworld)}`}
                            className="btn btn-sm btn-outline"
                        >
                            View Homeworld
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}
