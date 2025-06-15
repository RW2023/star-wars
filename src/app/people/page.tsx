// app/people/page.tsx
import { getResource } from "@/lib/api";
import ItemCard from "@/components/ItemCard";
import Pagination from "@/components/Pagination";

type Person = { name: string; url: string };

// SWAPI Re‑born returns an *array* for /people, while the classic swapi.dev
// returns an object with a `results` field.  Handle both so we remain
// portable and avoid `.map()` on undefined.

export default async function PeoplePage({
    searchParams,
}: {
    searchParams?: { page?: string };
}) {
    const page = Number(searchParams?.page ?? 1);

    const data = await getResource<Person[] | { results?: Person[]; next?: string | null }>(
        `/people?page=${page}`
    );

    // Normalise to a simple list regardless of shape
    const list: Person[] = Array.isArray(data) ? data : data.results ?? [];
    const hasMore = Array.isArray(data) ? list.length >= 10 : Boolean(data.next);

    return (
        <section className="space-y-6">
            <h2 className="text-3xl font-bold">Characters</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {list.map((person) => (
                    <ItemCard
                        key={person.url}
                        href={`/people/${extractId(person.url)}`}
                        title={person.name}
                    />
                ))}
            </div>
            <Pagination currentPage={page} hasMore={hasMore} basePath="/people" />
        </section>
    );
}

function extractId(url: string) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
}
