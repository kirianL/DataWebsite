import { SITE_CONTENT } from "../data/content";
import { ArrowUpRightIcon, KickerMarkIcon } from "./Icons";

export function ServicesDarkBlock() {
  const { servicesSection } = SITE_CONTENT;

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="bg-[var(--color-lime)] py-11 sm:py-18 lg:py-24"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[var(--color-forest)] p-5 text-white sm:rounded-3xl sm:p-10 lg:p-14">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12">
            {/* Left column: kicker + office photo */}
            <div className="flex flex-col justify-between gap-5 sm:gap-8 lg:col-span-4">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-white/85">
                <KickerMarkIcon className="h-3.5 w-3.5 text-[var(--color-lime)]" />
                <span>{servicesSection.kicker}</span>
              </div>

              <div className="overflow-hidden rounded-xl border border-white/10 sm:rounded-2xl">
                <img
                  src={servicesSection.officeImage}
                  alt={servicesSection.officeAlt}
                  width={480}
                  height={520}
                  className="h-48 w-full object-cover sm:h-64 lg:h-80"
                />
              </div>
            </div>

            {/* Right column: heading + 2x2 service cards */}
            <div className="lg:col-span-8">
              <div className="max-w-lg">
                <h2
                  id="services-title"
                  className="text-[1.75rem] font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
                >
                  {servicesSection.title}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-text-on-dark-muted)] sm:mt-3">
                  {servicesSection.lead}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
                {servicesSection.cards.map((card) => (
                  <article
                    key={card.id}
                    className={`card-interactive group flex min-h-[126px] flex-col justify-between rounded-xl p-5 sm:min-h-[168px] sm:p-6 ${
                      card.highlighted
                        ? "bg-[var(--color-lime)] text-[var(--color-forest)]"
                        : "bg-[var(--color-surface)] text-[var(--color-forest)]"
                    }`}
                  >
                    <div className="flex justify-end">
                      <span className="service-arrow-badge inline-flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-forest)] text-white">
                        <ArrowUpRightIcon className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="mt-4 sm:mt-6">
                      <h3 className="text-base font-semibold leading-snug tracking-tight sm:text-lg">
                        {card.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed opacity-80">
                        {card.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
