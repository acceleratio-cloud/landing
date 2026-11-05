import type { CSSProperties } from "react";
import { siCilium, siHelm, siK3s, siLetsencrypt, siPostgresql, siTraefikproxy, siVictoriametrics } from "simple-icons";

type Item = { name: string; role: string; path?: string; hex?: string; href: string };

/* The open-source components every Acceleratio install runs on, from deploy/README.md. Logos from Simple Icons (CC0). */
const ITEMS: Item[] = [
  { name: "k3s", role: "Kubernetes", path: siK3s.path, hex: siK3s.hex, href: "https://k3s.io" },
  { name: "Cilium", role: "Networking", path: siCilium.path, hex: siCilium.hex, href: "https://cilium.io" },
  { name: "Traefik", role: "Ingress", path: siTraefikproxy.path, hex: siTraefikproxy.hex, href: "https://traefik.io/traefik" },
  { name: "SeaweedFS", role: "Storage and S3", href: "https://github.com/seaweedfs/seaweedfs" },
  { name: "VictoriaMetrics", role: "Metrics", path: siVictoriametrics.path, hex: siVictoriametrics.hex, href: "https://victoriametrics.com" },
  { name: "PostgreSQL", role: "State", path: siPostgresql.path, hex: siPostgresql.hex, href: "https://www.postgresql.org" },
  { name: "Helm", role: "Releases", path: siHelm.path, hex: siHelm.hex, href: "https://helm.sh" },
  { name: "Let's Encrypt", role: "Certificates", path: siLetsencrypt.path, hex: siLetsencrypt.hex, href: "https://letsencrypt.org" },
];

export function BuiltOn() {
  return (
    <section aria-labelledby="built-on-title" className="border-b border-line bg-card/60">
      <div className="wrap py-10">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
          <h2 id="built-on-title" className="text-sm text-ink-2">
            Built on open-source infrastructure you already trust
          </h2>
          <p className="text-sm text-ink-3">Every install runs these, on your server.</p>
        </div>
        <ul className="mt-6 grid grid-cols-2 border-l border-t border-line sm:grid-cols-4 xl:grid-cols-8">
          {ITEMS.map((it) => (
            <li key={it.name} className="border-b border-r border-line">
              <a
                href={it.href}
                className="group flex h-full flex-col items-start gap-3 px-5 py-5 transition-colors duration-200 hover:bg-card"
                style={{ "--brand": `#${it.hex ?? "15191d"}` } as CSSProperties}
              >
                {it.path ? (
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-ink-3 transition-colors duration-200 group-hover:fill-[var(--brand)]" aria-hidden>
                    <path d={it.path} />
                  </svg>
                ) : (
                  <span className="flex h-6 w-6 items-center justify-center rounded-[5px] border border-ink-3 font-mono text-[10px] font-medium text-ink-3 transition-colors duration-200 group-hover:border-ink group-hover:text-ink" aria-hidden>
                    Sw
                  </span>
                )}
                <span>
                  <span className="block text-[15px] font-medium text-ink">{it.name}</span>
                  <span className="block text-[13px] text-ink-3">{it.role}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
