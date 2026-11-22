import { useEffect, useRef, useState } from "react";
import { SITE_CONTENT } from "../data/content";
import { BrandMarkIcon, CloseIcon, MenuIcon } from "./Icons";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header className="bg-[var(--color-lime)] text-[var(--color-olive-dark)] border-b border-black/10">
      {/* Top announcement strip */}
      <div className="border-b border-black/10">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-wrap items-center justify-between gap-2 px-4 py-1.5 text-[11px] leading-snug sm:px-6 sm:py-2 sm:text-xs lg:px-8">
          <p className="font-medium text-[var(--color-olive-dark)]/85">
            {SITE_CONTENT.topBar.announcement}
          </p>
          <div className="hidden items-center gap-6 text-[var(--color-olive-dark)]/80 sm:flex">
            <span className="tabular-nums">{SITE_CONTENT.topBar.phone}</span>
            <span>{SITE_CONTENT.topBar.address}</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-[var(--container-max)] items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8"
      >
        <a href="#" className="flex items-center gap-2 text-base font-bold tracking-tight sm:gap-2.5 sm:text-lg">
          <BrandMarkIcon className="h-5 w-5 text-[var(--color-olive-dark)]" />
          <span>{SITE_CONTENT.nav.brand}</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {SITE_CONTENT.nav.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[var(--color-olive-dark)]/85 transition-colors hover:text-[var(--color-olive-dark)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="#faq"
            className="text-sm font-medium text-[var(--color-olive-dark)]/90 transition-colors hover:text-[var(--color-olive-dark)]"
          >
            {SITE_CONTENT.nav.signIn}
          </a>
          <a
            href="#services"
            className="rounded-full bg-[var(--color-olive-dark)] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {SITE_CONTENT.nav.cta}
          </a>
        </div>

        <button
          ref={toggleBtnRef}
          type="button"
          className="press-tactile inline-flex items-center justify-center rounded-lg p-2 text-[var(--color-olive-dark)] md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-drawer"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="mobile-drawer border-t border-black/10 bg-[var(--color-lime)] px-4 pb-6 pt-4 md:hidden"
        >
          <div className="flex flex-col gap-3">
            {SITE_CONTENT.nav.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-2 py-2 text-base font-medium text-[var(--color-olive-dark)] hover:bg-black/5"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-3 border-t border-black/10 pt-4">
              <a
                href="#faq"
                onClick={() => setMobileOpen(false)}
                className="rounded-full border border-[var(--color-olive-dark)]/30 px-4 py-2 text-sm font-medium"
              >
                {SITE_CONTENT.nav.signIn}
              </a>
              <a
                href="#services"
                onClick={() => setMobileOpen(false)}
                className="rounded-full bg-[var(--color-olive-dark)] px-5 py-2 text-sm font-semibold text-white"
              >
                {SITE_CONTENT.nav.cta}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
