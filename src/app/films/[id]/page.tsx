// app/films/[id]/page.tsx
import { notFound } from "next/navigation";

type Film = {
    title: string;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    episode_id: number;
};

export default async function FilmDetailPage({ params }: { params: { id: string } }) {
    const res = await fetch(`https://swapi.info/api/films/${params.id}`);

    if (!res.ok) return notFound();

    const film: Film = await res.json();

    return (
        <main className="p-6 max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl font-extrabold tracking-widest text-primary drop-shadow-[0_0_10px_var(--color-primary)]">{film.title}</h1>
            <p className="text-sm text-gray-500">Episode {film.episode_id}</p>
            <p className="text-gray-600">Directed by: {film.director}</p>
            <p className="text-gray-600">Produced by: {film.producer}</p>
            <p className="text-sm text-gray-500">Release Date: {film.release_date}</p>
            <div className="mt-4 bg-base-200 p-4 rounded prose max-w-none">
                <h2 className="text-xl font-semibold">Opening Crawl</h2>
                <p className="whitespace-pre-wrap">{film.opening_crawl}</p>
            </div>
        </main>
    );
}
