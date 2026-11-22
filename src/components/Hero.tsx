import { Fragment, useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";
import { SITE_CONTENT } from "../data/content";
import { ArrowRightIcon } from "./Icons";

export function Hero() {
  const { hero } = SITE_CONTENT;
  const [mounted, setMounted] = useState(
    () => typeof navigator !== "undefined" && Boolean(navigator.webdriver)
  );

  useEffect(() => {
    if (mounted) return;
    const raf = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(raf);
  }, [mounted]);

  return (
    <section aria-labelledby="hero-title" className="bg-[var(--color-lime)] text-[var(--color-olive-dark)]">
      {/* Upper hero block */}
      <div className="mx-auto max-w-[var(--container-max)] px-4 pb-8 pt-7 sm:px-6 sm:pb-12 sm:pt-14 lg:px-8 lg:pb-16 lg:pt-16">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <h1
              id="hero-title"
              className="text-[2rem] font-semibold leading-[1.08] tracking-tight text-[var(--color-olive-dark)] sm:text-5xl sm:leading-[1.05] lg:text-[4rem] lg:leading-[1.04]"
            >
              {hero.title.split("Costa Rica").map((part, idx, arr) => (
                <Fragment key={idx}>
                  {part}
                  {idx < arr.length - 1 && (
                    <span className="cr-flag-text">Costa Rica</span>
                  )}
                </Fragment>
              ))}
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--color-olive-dark)]/80 sm:mt-5 sm:text-lg">
              {hero.subtitle}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-7 sm:gap-3">
              <a
                href="#services"
                className="press-tactile cta-primary-hover inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[var(--color-olive-dark)] px-5 py-2.5 text-sm font-semibold text-white sm:px-6 sm:py-3"
              >
                <span>{hero.primaryCta}</span>
                <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a
                href="#process"
                className="inline-flex min-h-[44px] items-center rounded-full border border-[var(--color-olive-dark)]/40 px-5 py-2.5 text-sm font-semibold text-[var(--color-olive-dark)] transition-colors hover:bg-black/5 sm:px-6 sm:py-3"
              >
                {hero.secondaryCta}
              </a>
            </div>
          </div>

          {/* Geometric parallelogram motif (SVG) */}
          <div className="hidden justify-end lg:col-span-4 lg:flex" aria-hidden="true">
            <svg viewBox="0 0 220 110" className="h-24 w-48 text-[var(--color-olive-dark)]" fill="currentColor">
              <polygon points="36,12 72,12 54,50 18,50" />
              <polygon points="84,12 120,12 102,50 66,50" />
              <polygon points="132,12 168,12 150,50 114,50" />
              <polygon points="18,56 54,56 36,94 0,94" />
              <polygon points="66,56 102,56 84,94 48,94" />
              <polygon points="114,56 150,56 132,94 96,94" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hero visual media band */}
      <div className="relative mx-auto max-w-[1440px] overflow-hidden">
        <div className="relative h-[220px] w-full sm:h-[360px] lg:h-[440px]">
          <img
            src={hero.image}
            alt={hero.imageAlt}
            width={1440}
            height={440}
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover object-[35%_22%]"
          />
          {/* Subtle architectural grid line overlay from reference */}
          <svg
            aria-hidden="true"
            viewBox="0 0 400 220"
            className="pointer-events-none absolute bottom-0 left-4 h-44 w-72 text-white/30 sm:left-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <polygon points="40,40 110,40 80,110 10,110" />
            <polygon points="120,40 190,40 160,110 90,110" />
            <polygon points="10,120 80,120 50,190 -20,190" />
            <polygon points="90,120 160,120 130,190 60,190" />
          </svg>

          {/* Floating campaign stats card (desktop) */}
          <div className="hidden rounded-2xl border border-black/10 bg-white p-5 text-[var(--color-text-primary)] lg:absolute lg:right-8 lg:top-6 lg:block lg:w-[270px]">
            <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
              {hero.campaignCard.title}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-secondary)]">
              {hero.campaignCard.subtitle}
            </p>
            <div className="mt-4 space-y-3">
              {hero.campaignCard.channels.map((ch) => {
                const target = Number(ch.count.replace(/,/g, ""));
                const start = Math.max(0, Math.round(target * 0.88));
                return (
                  <div key={ch.name}>
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span>{ch.name}</span>
                      <span className="tabular-nums text-[var(--color-text-primary)]">
                        <NumberFlow
                          value={mounted ? target : start}
                          format={{ maximumFractionDigits: 0 }}
                          trend={1}
                          className="nf-number"
                        />
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/8">
                      <div
                        className="h-full rounded-full bg-[var(--color-lime-strong)]"
                        style={{ width: `${ch.percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile & tablet campaign stats card stacked cleanly below image */}
        <div className="bg-[var(--color-lime)] px-4 pb-5 pt-3.5 sm:px-6 sm:pb-6 sm:pt-4 lg:hidden">
          <div className="rounded-2xl border border-black/10 bg-white p-4 text-[var(--color-text-primary)] sm:p-5">
            <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
              {hero.campaignCard.title}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-secondary)]">
              {hero.campaignCard.subtitle}
            </p>
            <div className="mt-4 space-y-3">
              {hero.campaignCard.channels.map((ch) => {
                const target = Number(ch.count.replace(/,/g, ""));
                const start = Math.max(0, Math.round(target * 0.88));
                return (
                  <div key={ch.name}>
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span>{ch.name}</span>
                      <span className="tabular-nums text-[var(--color-text-primary)]">
                        <NumberFlow
                          value={mounted ? target : start}
                          format={{ maximumFractionDigits: 0 }}
                          trend={1}
                          className="nf-number"
                        />
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/8">
                      <div
                        className="h-full rounded-full bg-[var(--color-lime-strong)]"
                        style={{ width: `${ch.percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
