// app/films/page.tsx
import Link from "next/link";

type Film = {
    episode_id: number;
    title: string;
    release_date: string;
    url: string;
};

export default async function FilmsPage() {
    let films: Film[] = [];

    try {
        const res = await fetch("https://swapi.info/api/films", {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            console.error("Failed to fetch films:", res.statusText);
            throw new Error("Failed to fetch");
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
            console.error("Unexpected data structure:", data);
            throw new Error("Invalid API response");
        }

        films = data;
    } catch (err) {
        console.error("Error loading films:", err);
        return (
            <main className="p-4 max-w-xl mx-auto text-center">
                <h1 className="text-2xl font-bold">Films</h1>
                <p className="text-red-500 mt-4">Failed to load films. Please try again later.</p>
            </main>
        );
    }

    return (
        <main className="p-4 space-y-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center">Star Wars Films</h1>
            <ul className="space-y-4">
                {films.map((film) => {
                    const id = film.url.split("/").filter(Boolean).pop();
                    return (
                        <li key={film.episode_id} className="border rounded p-4 hover:shadow-lg transition">
                            <Link href={`/films/${id}`} className="text-lg font-semibold hover:underline">
                                {film.title}
                            </Link>
                            <p className="text-sm text-gray-500">Released: {film.release_date}</p>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
