import type { SVGProps } from "react";

export function BrandMarkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="5" height="5" rx="1" />
      <rect x="9" y="2" width="5" height="5" rx="1" />
      <rect x="2" y="9" width="5" height="5" rx="1" />
      <rect x="16" y="9" width="5" height="5" rx="1" />
      <rect x="9" y="16" width="5" height="5" rx="1" />
      <rect x="16" y="16" width="5" height="5" rx="1" />
    </svg>
  );
}

export function KickerMarkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <rect x="1" y="1" width="4" height="4" rx="0.5" />
      <rect x="6" y="6" width="4" height="4" rx="0.5" />
      <rect x="11" y="1" width="4" height="4" rx="0.5" />
      <rect x="1" y="11" width="4" height="4" rx="0.5" />
      <rect x="11" y="11" width="4" height="4" rx="0.5" />
    </svg>
  );
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3.5 8h9" />
      <path d="M8.5 4l4 4-4 4" />
    </svg>
  );
}

export function ArrowUpRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4.5 11.5L11.5 4.5" />
      <path d="M6 4.5h5.5V10" />
    </svg>
  );
}

export function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M5 3.5l8 4.5-8 4.5V3.5z" />
    </svg>
  );
}

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export function ActivationCardIcon({
  kind,
  className = "w-7 h-7",
}: {
  kind: "journey" | "streams" | "package";
  className?: string;
}) {
  if (kind === "journey") {
    return (
      <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
        <polygon points="8,4 16,4 12,12 4,12" />
        <polygon points="18,4 26,4 22,12 14,12" />
        <polygon points="6,16 14,16 10,24 2,24" />
        <polygon points="16,16 24,16 20,24 12,24" />
      </svg>
    );
  }
  if (kind === "streams") {
    return (
      <svg viewBox="0 0 36 24" fill="currentColor" className={className} aria-hidden="true">
        <polygon points="4,6 12,6 9,18 1,18" />
        <polygon points="14,6 22,6 19,18 11,18" />
        <polygon points="24,6 32,6 29,18 21,18" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 36 28" fill="currentColor" className={className} aria-hidden="true">
      <polygon points="4,4 11,4 8,12 1,12" />
      <polygon points="13,4 20,4 17,12 10,12" />
      <polygon points="22,4 29,4 26,12 19,12" />
      <polygon points="4,15 11,15 8,23 1,23" />
      <polygon points="13,15 20,15 17,23 10,23" />
      <polygon points="22,15 29,15 26,23 19,23" />
    </svg>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
