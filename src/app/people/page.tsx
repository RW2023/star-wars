import { getResource, extractId } from "@/lib/api";
import ItemCard from "@/components/ItemCard";
import ClientPagination from "@/components/ClientPagination";

type Person = {
    name: string;
    url: string;
};

export const metadata = { title: "Characters · SWAPI Explorer" };

export default async function PeoplePage({
    searchParams,
}: {
    searchParams?: { page?: string };
}) {
    const page = Number(searchParams?.page ?? 1);

    const data = await getResource<Person[] | { results?: Person[]; next?: string | null }>(
        `/people?page=${page}`
    );

    const list: Person[] = Array.isArray(data) ? data : data.results ?? [];
    const hasMore = Array.isArray(data) ? list.length >= 10 : Boolean((data as { next?: string | null }).next);

    return (
        <section className="max-w-7xl mx-auto px-4 py-16 space-y-14 text-foreground">
            {/* Hero Title */}
            <div className="text-center space-y-3">
                <h1 className="text-5xl font-extrabold tracking-widest text-primary drop-shadow-[0_0_10px_var(--color-primary)]">
                    CHARACTERS
                </h1>
                <p className="text-secondary text-base sm:text-lg max-w-xl mx-auto">
                    Meet the iconic beings of the Star Wars universe — rebels, empires, and everyone in between.
                </p>
            </div>

            {/* Card Grid */}
            <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {list.map((person) => (
                    <li
                        key={person.url}
                        className="group relative rounded-xl border border-base-300 bg-base-200/80 backdrop-blur-sm shadow-md transition-all duration-300 hover:shadow-[0_0_25px_var(--color-primary)] hover:border-primary hover:ring hover:ring-primary/30 hover:ring-offset-1"
                    >
                        <div className="p-4">
                            <ItemCard
                                href={`/people/${extractId(person.url)}`}
                                title={person.name}
                                className="block text-lg font-semibold text-foreground group-hover:text-primary transition-colors"
                            />
                        </div>
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            <div className="flex justify-center pt-6">
                <ClientPagination currentPage={page} hasMore={hasMore} basePath="/people" />
            </div>
        </section>
    );
}
