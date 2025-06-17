// app/films/page.tsx
import Link from "next/link";

type Film = {
    episode_id: number;
    title: string;
    release_date: string;
    url: string;
};

export const metadata = { title: "Star Wars Films · SWAPI Explorer" };

export default async function FilmsPage() {
    let films: Film[] = [];

    try {
        const res = await fetch("https://swapi.info/api/films", {
            next: { revalidate: 3600 },
        });
        if (!res.ok) throw new Error(res.statusText);

        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid API response");
        films = data;
    } catch (err) {
        console.error("Error loading films:", err);
        return (
            <main className="mx-auto max-w-xl space-y-8 px-4 py-16 text-center text-foreground">
                <h1 className="mx-auto max-w-[18rem] sm:max-w-none text-4xl sm:text-5xl font-extrabold tracking-wider sm:tracking-widest text-primary drop-shadow-[0_0_10px_var(--color-primary)]">
                    Star&nbsp;Wars&nbsp;Films
                </h1>
                <p className="text-lg text-red-500">
                    Failed&nbsp;to&nbsp;load films. Please try again later.
                </p>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-5xl space-y-12 px-4 py-20 text-foreground">
            {/* Headline */}
            <h1 className="mx-auto max-w-[18rem] sm:max-w-none text-4xl sm:text-5xl font-extrabold tracking-wider sm:tracking-widest text-primary drop-shadow-[0_0_10px_var(--color-primary)] text-center">
                Star&nbsp;Wars&nbsp;Films
            </h1>

            {/* Film cards */}
            <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {films.map((film) => {
                    const id = film.url.split("/").filter(Boolean).pop() ?? film.episode_id;

                    return (
                        <li key={film.episode_id}>
                            <Link
                                href={`/films/${id}`}
                                className="
                  group relative block overflow-hidden rounded-lg border border-primary/40
                  bg-background p-4 shadow transition
                  hover:shadow-primary/30            /* glow on hover */
                  hover:ring-4 hover:ring-primary/60  /* show ring on mouse hover */
                  hover:ring-offset-4 hover:ring-offset-background
                  focus-visible:outline-none         /* remove default */
                  focus-visible:ring-4 focus-visible:ring-primary/60
                  focus-visible:ring-offset-4 focus-visible:ring-offset-background
                "
                            >
                                {/* hyperspace streak */}
                                <span
                                    className="absolute inset-0 -z-10 translate-x-[-120%] bg-gradient-to-r from-transparent via-primary/20 to-primary/0 opacity-0 transition-all duration-500 group-hover:translate-x-[120%] group-hover:opacity-100"
                                    aria-hidden="true"
                                />

                                <h2 className="text-lg md:text-xl font-semibold text-primary transition-colors group-hover:text-background">
                                    {film.title}
                                </h2>
                                <p className="text-sm opacity-70">
                                    Released&nbsp;•&nbsp;{film.release_date}
                                </p>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
