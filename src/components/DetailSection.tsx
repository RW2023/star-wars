import { ReactNode } from "react";

export default function DetailSection({
    label,
    value,
}: {
    label: string;
    value: ReactNode;
}) {
    return (
        <div className="flex flex-wrap gap-x-2 gap-y-1 items-baseline text-[var(--color-foreground)]">
            <span className="font-semibold text-[var(--color-accent)]">{label}:</span>
            <span className="break-words">{value}</span>
        </div>
    );
}
