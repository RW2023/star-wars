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
            <main className="p-6 max-w-xl mx-auto text-center text-[var(--color-foreground)]">
                <h1 className="text-3xl font-bold mb-4">Star Wars Films</h1>
                <p className="text-red-500 text-lg">
                    Failed to load films. Please try again later.
                </p>
            </main>
        );
    }

    return (
        <main className="p-6 space-y-6 max-w-3xl mx-auto text-[var(--color-foreground)]">
            <h1 className="text-5xl font-extrabold tracking-widest text-primary drop-shadow-[0_0_10px_var(--color-primary)]">Star Wars Films</h1>

            <ul className="grid gap-4">
                {films.map((film) => {
                    const id = film.url.split("/").filter(Boolean).pop();
                    return (
                        <li key={film.episode_id}>
                            <Link
                                href={`/films/${id}`}
                                className="block rounded-lg border border-[var(--color-primary)] bg-[var(--color-background)] hover:bg-[var(--color-primary)] text-[var(--color-foreground)] hover:text-black dark:hover:text-[var(--color-background)] shadow transition-colors duration-200"
                            >
                                <div className="p-4">
                                    <h2 className="text-lg md:text-xl font-semibold">
                                        {film.title}
                                    </h2>
                                    <p className="text-sm opacity-70">
                                        Released: {film.release_date}
                                    </p>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
