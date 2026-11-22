import type { CSSProperties } from "react";
import { SITE_CONTENT } from "../data/content";
import { useReveal } from "../hooks/useReveal";
import { ArrowUpRightIcon, KickerMarkIcon } from "./Icons";

const INSIGHT_DELAYS = [0, 50, 100];

export function ProcessAndInsights() {
  const { processSection, insightsSection } = SITE_CONTENT;
  const insightsReveal = useReveal();

  return (
    <>
      {/* Process / Strategy call steps */}
      <section
        id="process"
        aria-labelledby="process-title"
        className="bg-[var(--color-surface)] py-11 sm:py-18 lg:py-24"
      >
        <div className="mx-auto max-w-[var(--container-max)] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-medium text-[var(--color-text-secondary)]">
                <KickerMarkIcon className="h-3.5 w-3.5 text-[var(--color-forest)]" />
                <span>{processSection.kicker}</span>
              </div>
              <h2
                id="process-title"
                className="mt-2.5 text-[1.75rem] font-semibold tracking-tight text-[var(--color-forest)] sm:mt-3 sm:text-4xl"
              >
                {processSection.title}
              </h2>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-12">
            {/* Editorial case image */}
            <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] lg:col-span-5">
              <img
                src={processSection.caseImage}
                alt={processSection.caseImageAlt}
                width={520}
                height={380}
                className="h-48 w-full object-cover sm:h-64 lg:h-full lg:min-h-[260px]"
              />
            </div>

            {/* 3 numbered dark cards */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:col-span-7">
              {processSection.steps.map((step) => (
                <article
                  key={step.number}
                  className="flex flex-col justify-between rounded-2xl bg-[var(--color-forest)] p-5 text-white sm:p-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold tracking-tight">{step.title}</h3>
                    <span className="tabular-nums text-xs font-semibold text-[var(--color-lime)]">
                      {step.number}
                    </span>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-[var(--color-text-on-dark-muted)] sm:mt-10">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Insights editorial section */}
      <section
        id="insights"
        aria-labelledby="insights-title"
        className="editorial-grid-bg border-t border-[var(--color-border)] bg-[var(--color-offwhite)] py-11 sm:py-18 lg:py-24"
      >
        <div className="mx-auto max-w-[var(--container-max)] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-medium text-[var(--color-text-secondary)]">
                <KickerMarkIcon className="h-3.5 w-3.5 text-[var(--color-forest)]" />
                <span>{insightsSection.kicker}</span>
              </div>
              <h2
                id="insights-title"
                className="mt-2.5 max-w-md text-[1.75rem] font-semibold leading-tight tracking-tight text-[var(--color-forest)] sm:mt-3 sm:text-4xl"
              >
                {insightsSection.title}
              </h2>
            </div>

            <a
              href="#faq"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[var(--color-forest)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-forest-soft)]"
            >
              <span>{insightsSection.cta}</span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-[var(--color-lime)] text-[var(--color-forest)]">
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>

          <div ref={insightsReveal.ref} className="mt-7 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-6 md:grid-cols-12">
            {insightsSection.posts.map((post, idx) => (
              <article
                key={post.id}
                data-visible={insightsReveal.visible}
                style={{ "--reveal-delay": `${INSIGHT_DELAYS[idx] ?? 0}ms` } as CSSProperties}
                className={`reveal-item overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] ${
                  idx === 0 ? "md:col-span-5" : idx === 1 ? "md:col-span-4" : "md:col-span-3"
                }`}
              >
                <div className="h-40 w-full overflow-hidden sm:h-48">
                  <img
                    src={post.image}
                    alt={post.alt}
                    width={480}
                    height={320}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <span className="inline-flex rounded-md bg-[var(--color-lime)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-forest)]">
                    {post.category}
                  </span>
                  <h3 className="mt-2.5 text-base font-semibold leading-snug tracking-tight text-[var(--color-forest)] sm:mt-3">
                    {post.title}
                  </h3>
                  <div className="mt-3.5 flex items-center justify-between border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-text-muted)] sm:mt-4">
                    <span className="font-medium text-[var(--color-text-primary)]">{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
