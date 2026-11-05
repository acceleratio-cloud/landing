import { REPO } from "@/lib/github";
import { SectionHead } from "./shared";

const assurances: [string, string][] = [
  ["Everything stays inside your boundary", "The console, the API, your workloads and their data run on servers you own. There is no Acceleratio-hosted service in the path."],
  ["Projects are isolated", "Each project gets its own Kubernetes namespace, and Cilium network policies keep projects from reaching each other."],
  ["Secrets stay hidden", "Environment variables and secrets are masked in the console until someone with access chooses to reveal them."],
  ["HTTPS by default", "Generated domains are served over HTTPS, and custom domains get Let's Encrypt certificates once DNS points at the server."],
  ["Updates you can undo", "update.sh backs up the database, configuration and an etcd snapshot first, and rolls back the changed releases if health checks fail."],
  ["Code you can audit", "Apache 2.0 from the installer to the console. Read every line that runs on your server before you run it."],
];

export function Security() {
  return (
    <section id="security" style={{ "--cv": "900px" } as React.CSSProperties} className="cv wrap scroll-mt-16 pt-24 sm:pt-28" aria-labelledby="security-title">
      <SectionHead
        id="security-title"
        label="Security"
        title="Security you can read, not just trust"
        lede="Acceleratio is open source, so every point below is something you can check in the code and the installer docs."
      />
      <div className="mt-12 grid gap-8 lg:grid-cols-12">
        <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:col-span-8">
          {assurances.map(([t, b]) => (
            <li key={t} className="bg-card p-6">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path d="M9 1.5l6 2.4v4.5c0 3.7-2.6 6.7-6 8.1-3.4-1.4-6-4.4-6-8.1V3.9l6-2.4z" stroke="var(--ink)" strokeWidth="1.3" />
                <path d="M6.2 9.1l1.9 1.8 3.7-3.8" stroke="var(--ink)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="mt-4 font-medium">{t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{b}</p>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-4 lg:col-span-4">
          <div className="rounded-xl border border-line bg-card p-6">
            <h3 className="font-medium">Worth knowing</h3>
            <ul className="mt-3 space-y-3 text-sm leading-relaxed text-ink-2">
              <li>The API runs with a ServiceAccount bound to cluster-admin, because it creates namespaces, workloads, volumes and network policies for projects.</li>
              <li>Security fixes ship for the latest release only, so keep installs up to date with update.sh.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-dashed border-line-2 p-6">
            <h3 className="font-medium">Not there yet</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-2">
              <li>Single sign-on. Accounts use email and password.</li>
              <li>Team invites and roles. One operator account per install.</li>
              <li>More than one server per install.</li>
            </ul>
          </div>
          <a
            href={`${REPO}/security/advisories/new`}
            className="group rounded-xl bg-ink p-6 text-card transition-colors duration-200 hover:bg-graphite-hover"
          >
            <span className="font-medium">Found a vulnerability?</span>
            <span className="mt-1.5 block text-sm leading-relaxed text-white/70">
              Report it privately on GitHub. Reports are acknowledged within 3 business days, and reporters are credited in the release notes.
            </span>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm">
              Report a vulnerability <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
