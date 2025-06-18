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
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide sm:tracking-widest text-[var(--color-primary)] drop-shadow-sm sm:drop-shadow-md text-center sm:text-left">
                Explore&nbsp;Planets
            </h1>
            <PlanetList planets={planets} />
            <BackToTopButton />
        </main>
    );
}
