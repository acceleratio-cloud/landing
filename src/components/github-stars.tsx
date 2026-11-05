import { formatStars, getStars, REPO } from "@/lib/github";

function GitHubMark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function StarIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
      <path d="M8 .9l2.2 4.5 4.9.7-3.6 3.5.9 4.9L8 12.2l-4.4 2.3.9-4.9L.9 6.1l4.9-.7L8 .9z" />
    </svg>
  );
}

type Variant = "light" | "dark" | "ink" | "nav";

const styles: Record<Variant, { wrap: string; count: string; divider: string }> = {
  light: {
    wrap: "border-line-2 bg-card text-ink hover:border-ink-3",
    count: "text-ink",
    divider: "bg-line-2",
  },
  ink: {
    wrap: "border-ink bg-ink text-paper hover:bg-ink/85",
    count: "text-paper",
    divider: "bg-white/20",
  },
  nav: {
    wrap: "border-line-2 bg-card text-ink hover:border-ink-3 group-data-[tone=dark]/header:border-white/15 group-data-[tone=dark]/header:bg-white/[0.04] group-data-[tone=dark]/header:text-[#eceef0] group-data-[tone=dark]/header:hover:border-white/30",
    count: "text-ink group-data-[tone=dark]/header:text-[#eceef0]",
    divider: "bg-line-2 group-data-[tone=dark]/header:bg-white/15",
  },
  dark: {
    wrap: "border-white/20 bg-white/5 text-paper hover:border-white/40",
    count: "text-paper",
    divider: "bg-white/20",
  },
};

/** "Star on GitHub" button with the live star count. Server component. */
export async function GitHubStars({
  variant = "light",
  label = "Star",
  className = "",
}: {
  variant?: Variant;
  label?: string;
  className?: string;
}) {
  const stars = await getStars();
  const s = styles[variant];

  return (
    <a
      href={REPO}
      aria-label={`${label.includes("GitHub") ? label : `${label} on GitHub`}${
        stars === null ? "" : `, ${stars} ${stars === 1 ? "star" : "stars"}`
      }`}
      className={`group inline-flex h-9 items-stretch overflow-hidden rounded-lg border text-sm font-medium transition ${s.wrap} ${className}`}
    >
      <span className="flex items-center gap-2 px-3">
        <GitHubMark />
        {label}
      </span>
      {stars !== null && (
        <>
          <span className={`w-px ${s.divider}`} aria-hidden />
          <span className={`flex items-center gap-1.5 px-3 font-mono text-[13px] tabular-nums ${s.count}`}>
            <StarIcon className="h-3.5 w-3.5 text-[#e3b341] transition-transform duration-500 group-hover:rotate-[72deg]" />
            {formatStars(stars)}
          </span>
        </>
      )}
    </a>
  );
}

/** Small shields-style badge for inline use (hero chip row, footer). */
export async function StarsBadge() {
  const stars = await getStars();
  return (
    <a
      href={REPO}
      className="inline-flex items-stretch overflow-hidden rounded-md border border-line-2 font-mono text-[11px] leading-none transition hover:border-ink-3"
    >
      <span className="flex items-center gap-1.5 bg-ink px-2 py-1.5 text-paper">
        <GitHubMark className="h-3 w-3" />
        stars
      </span>
      <span className="flex items-center gap-1 bg-card px-2 py-1.5 text-ink tabular-nums">
        <StarIcon className="h-3 w-3 text-[#e3b341]" />
        {stars === null ? "GitHub" : formatStars(stars)}
      </span>
    </a>
  );
}

/** Static shields-style badge matching StarsBadge. */
export function Shield({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-stretch overflow-hidden rounded-md border border-line-2 font-mono text-[11px] leading-none transition hover:border-ink-3"
    >
      <span className="flex items-center bg-ink-2 px-2 py-1.5 text-paper">{label}</span>
      <span className="flex items-center bg-card px-2 py-1.5 text-ink">{value}</span>
    </a>
  );
}
