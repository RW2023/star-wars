import { ReactNode } from "react";

export default function DetailSection({ label, value }: { label: string; value: ReactNode }) {
    return (
        <div className="flex gap-2 items-baseline">
            <span className="font-semibold">{label}:</span>
            <span>{value}</span>
        </div>
    );
}