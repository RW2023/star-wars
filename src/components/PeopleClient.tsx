"use client";

import { useEffect, useState } from "react";
import { extractId, getSpeciesName } from "@/lib/api";
import type { Person } from "@/lib/types";
import BackToTopButton from "@/components/BackToTopButton";
import Link from "next/link";

interface Props {
    people: Person[];
}

type EnrichedPerson = Person & { speciesName: string };

export default function PeopleClient({ people }: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [genderFilter, setGenderFilter] = useState("All");
    const [speciesFilter, setSpeciesFilter] = useState("All");
    const [enrichedPeople, setEnrichedPeople] = useState<EnrichedPerson[]>([]);
    const [filtered, setFiltered] = useState<EnrichedPerson[]>([]);

    useEffect(() => {
        async function enrich() {
            const enriched = await Promise.all(
                people.map(async (p) => ({
                    ...p,
                    speciesName: p.species?.[0]
                        ? await getSpeciesName(p.species[0])
                        : "Human",
                }))
            );
            setEnrichedPeople(enriched);
        }
        enrich();
    }, [people]);

    useEffect(() => {
        let result = enrichedPeople;
        if (searchTerm) {
            result = result.filter((p) =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (genderFilter !== "All") {
            result = result.filter((p) => p.gender === genderFilter);
        }
        if (speciesFilter !== "All") {
            result = result.filter((p) => p.speciesName === speciesFilter);
        }
        setFiltered(result);
    }, [searchTerm, genderFilter, speciesFilter, enrichedPeople]);

    return (
        <section className="max-w-7xl mx-auto px-4 py-16 space-y-14 text-[var(--color-foreground)]">
            {/* Hero Title */}
            <div className="text-center space-y-3">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-widest text-primary drop-shadow-[0_0_10px_var(--color-primary)]">
                    CHARACTERS
                </h1>
                <p className="text-[var(--color-secondary)] text-base sm:text-lg max-w-xl mx-auto">
                    Meet the iconic beings of the Star Wars universe — rebels, empires,
                    and everyone in between.
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-full max-w-xs bg-[var(--color-background)] text-[var(--color-foreground)]"
                />
                <select
                    title="Gender Filter"
                    className="select select-bordered bg-[var(--color-background)] text-[var(--color-foreground)]"
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                >
                    <option value="All">All Genders</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="n/a">N/A</option>
                    <option value="hermaphrodite">Hermaphrodite</option>
                    <option value="none">None</option>
                    <option value="unknown">Unknown</option>
                </select>
                <select
                    title="Species Filter"
                    className="select select-bordered bg-[var(--color-background)] text-[var(--color-foreground)]"
                    value={speciesFilter}
                    onChange={(e) => setSpeciesFilter(e.target.value)}
                >
                    <option value="All">All Species</option>
                    {[...new Set(enrichedPeople.map((p) => p.speciesName))].map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
            </div>

            {/* Card Grid */}
            <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {filtered.map((person) => (
                    <li
                        key={person.url}
                        className="relative group overflow-hidden rounded-xl border border-[var(--color-accent)]/40 bg-[var(--color-background)] shadow-md transition-shadow hover:shadow-[0_0_16px_var(--color-primary)]/40"
                    >
                        <span
                            className="absolute inset-0 -z-10 scale-110 bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-[var(--color-accent)]/10 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                            aria-hidden="true"
                        />

                        <div className="p-6 space-y-3 text-[var(--color-foreground)]">
                            <h2 className="text-lg font-semibold text-[var(--color-primary-soft)] glow-title">
                                {person.name}
                            </h2>
                            <p className="text-sm">
                                <span className="font-medium text-[var(--color-foreground)]">Gender:</span>{' '}
                                <span className="text-[var(--color-secondary)]">{person.gender}</span>
                            </p>
                            <p className="text-sm">
                                <span className="font-medium text-[var(--color-foreground)]">Species:</span>{' '}
                                <span className="text-[var(--color-secondary)]">{person.speciesName}</span>
                            </p>
                            <div className="pt-4">
                                <Link
                                    href={`/people/${extractId(person.url)}`}
                                    className="btn btn-sm border-[var(--color-primary)] text-[var(--color-primary-soft)] transition-colors hover:bg-[var(--color-primary)] hover:text-black dark:hover:text-[var(--color-background)]"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <BackToTopButton />
        </section>
    );
}
