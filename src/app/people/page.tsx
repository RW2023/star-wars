import { getResource } from "@/lib/api";
import ItemCard from "@/components/ItemCard";
import Pagination from "@/components/Pagination";

type Person = { name: string; url: string };

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
    const hasMore = Array.isArray(data) ? list.length >= 10 : Boolean(data.next);

    return (
        <section className="max-w-6xl mx-auto px-4 py-12 space-y-8 text-foreground">
            <h2 className="text-4xl font-bold text-primary">Characters</h2>

            <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {list.map((person) => (
                    <li key={person.url}>
                        <ItemCard
                            href={`/people/${extractId(person.url)}`}
                            title={person.name}
                        />
                    </li>
                ))}
            </ul>

            <Pagination currentPage={page} hasMore={hasMore} basePath="/people" />
        </section>
    );
}

function extractId(url: string) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
}
