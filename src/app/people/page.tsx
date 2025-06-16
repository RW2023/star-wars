// src/app/people/page.tsx – Server Component
import { getResource } from "@/lib/api";
import PeopleClient from "@/components/PeopleClient";
import type { Person } from "@/lib/types";

export const metadata = {
    title: "Characters · SWAPI Explorer",
};

export default async function PeoplePage({
    searchParams,
}: {
    searchParams?: { page?: string };
}) {
    const page = Number(searchParams?.page ?? 1);
    const data = await getResource<{ results?: Person[]; next?: string | null }>(
        `/people?page=${page}`
    );

    // swapi.info returns the complete list, so we paginate client side

    let list: Person[];
    let hasMore: boolean;

    if (Array.isArray(data)) {
        const start = (page - 1) * 10;
        list = data.slice(start, start + 10);
        hasMore = start + 10 < data.length;
    } else {
        list = data.results ?? [];
        hasMore = Boolean((data as { next?: string | null }).next);
    }

    return <PeopleClient people={list} page={page} hasMore={hasMore} />;
}
