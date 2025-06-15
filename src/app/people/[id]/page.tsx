import { getResource } from "@/lib/api";
import BackButton from "@/components/BackButton";
import DetailSection from "@/components/DetailSection";
import Link from "next/link";

type Person = {
    name: string;
    height: string;
    mass: string;
    gender: string;
    homeworld: string;
    films: string[];
};

export default async function PersonDetail({ params }: { params: { id: string } }) {
    const person = await getResource<Person>(`/people/${params.id}`);
    const homeworldId = extractId(person.homeworld);

    return (
        <article className="space-y-4">
            <BackButton />
            <h1 className="text-4xl font-bold">{person.name}</h1>
            <DetailSection label="Height" value={`${person.height} cm`} />
            <DetailSection label="Mass" value={`${person.mass} kg`} />
            <DetailSection label="Gender" value={person.gender} />
            <DetailSection
                label="Homeworld"
                value={
                    <Link href={`/planets/${homeworldId}`} className="link">
                        View Planet
                    </Link>
                }
            />
            {/* TODO: Map films → links */}
        </article>
    );
}

function extractId(url: string) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
}