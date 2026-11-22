import { useEffect, useRef, useState } from "react";
import NumberFlow from "@number-flow/react";
import { SITE_CONTENT } from "../data/content";

export function SplitChart() {
  const { splitChart } = SITE_CONTENT;
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(
    () => typeof navigator !== "undefined" && Boolean(navigator.webdriver)
  );
  const targetStat = Number(splitChart.statValue.replace(/[^0-9.]/g, "")) || 2;

  useEffect(() => {
    if (revealed) return;
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="split-chart-title"
      className="relative overflow-hidden bg-[#1e1f1f] py-11 sm:py-18 lg:py-24"
    >
      {/* Subtle full-height outer architectural vertical grid lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mx-auto grid max-w-[1440px] grid-cols-4"
      >
        <div className="border-r border-white/[0.055]" />
        <div className="border-r border-white/[0.055]" />
        <div className="border-r border-white/[0.055]" />
        <div />
      </div>

      <div className="relative mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[20px] border border-[#6be874]/45 lg:aspect-[1000/560] lg:rounded-[22px]">
          {/* DESKTOP 50/50 SPLIT CARD */}
          <div className="hidden h-full lg:grid lg:grid-cols-2">
            {/* LEFT HALF (pure white daytime canvas) */}
            <div className="relative flex flex-col justify-between overflow-hidden bg-white p-11 text-[#161a18]">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <span className="absolute inset-y-0 left-[11.5%] w-px bg-black/[0.045]" />
                <span className="absolute inset-y-0 left-[47.5%] w-px bg-black/[0.045]" />
                <span className="absolute inset-y-0 left-[84%] w-px bg-black/[0.045]" />
              </div>

              <div className="relative z-10">
                <span className="inline-flex items-center rounded-full bg-[#77f57a] px-3.5 py-1 text-[11px] font-medium text-[#142619]">
                  {splitChart.kicker}
                </span>

                <h2
                  id="split-chart-title"
                  className="font-extended mt-4 text-[22px] leading-[1.35] tracking-[-0.01em] text-[#171b19]"
                >
                  <span className="block">{splitChart.titleLine1}</span>
                  <span className="block">{splitChart.titleLine2}</span>
                </h2>

                <div className="mt-14">
                  <div className="flex items-baseline gap-2">
                    <span className="font-extended tabular-nums text-[34px] leading-none text-[#171b19]">
                      <NumberFlow
                        value={revealed ? targetStat : 1}
                        format={{ maximumFractionDigits: 0 }}
                        suffix="M+"
                        trend={1}
                        className="nf-number"
                      />
                    </span>
                    <span className="text-[12px] font-medium text-[#4b5550]">
                      {splitChart.statUnit}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11px] font-normal text-[#4b5550]">
                    {splitChart.statLabel}
                  </p>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden"
              >
                <img
                  src={splitChart.skylineImage}
                  alt=""
                  width={1344}
                  height={553}
                  decoding="async"
                  className="block h-auto w-full -scale-x-100 translate-y-[34%] brightness-[1.28] contrast-[0.9] saturate-0"
                />
                <svg
                  viewBox="0 0 24 32"
                  fill="#74f37a"
                  className="absolute bottom-3 left-[9%] h-6 w-4 drop-shadow-sm"
                >
                  <path d="M13 1L2 18h8l-2 13 13-17h-8l0-13z" />
                </svg>
              </div>
            </div>

            {/* RIGHT HALF (dark night canvas) */}
            <div className="relative flex flex-col justify-end overflow-hidden bg-[#1c1d1d] p-11 pb-[39%] text-white">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <span className="absolute inset-y-0 left-[18%] w-px bg-white/[0.055]" />
                <span className="absolute inset-y-0 left-[54%] w-px bg-white/[0.055]" />
                <span className="absolute inset-y-0 left-[89%] w-px bg-white/[0.055]" />
              </div>

              <p className="relative z-30 pl-8 text-[28px] font-light leading-[1.22] tracking-[-0.02em] text-white/95">
                <span className="block">{splitChart.rightStatementLine1}</span>
                <span className="block">{splitChart.rightStatementLine2}</span>
                <span className="block">{splitChart.rightStatementLine3}</span>
              </p>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden"
              >
                <img
                  src={splitChart.skylineImage}
                  alt={splitChart.skylineAlt}
                  width={1344}
                  height={553}
                  decoding="async"
                  className="block h-auto w-full translate-y-[14%] brightness-[0.95] contrast-[1.2]"
                />
              </div>
            </div>
          </div>

          {/* DESKTOP UNIFIED CURVE + LIQUID-MORPHED CALLOUTS */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 560"
            className="pointer-events-none absolute inset-0 z-20 hidden h-full w-full lg:block"
          >
            <defs>
              <linearGradient id="grid-curve-split" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="50%" stopColor="#3a6d59" />
                <stop offset="50.01%" stopColor="#74f37a" />
              </linearGradient>

              <filter id="morph-goo" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -11"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>

            <path
              d="M 58,370 C 122,396 182,424 238,424 C 290,424 316,396 362,384 C 402,374 442,373 475,376 C 490,378 500,372 518,354 C 552,320 564,270 588,236 C 618,195 668,192 710,168 C 736,154 754,152 770,152 C 815,152 854,188 888,224 C 912,248 930,256 946,266"
              fill="none"
              stroke="url(#grid-curve-split)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            <g filter="url(#morph-goo)">
              <rect x="110" y="336" width="119" height="77" rx="12" fill="#3a6d59" />
              <line
                x1="220"
                y1="406"
                x2="238"
                y2="424"
                stroke="#3a6d59"
                strokeWidth="16"
                strokeLinecap="round"
              />
              <circle cx="238" cy="424" r="13.5" fill="#3a6d59" />
            </g>

            <g fill="#ffffff" fontFamily="Inter, sans-serif">
              <text x="124" y="361" fontSize="11.5" fontWeight="600">
                {splitChart.dipTitle}
              </text>
              <text x="124" y="379" fontSize="10.8" fill="rgba(255,255,255,0.88)">
                {splitChart.dipLine1}
              </text>
              <text x="124" y="395" fontSize="10.8" fill="rgba(255,255,255,0.88)">
                {splitChart.dipLine2}
              </text>
            </g>
            <g transform="translate(238, 424)" stroke="#ffffff" strokeWidth="1.2" fill="none">
              <circle cx="0" cy="0" r="3.2" />
              <line x1="0" y1="-6.4" x2="0" y2="-4.8" />
              <line x1="0" y1="4.8" x2="0" y2="6.4" />
              <line x1="-6.4" y1="0" x2="-4.8" y2="0" />
              <line x1="4.8" y1="0" x2="6.4" y2="0" />
              <line x1="-4.5" y1="-4.5" x2="-3.4" y2="-3.4" />
              <line x1="3.4" y1="3.4" x2="4.5" y2="4.5" />
              <line x1="4.5" y1="-4.5" x2="3.4" y2="-3.4" />
              <line x1="-3.4" y1="3.4" x2="-4.5" y2="4.5" />
            </g>

            <g filter="url(#morph-goo)">
              <rect x="604" y="64" width="156" height="77" rx="12" fill="#74f37a" />
              <line
                x1="752"
                y1="134"
                x2="770"
                y2="152"
                stroke="#74f37a"
                strokeWidth="16"
                strokeLinecap="round"
              />
              <circle cx="770" cy="152" r="13.5" fill="#74f37a" />
            </g>

            <g fill="#142619" fontFamily="Inter, sans-serif">
              <text x="619" y="89" fontSize="11.5" fontWeight="600">
                {splitChart.spikeTitle}
              </text>
              <text x="619" y="107" fontSize="10.8" fill="rgba(20,38,25,0.85)">
                {splitChart.spikeLine1}
              </text>
              <text x="619" y="123" fontSize="10.8" fill="rgba(20,38,25,0.85)">
                {splitChart.spikeLine2}
              </text>
            </g>
            <g
              transform="translate(770, 152)"
              stroke="#142619"
              strokeWidth="1.35"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.6 -4.2 A4.7 4.7 0 1 0 4.3 2.9 A3.7 3.7 0 0 1 2.6 -4.2 Z" />
            </g>

            <g fontFamily="Inter, sans-serif" fontSize="9.5" fontWeight="500">
              <text x="63" y="398" fill="#6b7280">8AM</text>
              <text x="243" y="450" fill="#6b7280">12PM</text>
              <text x="418" y="392" fill="#6b7280">3PM</text>
              <text x="596" y="250" fill="#9ca3af">6PM</text>
              <text x="774" y="182" fill="#9ca3af">9PM</text>
              <text x="918" y="286" fill="#9ca3af">12AM</text>
            </g>
          </svg>

          {/* MOBILE & TABLET DEDICATED COMPACT LAYOUT (clean horizontal split, unified dark chart canvas) */}
          <div className="lg:hidden">
            {/* Clean white top header */}
            <div className="bg-white p-5 sm:p-7 text-[#161a18]">
              <span className="inline-flex items-center rounded-full bg-[#77f57a] px-3 py-1 text-[11px] font-medium text-[#142619]">
                {splitChart.kicker}
              </span>
              <h2 className="font-extended mt-3 text-[17px] leading-[1.35] text-[#171b19] sm:text-[21px]">
                {splitChart.titleLine1} {splitChart.titleLine2}
              </h2>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-extended tabular-nums text-[28px] leading-none text-[#171b19] sm:text-[32px]">
                  <NumberFlow
                    value={revealed ? targetStat : 1}
                    format={{ maximumFractionDigits: 0 }}
                    suffix="M+"
                    trend={1}
                    className="nf-number"
                  />
                </span>
                <span className="text-xs font-medium text-[#4b5550]">{splitChart.statUnit}</span>
              </div>
              <p className="mt-1 text-xs text-[#4b5550]">{splitChart.statLabel}</p>
            </div>

            {/* Unified dark chart + callouts + statement + skyline */}
            <div className="relative overflow-hidden bg-[#1c1d1d] px-5 pb-24 pt-5 text-white sm:px-7 sm:pb-32 sm:pt-7">
              {/* Subtle vertical grid lines */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid grid-cols-4">
                <div className="border-r border-white/[0.045]" />
                <div className="border-r border-white/[0.045]" />
                <div className="border-r border-white/[0.045]" />
                <div />
              </div>

              {/* Clean full-width dark chart curve */}
              <div className="relative z-20 mb-5 rounded-xl border border-white/10 bg-[#151716]/80 px-2 py-3">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 360 124"
                  className="block h-auto w-full"
                >
                  <defs>
                    <linearGradient id="mobile-curve-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#438168" />
                      <stop offset="50%" stopColor="#5cc976" />
                      <stop offset="100%" stopColor="#74f37a" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 16,78 C 46,90 68,100 94,100 C 122,100 142,80 180,76 C 204,72 218,46 240,34 C 260,24 272,20 286,20 C 308,20 326,42 344,62"
                    fill="none"
                    stroke="url(#mobile-curve-grad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="94" cy="100" r="8" fill="#3a6d59" />
                  <circle cx="94" cy="100" r="2.2" fill="#ffffff" />
                  <circle cx="286" cy="20" r="8" fill="#74f37a" />
                  <path
                    d="M287.5 17.5 A3.2 3.2 0 1 0 288.8 21.9 A2.6 2.6 0 0 1 287.5 17.5 Z"
                    fill="none"
                    stroke="#142619"
                    strokeWidth="1.2"
                  />
                  <g fontFamily="Inter, sans-serif" fontSize="8.5" fontWeight="500" fill="#9ca3af">
                    <text x="14" y="96">8AM</text>
                    <text x="84" y="119">12PM</text>
                    <text x="150" y="94">3PM</text>
                    <text x="218" y="60">6PM</text>
                    <text x="278" y="42">9PM</text>
                    <text x="326" y="78">12AM</text>
                  </g>
                </svg>
              </div>

              <div className="relative z-20 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
                <div className="rounded-xl bg-[#3a6d59] p-3.5 text-xs text-white">
                  <div className="font-semibold">{splitChart.dipTitle}</div>
                  <p className="mt-1 text-white/85">
                    {splitChart.dipLine1} {splitChart.dipLine2}
                  </p>
                </div>
                <div className="rounded-xl bg-[#74f37a] p-3.5 text-xs text-[#142619]">
                  <div className="font-semibold">{splitChart.spikeTitle}</div>
                  <p className="mt-1 text-[#142619]/85">
                    {splitChart.spikeLine1} {splitChart.spikeLine2}
                  </p>
                </div>
              </div>

              <p className="relative z-20 mt-6 text-xl font-light leading-snug tracking-tight text-white/95 sm:text-2xl">
                {splitChart.rightStatementLine1} {splitChart.rightStatementLine2}{" "}
                {splitChart.rightStatementLine3}
              </p>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden"
              >
                <img
                  src={splitChart.skylineImage}
                  alt={splitChart.skylineAlt}
                  width={1344}
                  height={553}
                  className="block h-auto w-full translate-y-[22%] brightness-[0.95] contrast-[1.2]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
