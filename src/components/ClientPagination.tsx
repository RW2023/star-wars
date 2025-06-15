"use client";

import { useRouter, useSearchParams } from "next/navigation";
import PaginationFloating from "@/components/PaginationFloating";

type Props = {
    currentPage: number;
    hasMore: boolean;
    basePath?: string; // defaults to current pathname
};

export default function ClientPagination({
    currentPage,
    hasMore,
    basePath = "/people",
}: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const totalPages = hasMore ? currentPage + 1 : currentPage;

    const onChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (newPage === 1) {
            params.delete("page");
        } else {
            params.set("page", String(newPage));
        }
        router.push(`${basePath}?${params.toString()}`);
    };

    return (
        <PaginationFloating
            page={currentPage}
            totalPages={totalPages}
            onChange={onChange}
        />
    );
}
