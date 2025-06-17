// app/people/page.tsx

import PeopleClient from "@/components/PeopleClient";
import { getPeoplePage } from "@/lib/api";

export default async function PeoplePage({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const page = parseInt(searchParams.page || "1", 10);
    const { list: people, hasMore } = await getPeoplePage(page);

    return <PeopleClient people={people} page={page} hasMore={hasMore} />;
}
