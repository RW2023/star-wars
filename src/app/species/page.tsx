// app/species/page.tsx
import SpeciesList from "@/components/SpeciesList";
import { getSpeciesPage } from "@/lib/api";
import BackToTopButton from "@/components/BackToTopButton";

export const metadata = {
    title: "Species · SWAPI Explorer",
};

export default async function SpeciesPage() {
    const { list } = await getSpeciesPage(1);

    return (
        <>
            <SpeciesList list={list} />
            <BackToTopButton />
        </>
    );
}
