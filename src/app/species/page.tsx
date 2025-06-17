// app/species/page.tsx
import Link from "next/link";
import { Dna } from "lucide-react";
import PaginationFloating from "@/components/PaginationFloating";
import { getSpeciesPage } from "@/lib/api";
import BackToTopButton from "@/components/BackToTopButton";

export const metadata = {
    title: "Species · SWAPI Explorer",
};

export default async function SpeciesPage({
    searchParams,
}: {
    searchParams?: { page?: string };
}) {
    const page = Number(searchParams?.page ?? 1);
    const { list, hasMore } = await getSpeciesPage(page);

    return (
        <section className="max-w-6xl mx-auto px-4 py-14 space-y-8 text-[var(--foreground)]">
            <h1 className="text-4xl font-bold flex items-center gap-3">
                <Dna className="w-8 h-8" /> Species
            </h1>

            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((s) => (
                    <li
                        key={s.name}
                        className="card bg-base-200 shadow hover:shadow-lg transition-colors"
                    >
                        <div className="card-body">
                            <h2 className="card-title">{s.name}</h2>
                            <p className="opacity-70 text-sm">Classification: {s.classification}</p>
                            <Link
                                href={`/species/${encodeURIComponent(s.name)}`}
                                className="btn btn-sm btn-outline mt-2"
                            >
                                Details
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>

            <PaginationFloating page={page} hasMore={hasMore} />
            <BackToTopButton />
        </section>
    );
}
