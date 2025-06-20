import { getResource } from "@/lib/api";
import BackButton from "@/components/BackButton";
import DetailSection from "@/components/DetailSection";
import Link from "next/link";

type Person = {
    name: string;
    height: string;
    mass: string;
    gender: string;
    homeworld: string;
    films: string[];
};

export const metadata = {
    title: "Character Details · SWAPI Explorer",
};

export default async function PersonDetail({
    params,
}: {
    params: { id: string };
}) {
    const person = await getResource<Person>(`/people/${params.id}`);
    const homeworldId = extractId(person.homeworld);

    return (
        <article className="max-w-3xl mx-auto px-4 py-10 space-y-6 text-foreground">
            <BackButton />
            <h1 className="text-4xl font-extrabold text-primary">{person.name}</h1>

            <div className="space-y-3">
                <DetailSection label="Height" value={`${person.height} cm`} />
                <DetailSection label="Mass" value={`${person.mass} kg`} />
                <DetailSection label="Gender" value={person.gender} />
                <DetailSection
                    label="Homeworld"
                    value={
                        <Link href={`/planets/${homeworldId}`} className="link">
                            View Planet
                        </Link>
                    }
                />
            </div>

            {/* Films */}
            <div className="space-y-2 pt-4">
                <h2 className="text-xl font-semibold">Films</h2>
                {person.films.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        {person.films.map((filmUrl) => {
                            const id = extractId(filmUrl);
                            return (
                                <li key={filmUrl}>
                                    <Link href={`/films/${id}`} className="link">
                                        View Film #{id}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p className="opacity-70 text-sm">No film appearances listed.</p>
                )}
            </div>
        </article>
    );
}

function extractId(url: string) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
}
