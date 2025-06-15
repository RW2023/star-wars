// app/page.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "SWAPI Explorer · Home" };

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
    <section className="mx-auto max-w-3xl space-y-10 px-4 py-16 text-center">
      {/* Headline */}
      <h1 className="text-5xl font-extrabold tracking-tight text-primary">
        Explore&nbsp;the&nbsp;Galaxy
      </h1>

      {/* Sub-heading */}
      <p className="opacity-80">
        Click any category to begin your journey through the&nbsp;Star&nbsp;Wars API.
      </p>

      {/* Category grid */}
      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="
                group relative flex h-14 items-center justify-center overflow-hidden rounded-lg
                border border-accent/40 bg-background px-4 font-medium
                text-primary outline-none transition
                hover:shadow-primary/40 focus-visible:ring focus-visible:ring-primary/60
              "
            >
              {/* subtle hyperspace streak */}
              <span
                className="
                  absolute inset-0 -z-10 translate-x-[-120%] bg-gradient-to-r
                  from-transparent via-primary/20 to-primary/0 opacity-0
                  transition-all duration-500 group-hover:translate-x-[120%] group-hover:opacity-100
                "
                aria-hidden="true"
              />

              {label}
              <ArrowRight
                className="ml-2 h-4 w-4 shrink-0 transition-all
                           group-hover:translate-x-1 group-hover:opacity-100
                           opacity-0"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
