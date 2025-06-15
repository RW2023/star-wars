import { getResource } from "@/lib/api";
import ItemCard from "@/components/ItemCard";
import Pagination from "@/components/Pagination";

type PersonListResponse = {
    next: string | null;
    results: { name: string; url: string }[];
};

export default async function PeoplePage({ searchParams }: { searchParams?: { page?: string } }) {
    const page = Number(searchParams?.page ?? 1);
    const data = await getResource<PersonListResponse>(`/people?page=${page}`);

    return (
        <section className="space-y-6">
            <h2 className="text-3xl font-bold">Characters</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {data.results.map((person) => (
                    <ItemCard
                        key={person.url}
                        href={`/people/${extractId(person.url)}`}
                        title={person.name}
                    />
                ))}
            </div>
            <Pagination currentPage={page} hasMore={!!data.next} basePath="/people" />
        </section>
    );
}

function extractId(url: string) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
}