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
        <section className="max-w-6xl mx-auto px-4 py-14 space-y-10 text-foreground">
            <div className="text-center space-y-2">
                <h2 className="text-4xl font-extrabold text-primary">Characters</h2>
                <p className="opacity-80 text-sm">Browse characters from the Star Wars universe.</p>
            </div>

            <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {list.map((person) => (
                    <li
                        key={person.url}
                        className="group rounded-xl shadow-md bg-base-200 border border-base-300 hover:shadow-primary/30 transition-shadow"
                    >
                        <ItemCard
                            href={`/people/${extractId(person.url)}`}
                            title={person.name}
                        />
                    </li>
                ))}
            </ul>

            <ClientPagination currentPage={page} hasMore={hasMore} basePath="/people" />
        </section>
    );
}
