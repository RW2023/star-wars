import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const links = [
    { href: "/films", label: "Films" },
    { href: "/people", label: "Characters" },
    { href: "/planets", label: "Planets" },
    { href: "/species", label: "Species" },
    { href: "/starships", label: "Starships" },
    { href: "/vehicles", label: "Vehicles" },
  ];

  return (
    <section className="max-w-3xl mx-auto text-center space-y-8 py-12 px-4 text-foreground">
      {/* Headline */}
      <h1 className="text-5xl font-extrabold tracking-tight text-primary">
        Explore the Galaxy
      </h1>

      {/* Sub-heading */}
      <p className="opacity-80">
        Click any category to begin your journey through the Star&nbsp;Wars API.
      </p>

      {/* Category buttons */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="btn h-14 border-primary text-primary hover:bg-primary hover:text-background transition-colors group"
          >
            {label}
            <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition" />
          </Link>
        ))}
      </div>
    </section>
  );
}