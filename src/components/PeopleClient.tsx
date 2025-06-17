"use client";

import { useEffect, useState } from "react";
import ItemCard from "@/components/ItemCard";
import { extractId, getSpeciesName } from "@/lib/api";
import type { Person } from "@/lib/types";
import BackToTopButton from "@/components/BackToTopButton";

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
            <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filtered.map((person) => (
                    <li
                        key={person.url}
                        className="group relative rounded-xl border border-[var(--color-secondary)] bg-[var(--color-background)]
                       shadow-md transition-all duration-300
                       hover:border-[var(--color-primary)] hover:shadow-lg hover:shadow-[var(--color-primary)]/40"
                    >
                        <div className="p-4">
                            <ItemCard
                                href={`/people/${extractId(person.url)}`}
                                title={person.name}
                                className="block text-lg font-semibold text-[var(--color-foreground)] glow-title group-hover:text-[var(--color-primary)] transition-colors"
                            />
                        </div>
                    </li>
                ))}
            </ul>

            <BackToTopButton />
        </section>
    );
}
