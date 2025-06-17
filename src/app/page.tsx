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
    <section className="mx-auto max-w-5xl space-y-12 px-4 py-20 text-center">
      {/* Hero headline */}
      <h1
        className="
          mx-auto
          max-w-[18rem] sm:max-w-none           /* constrain only on phones  */
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl
          font-extrabold leading-tight
          tracking-tight sm:tracking-widest     /* big crawl-style spacing ≥ 640 px */
          text-primary drop-shadow-[0_0_10px_var(--color-primary)]
        "
      >
        <span className="block sm:inline">Explore&nbsp;the</span>{" "}
        <span className="block sm:inline">Galaxy</span>
      </h1>

      {/* Sub-heading */}
      <p className="max-w-xl mx-auto text-lg opacity-80 text-balance">
        Click any category to begin your journey through the&nbsp;Star&nbsp;Wars API.
      </p>

      {/* Category grid */}
      <ul className="grid gap-y-4 gap-x-4 sm:grid-cols-2 md:grid-cols-3">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="
                group relative flex h-14 items-center justify-center overflow-hidden rounded-lg
                border border-accent/40 bg-background px-4 font-medium text-primary
                outline-none transition hover:shadow-md hover:shadow-primary/30
                focus-visible:ring focus-visible:ring-primary/60
              "
            >
              {/* Hyperspace streak animation */}
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
                className="ml-2 h-4 w-4 shrink-0 transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
