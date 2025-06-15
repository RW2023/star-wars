import Link from "next/link";

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
    <section className="max-w-3xl mx-auto text-center space-y-6 py-10">
      <h1 className="text-5xl font-extrabold">Explore the Galaxy</h1>
      <p className="opacity-70">
        Click any category to begin your journey through the Star Wars API.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {links.map(({ href, label }) => (
          <Link key={href} href={href} className="btn btn-accent">
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
}