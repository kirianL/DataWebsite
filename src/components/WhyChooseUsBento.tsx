import { useState } from "react";
import { SITE_CONTENT } from "../data/content";
import { ArrowUpRightIcon, KickerMarkIcon } from "./Icons";

const PIXEL_ROWS = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2],
];

const GROWTH_TIERS = [
  { id: "outer", stat: "4X", label: "2026 estimation", value: "$56.15B" },
  { id: "inner", stat: "2.6X", label: "2025 milestone", value: "$21.8B" },
  { id: "core", stat: "1.8X", label: "First 90 days", value: "$8.4B" },
] as const;

const PILL_NOTES: Record<string, string> = {
  Practical: "Direct playbooks built for daily shipping.",
  Transparent: "Live attribution visible to every stakeholder.",
  Scalable: "Architecture ready for billions of signals.",
};

const BAR_WIDTHS = ["w-[70%]", "w-[20%]", "w-[10%]"];
const BAR_COLORS = [
  "bg-[var(--color-lime)]",
  "bg-[var(--color-forest)]",
  "bg-[var(--color-border)]",
];

export function WhyChooseUsBento() {
  const { whyChooseUs } = SITE_CONTENT;
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const [activePill, setActivePill] = useState<string>(whyChooseUs.pills[1] ?? "Transparent");
  const [activeTier, setActiveTier] = useState<"outer" | "inner" | "core">("outer");
  const [activePhase, setActivePhase] = useState<number | null>(null);

  const currentGrowth =
    GROWTH_TIERS.find((tier) => tier.id === activeTier) ?? GROWTH_TIERS[0];

  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-title"
      className="bg-[var(--color-offwhite)] py-12 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-4 sm:px-6 lg:px-8">
        {/* Header row */}
        <div className="grid grid-cols-1 items-end gap-5 sm:gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-[var(--color-text-secondary)]">
              <KickerMarkIcon className="h-3.5 w-3.5 text-[var(--color-forest)]" />
              <span>{whyChooseUs.kicker}</span>
            </div>
            <h2
              id="why-choose-title"
              className="mt-2.5 text-[1.75rem] font-semibold leading-[1.1] tracking-tight text-[var(--color-forest)] sm:mt-3 sm:text-4xl lg:text-5xl"
            >
              {whyChooseUs.title}
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
              {whyChooseUs.lead}
            </p>
            <div className="bento-cta-group mt-4 inline-flex items-center gap-2 sm:mt-5">
              <a
                href="#services"
                className="press-tactile inline-flex min-h-[44px] items-center rounded-lg bg-[var(--color-forest)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-forest-soft)]"
              >
                {whyChooseUs.cta}
              </a>
              <a
                href="#services"
                aria-label="Open quote details"
                className="press-tactile inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--color-lime)] text-[var(--color-forest)]"
              >
                <ArrowUpRightIcon className="bento-arrow-icon h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Interactive asymmetric bento grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 md:grid-cols-12">
          {/* Left column: Aligned strategy (interactive pixel matrix) + Interactive pills */}
          <div className="flex flex-col gap-4 md:col-span-3">
            <article
              className="bento-card flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5 hover:border-[var(--color-forest)]/25"
              onMouseLeave={() => setHoveredCol(null)}
            >
              <div
                className="grid grid-cols-12 gap-1"
                role="group"
                aria-label="Interactive strategy alignment matrix"
              >
                {PIXEL_ROWS.map((row, rowIdx) =>
                  row.map((cell, colIdx) => {
                    const isColActive = hoveredCol === colIdx;
                    const isNeighbor =
                      hoveredCol !== null && Math.abs(hoveredCol - colIdx) === 1;
                    const baseColor =
                      cell === 2
                        ? "bg-[var(--color-forest)]"
                        : cell === 1
                          ? "bg-[var(--color-lime)]"
                          : "bg-[var(--color-lime)]/35";
                    const activeColor = isColActive
                      ? rowIdx >= 2
                        ? "bg-[var(--color-forest)] scale-110"
                        : "bg-[var(--color-lime-strong)] scale-105"
                      : isNeighbor
                        ? `${baseColor} opacity-95`
                        : hoveredCol !== null
                          ? `${baseColor} opacity-55`
                          : baseColor;

                    return (
                      <button
                        key={`${rowIdx}-${colIdx}`}
                        type="button"
                        tabIndex={rowIdx === 0 ? 0 : -1}
                        aria-label={`Inspect signal column ${colIdx + 1}`}
                        onMouseEnter={() => setHoveredCol(colIdx)}
                        onFocus={() => setHoveredCol(colIdx)}
                        onBlur={() => setHoveredCol(null)}
                        style={{
                          transitionDelay: isColActive ? `${(6 - rowIdx) * 16}ms` : "0ms",
                        }}
                        className={`bento-pixel aspect-square rounded-[2px] cursor-pointer ${activeColor}`}
                      />
                    );
                  })
                )}
              </div>

              <div className="mt-5 sm:mt-8">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-[var(--color-forest)]">
                    {whyChooseUs.alignedStrategy.title}
                  </h3>
                  <span className="tabular-nums text-[11px] font-medium text-[var(--color-text-muted)]">
                    {hoveredCol !== null ? `Signal ${String(hoveredCol + 1).padStart(2, "0")}` : "12/12"}
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  {whyChooseUs.alignedStrategy.description}
                </p>
              </div>
            </article>

            {/* Interactive pills selector (compact horizontal wrap on mobile, stacked on md+) */}
            <div className="bento-card flex flex-1 flex-col items-center justify-center gap-2.5 rounded-2xl bg-[var(--color-lime)] p-4 sm:p-6">
              <div
                className="flex flex-row flex-wrap items-center justify-center gap-2 md:flex-col md:gap-2.5"
                role="group"
                aria-label="Core operating principles"
              >
                {whyChooseUs.pills.map((pill) => {
                  const isActive = activePill === pill;
                  return (
                    <button
                      key={pill}
                      type="button"
                      aria-pressed={isActive}
                      onMouseEnter={() => setActivePill(pill)}
                      onClick={() => setActivePill(pill)}
                      className={`press-tactile inline-flex min-h-[40px] cursor-pointer items-center justify-center rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-200 sm:min-w-[138px] sm:px-5 sm:py-2 sm:text-sm ${
                        isActive
                          ? "bg-[var(--color-forest)] text-white"
                          : "bg-black/10 text-[var(--color-forest)] hover:bg-black/15"
                      }`}
                    >
                      {pill}
                    </button>
                  );
                })}
              </div>
              <p className="mt-1.5 flex min-h-[2.75rem] items-center justify-center text-center text-xs leading-snug text-[var(--color-forest)]/80 sm:text-[11px]">
                {PILL_NOTES[activePill]}
              </p>
            </div>
          </div>

          {/* Center column: Editorial portrait (bounded height on mobile so it never towers) */}
          <div className="md:col-span-3">
            <div className="bento-portrait-wrap h-[260px] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] sm:h-[340px] md:h-full md:min-h-[340px]">
              <img
                src={whyChooseUs.portrait}
                alt={whyChooseUs.portraitAlt}
                width={420}
                height={560}
                className="bento-portrait-img h-full w-full object-cover object-[50%_20%]"
              />
            </div>
          </div>

          {/* Right column: Proven growth 4X (interactive rings) + Faster execution & Dark card */}
          <div className="flex flex-col gap-4 md:col-span-6">
            {/* Proven Growth 4X */}
            <article className="bento-card grid grid-cols-1 items-center gap-4 rounded-2xl bg-[var(--color-lime)] p-5 sm:grid-cols-12 sm:gap-6 sm:p-6">
              <div className="flex h-full flex-col justify-between sm:col-span-6">
                <div>
                  <h3 className="text-base font-semibold text-[var(--color-forest)]">
                    {whyChooseUs.provenGrowth.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-forest)]/80">
                    {whyChooseUs.provenGrowth.description}
                  </p>
                </div>
                <div className="mt-5 sm:mt-8">
                  <div className="tabular-nums text-4xl font-bold tracking-tight text-[var(--color-forest)] transition-opacity duration-200 sm:text-5xl">
                    {currentGrowth.stat}
                  </div>
                  <div className="mt-1 text-xs font-medium text-[var(--color-forest)]/75 sm:text-[11px]">
                    {currentGrowth.label} — {currentGrowth.value}
                  </div>
                </div>
              </div>

              <div className="flex justify-center sm:col-span-6">
                <svg
                  viewBox="0 0 220 220"
                  className="h-36 w-36 text-[var(--color-forest)] sm:h-44 sm:w-44"
                  role="img"
                  aria-label="Interactive growth estimation concentric rings"
                >
                  {/* Outer 2026 ring */}
                  <g
                    role="button"
                    tabIndex={0}
                    aria-label="2026 estimation: 4X ($56.15B)"
                    className="bento-ring cursor-pointer focus:outline-none"
                    style={{
                      transform: activeTier === "outer" ? "scale(1.02)" : "scale(1)",
                      opacity: activeTier === "outer" ? 1 : 0.65,
                    }}
                    onMouseEnter={() => setActiveTier("outer")}
                    onFocus={() => setActiveTier("outer")}
                    onClick={() => setActiveTier("outer")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveTier("outer");
                      }
                    }}
                  >
                    <circle
                      cx="110"
                      cy="110"
                      r="96"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth={activeTier === "outer" ? 1.75 : 1}
                    />
                    <text x="110" y="34" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.75">
                      2026 estimation
                    </text>
                    <text x="110" y="48" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">
                      {whyChooseUs.provenGrowth.outerValue}
                    </text>
                  </g>

                  {/* Middle 2025 ring */}
                  <g
                    role="button"
                    tabIndex={0}
                    aria-label="2025 milestone: 2.6X ($21.8B)"
                    className="bento-ring cursor-pointer focus:outline-none"
                    style={{
                      transform: activeTier === "inner" ? "scale(1.04)" : "scale(1)",
                      opacity: activeTier === "inner" ? 1 : 0.72,
                    }}
                    onMouseEnter={() => setActiveTier("inner")}
                    onFocus={() => setActiveTier("inner")}
                    onClick={() => setActiveTier("inner")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveTier("inner");
                      }
                    }}
                  >
                    <circle
                      cx="110"
                      cy="136"
                      r="63"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth={activeTier === "inner" ? 1.75 : 1}
                    />
                    <text x="110" y="96" textAnchor="middle" fontSize="8" fill="currentColor" opacity="0.75">
                      2025
                    </text>
                    <text x="110" y="109" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">
                      {whyChooseUs.provenGrowth.innerValue}
                    </text>
                  </g>

                  {/* Core circle */}
                  <circle
                    role="button"
                    tabIndex={0}
                    aria-label="First 90 days: 1.8X ($8.4B)"
                    cx="110"
                    cy="168"
                    r="28"
                    fill="currentColor"
                    className="bento-ring cursor-pointer focus:outline-none"
                    style={{
                      transform: activeTier === "core" ? "scale(1.08)" : "scale(1)",
                    }}
                    onMouseEnter={() => setActiveTier("core")}
                    onFocus={() => setActiveTier("core")}
                    onClick={() => setActiveTier("core")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveTier("core");
                      }
                    }}
                  />
                </svg>
              </div>
            </article>

            {/* Bottom split inside right column */}
            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Interactive Faster Execution timeline */}
              <article
                className="bento-card flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-forest)]/25"
                onMouseLeave={() => setActivePhase(null)}
              >
                <div>
                  <h3 className="text-base font-semibold text-[var(--color-forest)]">
                    {whyChooseUs.fasterExecution.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                    {whyChooseUs.fasterExecution.description}
                  </p>
                </div>

                <div className="mt-6">
                  <div className="flex h-12 w-full gap-1 rounded-lg">
                    {whyChooseUs.fasterExecution.phases.map((phase, idx) => {
                      const isSelected = activePhase === idx;
                      const isDimmed = activePhase !== null && activePhase !== idx;
                      return (
                        <button
                          key={phase.label}
                          type="button"
                          aria-label={`${phase.label}: ${phase.duration}`}
                          aria-pressed={isSelected}
                          onMouseEnter={() => setActivePhase(idx)}
                          onFocus={() => setActivePhase(idx)}
                          onBlur={() => setActivePhase(null)}
                          onClick={() => setActivePhase((prev) => (prev === idx ? null : idx))}
                          className={`bento-bar-segment press-tactile h-full cursor-pointer rounded-md ${BAR_WIDTHS[idx]} ${BAR_COLORS[idx]} ${
                            isSelected ? "scale-y-105" : ""
                          } ${isDimmed ? "opacity-35" : "opacity-100"}`}
                        />
                      );
                    })}
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] leading-tight">
                    {whyChooseUs.fasterExecution.phases.map((phase, idx) => {
                      const isSelected = activePhase === idx;
                      const isDimmed = activePhase !== null && activePhase !== idx;
                      return (
                        <button
                          key={phase.label}
                          type="button"
                          onMouseEnter={() => setActivePhase(idx)}
                          onClick={() => setActivePhase((prev) => (prev === idx ? null : idx))}
                          className={`cursor-pointer rounded text-left transition-opacity duration-150 ${
                            isDimmed ? "opacity-40" : "opacity-100"
                          }`}
                        >
                          <div
                            className={`font-medium ${
                              isSelected
                                ? "text-[var(--color-forest)] underline decoration-[var(--color-lime-strong)] decoration-2 underline-offset-4"
                                : "text-[var(--color-forest)]"
                            }`}
                          >
                            {phase.label}
                          </div>
                          <div className="tabular-nums text-[var(--color-text-secondary)] opacity-80">
                            {phase.duration}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </article>

              {/* Dark brand card with rotating lime mark on hover */}
              <article className="bento-card bento-dark-card flex flex-col justify-between rounded-2xl bg-[var(--color-forest)] p-6 text-white">
                <KickerMarkIcon className="bento-mark-icon h-5 w-5 text-[var(--color-lime)]" />
                <p className="mt-10 text-sm leading-relaxed text-white/90">
                  {whyChooseUs.darkCardCopy}
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
