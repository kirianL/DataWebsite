import type { CSSProperties } from "react";
import NumberFlow, { type Format } from "@number-flow/react";
import { SITE_CONTENT } from "../data/content";
import { useInViewOnce, useReveal } from "../hooks/useReveal";
import { ActivationCardIcon, KickerMarkIcon } from "./Icons";

const METRIC_DELAYS = [0, 40, 85, 130];
const CARD_DELAYS = [0, 50, 110];

interface MetricFlowSpec {
  start: number;
  end: number;
  format: Format;
  suffix: string;
}

const METRIC_FLOWS: MetricFlowSpec[] = [
  { start: 90.0, end: 99.55, format: { minimumFractionDigits: 2, maximumFractionDigits: 2 }, suffix: "%" },
  { start: 28, end: 34, format: { maximumFractionDigits: 0 }, suffix: "B+" },
  { start: 4.2, end: 5.4, format: { minimumFractionDigits: 1, maximumFractionDigits: 1 }, suffix: "B+" },
  { start: 18, end: 24, format: { maximumFractionDigits: 0 }, suffix: "/5" },
];

export function MetricsAndActivation() {
  const { metricsSection, activationSection } = SITE_CONTENT;
  const metricsReveal = useReveal();
  const metricsInView = useInViewOnce(0.35);
  const cardsReveal = useReveal();
  const revealed = metricsInView.inView;

  return (
    <section
      id="activation"
      ref={metricsReveal.ref}
      aria-labelledby="metrics-lead"
      className="bg-[var(--color-surface)] py-11 sm:py-18 lg:py-24"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-4 sm:px-6 lg:px-8">
        {/* Top metric intro */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-[var(--color-text-secondary)]">
            <KickerMarkIcon className="h-3.5 w-3.5 text-[var(--color-olive-dark)]" />
            <span>{metricsSection.kicker}</span>
          </div>
          <p
            id="metrics-lead"
            className="mt-3 text-lg font-medium leading-snug tracking-tight text-[var(--color-text-primary)] sm:mt-4 sm:text-2xl"
          >
            {metricsSection.lead}
          </p>
        </div>

        {/* 4-column metric strip */}
        <div
          ref={metricsInView.ref}
          className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-[var(--color-border)] pt-7 sm:mt-12 sm:gap-8 sm:pt-10 lg:grid-cols-4"
        >
          {metricsSection.metrics.map((metric, idx) => {
            const flow = METRIC_FLOWS[idx];
            return (
              <div
                key={metric.label}
                data-visible={metricsReveal.visible}
                style={{ "--reveal-delay": `${METRIC_DELAYS[idx] ?? 0}ms` } as CSSProperties}
                className="reveal-item"
              >
                <div className="tabular-nums text-[2rem] font-semibold leading-none tracking-tight text-[var(--color-olive-dark)] sm:text-5xl">
                  {flow ? (
                    <NumberFlow
                      value={revealed ? flow.end : flow.start}
                      format={flow.format}
                      suffix={flow.suffix}
                      trend={1}
                      className="nf-number"
                    />
                  ) : (
                    metric.value
                  )}
                </div>
                <p className="mt-1.5 text-xs font-medium text-[var(--color-text-muted)] sm:mt-2 sm:text-sm">
                  {metric.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Data + activation block */}
        <div className="mt-12 border-t border-[var(--color-border)] pt-10 sm:mt-20 sm:pt-14">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-[var(--color-text-secondary)]">
              <KickerMarkIcon className="h-3.5 w-3.5 text-[var(--color-olive-dark)]" />
              <span>{activationSection.kicker}</span>
            </div>
            <p className="mt-3 text-lg font-medium leading-snug tracking-tight text-[var(--color-text-primary)] sm:mt-4 sm:text-2xl">
              {activationSection.lead}
            </p>
          </div>

          {/* Editorial asymmetric 3-item layout */}
          <div ref={cardsReveal.ref} className="mt-7 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-6 md:grid-cols-12">
            {activationSection.cards.map((card, idx) => {
              const spanClass =
                idx === 0
                  ? "md:col-span-5 bg-[var(--color-lime)] text-[var(--color-olive-dark)]"
                  : idx === 1
                    ? "md:col-span-4 bg-[var(--color-offwhite)] border border-[var(--color-border)] text-[var(--color-text-primary)]"
                    : "md:col-span-3 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)]";
              return (
                <article
                  key={card.id}
                  data-visible={cardsReveal.visible}
                  style={{ "--reveal-delay": `${CARD_DELAYS[idx] ?? 0}ms` } as CSSProperties}
                  className={`reveal-item flex flex-col justify-between rounded-2xl p-5 sm:p-7 ${spanClass}`}
                >
                  <div>
                    <ActivationCardIcon kind={card.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <div className="mt-5 sm:mt-10">
                    <h3 className="text-base font-semibold tracking-tight sm:text-lg">{card.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed opacity-80 sm:mt-2">{card.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
