"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    return (
        <button className="btn btn-sm btn-ghost" onClick={() => router.back()}>
            ← Back
        </button>
    );
}