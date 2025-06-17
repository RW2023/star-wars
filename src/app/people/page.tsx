// app/people/page.tsx
import PeopleClient from "@/components/PeopleClient";
import { getAllPeople } from "@/lib/api";

export const metadata = {
    title: "Characters · SWAPI Explorer",
};

export default async function PeoplePage() {
    // fetch *all* people up front—no pagination props needed
    const people = await getAllPeople();

    return <PeopleClient people={people} />;
}
