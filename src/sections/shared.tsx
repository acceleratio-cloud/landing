import { REPO } from "@/lib/github";

export const RAW = "https://raw.githubusercontent.com/acceleratio-cloud/core/main/deploy";
export const INSTALL = `curl -fsSL ${RAW}/install.sh | sudo bash`;
export const GUIDE = `${REPO}/tree/main/deploy`;

export function ButtonPrimary({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="btn inline-flex h-10 items-center gap-2 rounded-md bg-ink px-4 text-sm font-medium text-card transition-colors duration-150 hover:bg-graphite-hover"
    >
      {children}
    </a>
  );
}

export function ButtonOutline({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="btn inline-flex h-10 items-center gap-2 rounded-md border border-line-2 bg-card px-4 text-sm font-medium text-ink transition-colors duration-150 hover:border-ink-3"
    >
      {children}
    </a>
  );
}

/** Section header: label, title and lede in one left-aligned block. */
export function SectionHead({ label, title, lede, id }: { label: string; title: string; lede?: string; id: string }) {
  return (
    <div className="border-t border-line pt-8">
      <p className="text-sm text-ink-3">{label}</p>
      <h2 id={id} className="display mt-4 max-w-[24ch] text-balance text-[clamp(32px,3.4vw,58px)] leading-[1.04]">
        {title}
      </h2>
      {lede && <p className="mt-5 max-w-[64ch] text-pretty text-[17px] leading-relaxed text-ink-2">{lede}</p>}
    </div>
  );
}

/** Section header for the dark architecture stage. */
export function StageHead({ eyebrow, title, lede, id }: { eyebrow: string; title: string; lede: string; id: string }) {
  return (
    <div className="max-w-[880px]">
      <p className="text-sm text-[var(--n-text-3)]">{eyebrow}</p>
      <h2 id={id} className="display mt-4 text-balance text-[clamp(34px,3.6vw,64px)] leading-[1.03] text-[var(--n-text)]">
        {title}
      </h2>
      <p className="mt-5 max-w-[60ch] text-pretty text-[18px] leading-relaxed text-[var(--n-text-2)]">{lede}</p>
    </div>
  );
}
