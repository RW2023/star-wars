import Link from "next/link";
import { Dna } from "lucide-react";
import type { Species } from "@/lib/types";

interface SpeciesListProps {
    list: Species[];
}

export default function SpeciesList({ list }: SpeciesListProps) {
    return (
        <section className="max-w-6xl mx-auto px-4 py-14 space-y-8 text-[var(--color-foreground)]">
            <h1 className="text-4xl font-bold flex items-center gap-3">
                <Dna className="w-8 h-8 text-[var(--color-primary)]" />
                Species
            </h1>

            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((s) => (
                    <li key={s.name}>
                        <div
                            className="rounded-lg border border-[var(--color-primary)] bg-[var(--color-background)]
                         hover:bg-[var(--color-primary)] text-[var(--color-foreground)]
                         hover:text-black dark:hover:text-[var(--color-background)]
                         shadow transition-colors duration-200 h-full flex flex-col justify-between p-4"
                        >
                            <div>
                                <h2 className="text-lg md:text-xl font-semibold glow-title">
                                    {s.name}
                                </h2>
                                <p className="opacity-70 text-sm">
                                    Classification: {s.classification}
                                </p>
                            </div>

                            <Link
                                href={`/species/${encodeURIComponent(s.name)}`}
                                className="btn btn-sm btn-outline mt-4 self-start"
                            >
                                Details
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
