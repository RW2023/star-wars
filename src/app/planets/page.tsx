import type { Metadata } from "next";
import { getAllPlanets } from "@/lib/api";
import { PlanetList } from "@/components/PlanetList";

export const metadata: Metadata = {
    title: "Explore Planets · Star-Wars Visualizer",
};

export default async function PlanetsPage() {
    const planets = await getAllPlanets();

    return (
        <main className="max-w-6xl mx-auto px-4 py-14 space-y-10 text-foreground">
            <h1 className="text-4xl font-extrabold tracking-widest text-primary drop-shadow-md">
                Explore&nbsp;Planets
            </h1>

            <PlanetList planets={planets} />
        </main>
    );
}
