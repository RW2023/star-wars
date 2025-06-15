import { notFound } from "next/navigation";
import Link from "next/link";
import { getResource, extractId } from "@/lib/api";
import BackButton from "@/components/BackButton";
import DetailSection from "@/components/DetailSection";
import { Users, Globe2 } from "lucide-react";

/* ---------------- Types ---------------- */
type Planet = {
    name: string;
    climate: string;
    population: string;
    terrain: string;
    gravity: string;
    diameter: string;
    rotation_period: string;
    orbital_period: string;
    residents: string[]; // array of character URLs
};

export const metadata = { title: "Planet Details · SWAPI Explorer" };

/* ---------------- Page ----------------- */
export default async function PlanetDetailPage({
    params,
}: {
    params: { slug: string };
}) {
    const name = decodeURIComponent(params.slug);

    /* Fetch, handling BOTH shapes */
    const data = await getResource<
        Planet[] | { results?: Planet[] }
    >(`/planets/?search=${encodeURIComponent(name)}`);

    const list: Planet[] = Array.isArray(data) ? data : data.results ?? [];
    const planet = list[0];

    if (!planet) return notFound();

    const residentCount = planet.residents.length;

    return (
        <article className="max-w-3xl mx-auto px-4 py-10 space-y-6 text-foreground">
            <BackButton />
            <h1 className="text-4xl font-extrabold text-primary">{planet.name}</h1>

            <div className="space-y-3">
                <DetailSection label="Climate" value={planet.climate} />
                <DetailSection label="Terrain" value={planet.terrain} />
                <DetailSection label="Gravity" value={planet.gravity} />
                <DetailSection label="Diameter" value={`${planet.diameter} km`} />
                <DetailSection label="Rotation Period" value={`${planet.rotation_period} h`} />
                <DetailSection label="Orbital Period" value={`${planet.orbital_period} d`} />
                <DetailSection label="Population" value={planet.population} />

                {residentCount > 0 && (
                    <DetailSection
                        label="Residents"
                        value={
                            <Link
                                href={`/people?planet=${encodeURIComponent(planet.name)}`}
                                className="link inline-flex items-center gap-1"
                            >
                                {residentCount} character{residentCount > 1 ? "s" : ""}{" "}
                                <Users className="w-4 h-4" />
                            </Link>
                        }
                    />
                )}
            </div>

            {/* Back-to-list button */}
            <div className="pt-6">
                <Link
                    href="/planets"
                    className="btn border-primary text-primary hover:bg-primary hover:text-background"
                >
                    <Globe2 className="w-4 h-4 mr-2" />
                    Back to Planets
                </Link>
            </div>
        </article>
    );
}
