import { useEffect, useRef, useState } from "react";
import { SITE_CONTENT } from "../data/content";
import { BrandMarkIcon, CloseIcon, MenuIcon } from "./Icons";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [newsIndex, setNewsIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const announcements = SITE_CONTENT.topBar.announcements;

  useEffect(() => {
    if (announcements.length <= 1 || isPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [announcements.length, isPaused]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const closeDrawer = () => {
    setMobileOpen(false);
    toggleBtnRef.current?.focus();
  };

  return (
    <header className="bg-[var(--color-lime)] pt-[env(safe-area-inset-top)] text-[var(--color-olive-dark)] border-b border-black/10">
      {/* Top announcement strip */}
      <div
        className="border-b border-black/10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="mx-auto flex max-w-[var(--container-max)] items-center justify-between gap-4 px-4 py-1.5 text-[11px] sm:px-6 sm:py-2 sm:text-xs lg:px-8">
          <div className="h-5 min-w-0 flex-1 overflow-hidden" aria-live="polite">
            <p
              key={newsIndex}
              title={announcements[newsIndex]}
              className="news-ticker-item truncate font-medium leading-5 text-[var(--color-olive-dark)]/85"
            >
              {announcements[newsIndex]}
            </p>
          </div>
          <div className="hidden shrink-0 items-center gap-6 text-[var(--color-olive-dark)]/80 sm:flex">
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
            className="press-tactile cta-primary-hover rounded-full bg-[var(--color-olive-dark)] px-5 py-2.5 text-sm font-semibold text-white"
          >
            {SITE_CONTENT.nav.cta}
          </a>
        </div>

        <button
          ref={toggleBtnRef}
          type="button"
          className="press-tactile inline-flex h-11 w-11 items-center justify-center rounded-lg text-[var(--color-olive-dark)] md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-drawer"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {/* Fixed overlay mobile drawer (never shifts page layout) */}
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileOpen}
        aria-label="Mobile navigation"
        data-open={mobileOpen}
        className="mobile-drawer-backdrop fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-[2px] md:hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeDrawer();
        }}
      >
        <div className="mobile-drawer-panel flex h-full w-[min(86vw,340px)] flex-col justify-between border-l border-black/10 bg-[var(--color-lime)] p-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <div>
            <div className="flex items-center justify-between border-b border-black/10 pb-4">
              <a
                href="#"
                onClick={closeDrawer}
                className="flex items-center gap-2 text-base font-bold tracking-tight text-[var(--color-olive-dark)]"
              >
                <BrandMarkIcon className="h-5 w-5" />
                <span>{SITE_CONTENT.nav.brand}</span>
              </a>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeDrawer}
                aria-label="Close menu"
                className="press-tactile inline-flex h-11 w-11 items-center justify-center rounded-lg text-[var(--color-olive-dark)] hover:bg-black/5"
              >
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-4 flex flex-col divide-y divide-black/10">
              {SITE_CONTENT.nav.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  tabIndex={mobileOpen ? 0 : -1}
                  onClick={closeDrawer}
                  className="flex min-h-[48px] items-center justify-between py-2 text-lg font-medium tracking-tight text-[var(--color-olive-dark)] transition-colors hover:opacity-75"
                >
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5 border-t border-black/10 pt-5">
            <a
              href="#services"
              tabIndex={mobileOpen ? 0 : -1}
              onClick={closeDrawer}
              className="press-tactile inline-flex min-h-[46px] items-center justify-center rounded-full bg-[var(--color-olive-dark)] px-5 py-2.5 text-sm font-semibold text-white"
            >
              {SITE_CONTENT.nav.cta}
            </a>
            <a
              href="#faq"
              tabIndex={mobileOpen ? 0 : -1}
              onClick={closeDrawer}
              className="press-tactile inline-flex min-h-[46px] items-center justify-center rounded-full border border-[var(--color-olive-dark)]/35 px-5 py-2.5 text-sm font-medium text-[var(--color-olive-dark)]"
            >
              {SITE_CONTENT.nav.signIn}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
