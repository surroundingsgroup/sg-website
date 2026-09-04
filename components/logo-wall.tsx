import { featuredClients } from "@/lib/clients";

/**
 * Logo wall — instant social proof, sits right below the hero.
 *
 * Until real logo SVGs are uploaded, each client renders as a uniform
 * uppercase wordmark — looks intentional, reads as a serious roster.
 * When real logo files exist, swap `<LogoWordmark>` for an `<Image>`
 * component pulling from `client.logo`.
 *
 * Subtle hover state lifts opacity so the row feels alive without
 * distracting from the hero ↑ services ↓ flow.
 */
export function LogoWall() {
  return (
    <section className="bg-canvas py-16 lg:py-20 px-6 lg:px-12 border-y border-neutral-200">
      <div className="max-w-[1440px] mx-auto">
        <p className="caption text-neutral-500 text-center mb-10 lg:mb-12">
          TRUSTED BY THE BRANDS BUILDING AT THE TOP OF THEIR CATEGORIES
        </p>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12 items-center justify-items-center">
          {featuredClients.slice(0, 12).map((client) => (
            <li
              key={client.name}
              className="w-full text-center opacity-50 hover:opacity-100 transition-opacity duration-500"
              title={`${client.name} · ${client.vertical}`}
            >
              {client.logo ? (
                // Real logo would render here once uploaded:
                // <img src={client.logo} alt={client.name} className="h-8 lg:h-10 mx-auto" />
                <span className="font-sans font-extrabold text-sm lg:text-base tracking-[0.1em] uppercase text-ink leading-tight">
                  {client.name}
                </span>
              ) : (
                <span className="font-sans font-extrabold text-sm lg:text-base tracking-[0.1em] uppercase text-ink leading-tight">
                  {client.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
