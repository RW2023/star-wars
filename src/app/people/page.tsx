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
    const list = Array.isArray(data) ? data : data.results ?? [];
    const hasMore = Array.isArray(data)
        ? list.length >= 10
        : Boolean((data as { next?: string | null }).next);

    return <PeopleClient people={list} page={page} hasMore={hasMore} />;
}