import { useRef, useState } from "react";
import { SITE_CONTENT } from "../data/content";
import { ChevronDownIcon, KickerMarkIcon } from "./Icons";

export function FaqSection() {
  const { faqSection } = SITE_CONTENT;
  const [openId, setOpenId] = useState<string | null>(faqSection.items[0]?.id ?? null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (index: number, key: string) => {
    const count = faqSection.items.length;
    if (key === "ArrowDown") {
      buttonRefs.current[(index + 1) % count]?.focus();
    } else if (key === "ArrowUp") {
      buttonRefs.current[(index - 1 + count) % count]?.focus();
    } else if (key === "Home") {
      buttonRefs.current[0]?.focus();
    } else if (key === "End") {
      buttonRefs.current[count - 1]?.focus();
    }
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-11 sm:py-18 lg:py-24"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-7 sm:gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-[var(--color-text-secondary)]">
              <KickerMarkIcon className="h-3.5 w-3.5 text-[var(--color-forest)]" />
              <span>{faqSection.kicker}</span>
            </div>
            <h2
              id="faq-title"
              className="mt-2.5 text-[1.75rem] font-semibold tracking-tight text-[var(--color-forest)] sm:mt-3 sm:text-4xl"
            >
              {faqSection.title}
            </h2>
          </div>

          <div className="divide-y divide-[var(--color-border)] border-t border-b border-[var(--color-border)] lg:col-span-8">
            {faqSection.items.map((item, idx) => {
              const isOpen = openId === item.id;
              const buttonId = `${item.id}-btn`;
              const panelId = `${item.id}-panel`;
              return (
                <div key={item.id} className="py-4 sm:py-5">
                  <button
                    ref={(el) => {
                      buttonRefs.current[idx] = el;
                    }}
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    onKeyDown={(e) => {
                      if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
                        e.preventDefault();
                        handleKeyDown(idx, e.key);
                      }
                    }}
                    className="flex min-h-[44px] w-full items-center justify-between gap-3 text-left sm:gap-4"
                  >
                    <div className="flex items-baseline gap-3.5 sm:gap-5">
                      <span className="tabular-nums text-xs font-medium text-[var(--color-text-muted)]">
                        {item.number}
                      </span>
                      <span className="text-[15px] font-medium leading-snug text-[var(--color-forest)] sm:text-lg">
                        {item.question}
                      </span>
                    </div>
                    <span
                      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] transition-transform ${
                        isOpen ? "rotate-180 bg-[var(--color-forest)] text-white" : "text-[var(--color-forest)]"
                      }`}
                    >
                      <ChevronDownIcon className="h-4 w-4" />
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!isOpen}
                    data-open={isOpen}
                    className="faq-panel"
                  >
                    <div className="faq-panel-inner">
                      <div className="mt-2.5 pl-7 pr-4 text-sm leading-relaxed text-[var(--color-text-secondary)] sm:mt-3 sm:pl-9 sm:pr-10">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { footer } = SITE_CONTENT;
  return (
    <footer className="bg-[var(--color-forest)] py-8 text-white">
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col items-start justify-between gap-4 px-4 text-xs text-white/75 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <span>{footer.brand}</span>
        <a
          href={`mailto:${footer.email}`}
          className="transition-colors hover:text-[var(--color-lime)]"
        >
          Email — {footer.email}
        </a>
      </div>
    </footer>
  );
}
