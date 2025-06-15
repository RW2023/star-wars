import { getResource, extractId } from "@/lib/api";
import ItemCard from "@/components/ItemCard";
import ClientPagination from "@/components/ClientPagination";

type Planet = {
    name: string;
    url: string;
};

export const metadata = { title: "Planets · SWAPI Explorer" };

export default async function PlanetsPage({
    searchParams,
}: {
    searchParams?: { page?: string };
}) {
    const page = Number(searchParams?.page ?? 1);

    const data = await getResource<Planet[] | { results?: Planet[]; next?: string | null }>(
        `/planets?page=${page}`
    );

    const list: Planet[] = Array.isArray(data) ? data : data.results ?? [];
    const hasMore = Array.isArray(data) ? list.length >= 10 : Boolean((data as any).next);

    return (
        <section className="max-w-6xl mx-auto px-4 py-14 space-y-10 text-foreground">
            <div className="text-center space-y-2">
                <h2 className="text-4xl font-extrabold text-primary">Planets</h2>
                <p className="opacity-80 text-sm">Explore the diverse worlds of the galaxy.</p>
            </div>

            <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {list.map((planet) => (
                    <li
                        key={planet.url}
                        className="group rounded-xl shadow-md bg-base-200 border border-base-300 hover:shadow-primary/30 transition-shadow"
                    >
                        <ItemCard
                            href={`/planets/${encodeURIComponent(planet.name)}`}
                            title={planet.name}
                        />
                    </li>
                ))}
            </ul>

            <ClientPagination currentPage={page} hasMore={hasMore} basePath="/planets" />
        </section>
    );
}
