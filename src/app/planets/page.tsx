import type { Metadata } from "next";
import { getAllPlanets } from "@/lib/api";
import { PlanetList } from "@/components/PlanetList";
import BackToTopButton from "@/components/BackToTopButton";

export const metadata: Metadata = {
    title: "Explore Planets · Star-Wars Visualizer",
};

export default async function PlanetsPage() {
    const planets = await getAllPlanets();

    return (
        <main className="max-w-6xl mx-auto px-4 py-14 space-y-10 text-[var(--color-foreground)] bg-[var(--color-background)]">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-widest text-primary drop-shadow-[0_0_10px_var(--color-primary)] text-center">
                Explore Planets
            </h1>
            <PlanetList planets={planets} />
            <BackToTopButton />
        </main>
    );
}
