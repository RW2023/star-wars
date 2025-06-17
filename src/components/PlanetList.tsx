import type { Planet } from "@/lib/types";
import { PlanetCard } from "./PlanetCard";

interface PlanetListProps {
    planets: Planet[];
}

export function PlanetList({ planets }: PlanetListProps) {
    return (
        <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {planets.map((planet) => (
                <PlanetCard key={planet.name} planet={planet} />
            ))}
        </ul>
    );
}
