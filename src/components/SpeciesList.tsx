import Link from "next/link";
import { Dna } from "lucide-react";
import type { Species } from "@/lib/types";

interface SpeciesListProps {
    list: Species[];
}

export default function SpeciesList({ list }: SpeciesListProps) {
    return (
        <section className="max-w-6xl mx-auto px-4 py-14 space-y-8 text-[var(--color-foreground)]">
            <h1 className="text-4xl sm:text-5xl flex items-center gap-3 font-extrabold tracking-widest text-primary justify-center drop-shadow-[0_0_10px_var(--color-primary)]">
                <Dna className="w-8 h-8 :text-[var(--color-foreground)]" />
                Species
            </h1>

            <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {list.map((s) => (
                    <li
                        key={s.name}
                        className="relative group overflow-hidden rounded-xl border border-[var(--color-accent)]/40 bg-[var(--color-background)] shadow-md transition-shadow hover:shadow-[0_0_16px_var(--color-primary)]/40"
                    >
                        <span
                            className="absolute inset-0 -z-10 scale-110 bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-[var(--color-accent)]/10 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                            aria-hidden="true"
                        />

                        <div className="p-6 space-y-3 text-[var(--color-foreground)]">
                            <h2 className="text-lg font-semibold text-[var(--color-primary-soft)] glow-title">
                                {s.name}
                            </h2>
                            <p className="text-sm">
                                <span className="font-medium text-[var(--color-foreground)]">Classification:</span>{' '}
                                <span className="text-[var(--color-secondary)]">{s.classification}</span>
                            </p>
                            <div className="pt-4">
                                <Link
                                    href={`/species/${encodeURIComponent(s.name)}`}
                                    className="btn btn-sm border-[var(--color-primary)] text-[var(--color-primary-soft)] transition-colors hover:bg-[var(--color-primary)] hover:text-black dark:hover:text-[var(--color-background)]"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
