"use client";
import Link from "next/link";

export default function Pagination({
    currentPage,
    hasMore,
    basePath,
}: {
    currentPage: number;
    hasMore: boolean;
    basePath: string;
}) {
    return (
        <div className="join">
            {currentPage > 1 && (
                <Link href={`${basePath}?page=${currentPage - 1}`} className="btn join-item">
                    Previous
                </Link>
            )}
            {hasMore && (
                <Link href={`${basePath}?page=${currentPage + 1}`} className="btn join-item">
                    Next
                </Link>
            )}
        </div>
    );
}