import { LogoMark } from "@/components/logo";
import { SectionHead } from "./shared";

const rows: [string, string, string][] = [
  ["Where your data lives", "The vendor's cloud", "Servers you own"],
  ["Account with a vendor", "Required", "None"],
  ["Control plane", "Hosted by the vendor", "Runs in your cluster"],
  ["Underneath", "Proprietary", "Standard Kubernetes (k3s)"],
  ["Inspect and debug", "Through vendor tools", "kubectl, Helm and any Kubernetes tool"],
  ["Source code", "Closed", "Apache 2.0"],
  ["Leaving", "A migration project", "Run uninstall.sh"],
];

export function Compare() {
  return (
    <section id="compare" style={{ "--cv": "800px" } as React.CSSProperties} className="cv wrap scroll-mt-16 pt-24 sm:pt-28" aria-labelledby="compare-title">
      <SectionHead
        id="compare-title"
        label="Compare"
        title="Compared with a hosted platform"
        lede="For teams that must keep workloads and data on infrastructure they control, and still want the workflow of Railway, Render or Heroku."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-line bg-paper-2/60 p-6 sm:p-8">
          <p className="text-sm text-ink-3">Hosted platform</p>
          <dl className="mt-5 divide-y divide-line">
            {rows.map(([k, a]) => (
              <div key={k} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 py-3 text-sm">
                <dt className="text-ink-3">{k}</dt>
                <dd className="text-ink-2">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-xl border border-line-2 bg-card p-6 shadow-[0_30px_60px_-40px_rgba(30,40,60,0.35)] sm:p-8">
          <p className="flex items-center gap-2 text-sm font-medium">
            <LogoMark className="h-3.5 w-auto" /> Acceleratio
          </p>
          <dl className="mt-5 divide-y divide-line">
            {rows.map(([k, , b]) => (
              <div key={k} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 py-3 text-sm">
                <dt className="text-ink-3">{k}</dt>
                <dd className="flex items-start gap-2 font-medium">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0" aria-hidden>
                    <path d="M3 8.5l3.2 3L13 4.5" stroke="var(--ok)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {b}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
