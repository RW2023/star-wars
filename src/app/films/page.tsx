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
            <h1 className="text-4xl font-extrabold text-center tracking-widest text-primary drop-shadow-[0_0_10px_var(--color-primary)]">
                STAR WARS FILMS
            </h1>

            <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {films.map((film) => {
                    const id = film.url.split("/").filter(Boolean).pop();
                    return (
                        <li
                            key={film.episode_id}
                            className="relative group overflow-hidden rounded-xl border border-[var(--color-accent)]/40 bg-[var(--color-background)] shadow-md transition-shadow hover:shadow-[0_0_16px_var(--color-primary)]/40"
                        >
                            <span
                                className="absolute inset-0 -z-10 scale-110 bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-[var(--color-accent)]/10 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                                aria-hidden="true"
                            />

                            <div className="p-6 space-y-3 text-[var(--color-foreground)]">
                                <h2 className="text-lg font-semibold text-[var(--color-primary-soft)] glow-title">
                                    {film.title}
                                </h2>
                                <p className="text-sm">
                                    <span className="font-medium text-[var(--color-foreground)]">Released:</span>{' '}
                                    <span className="text-[var(--color-secondary)]">{film.release_date}</span>
                                </p>
                                <div className="pt-4">
                                    <Link
                                        href={`/films/${id}`}
                                        className="btn btn-sm border-[var(--color-primary)] text-[var(--color-primary-soft)] transition-colors hover:bg-[var(--color-primary)] hover:text-black dark:hover:text-[var(--color-background)]"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
