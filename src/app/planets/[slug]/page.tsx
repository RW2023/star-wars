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

type Film = {
    title: string;
    url: string;
    episode_id: number;
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

    // Fetch film titles + episode numbers
    const films: Film[] = await Promise.all(
        person.films.map(async (url) => {
            const film = await getResource<Film>(url);
            return film;
        })
    );

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
                {films.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        {films.map((film) => {
                            const id = extractId(film.url);
                            return (
                                <li key={film.url}>
                                    <Link href={`/films/${id}`} className="link">
                                        {film.episode_id
                                            ? `Episode ${film.episode_id}: ${film.title}`
                                            : film.title || `View Film #${id}`}
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
