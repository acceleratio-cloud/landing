import { Shield, StarsBadge } from "@/components/github-stars";
import { Wordmark } from "@/components/logo";
import { REPO } from "@/lib/github";
import { GUIDE } from "./shared";

export function Footer() {
  const cols = [
    ["Product", [["Console", "#console"], ["Lifecycle", "#lifecycle"], ["Architecture", "#architecture"], ["Security", "#security"]]],
    ["Resources", [["Documentation", `${REPO}/tree/main/docs`], ["Installer guide", GUIDE], ["Releases", `${REPO}/releases`], ["Security policy", `${REPO}/blob/main/SECURITY.md`]]],
    ["Community", [["GitHub", REPO], ["Contributing", `${REPO}/blob/main/CONTRIBUTING.md`], ["Code of conduct", `${REPO}/blob/main/CODE_OF_CONDUCT.md`]]],
  ] as const;

  return (
    <footer style={{ "--cv": "420px" } as React.CSSProperties} className="cv bg-card">
      <div className="wrap grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-6 lg:col-span-5">
          <Wordmark />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-3">An open-source cloud platform for servers you own.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <StarsBadge />
            <Shield label="license" value="Apache-2.0" href={`${REPO}/blob/main/LICENSE`} />
          </div>
        </div>
        {cols.map(([title, links]) => (
          <div key={title} className="md:col-span-2">
            <p className="text-sm text-ink-3">{title}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {links.map(([l, h]) => (
                <li key={l}>
                  <a href={h} className="text-ink-2 transition-colors duration-150 hover:text-ink">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="wrap flex flex-col justify-between gap-2 py-6 text-xs text-ink-3 sm:flex-row">
          <span>
            © Acceleratio contributors. Licensed under Apache 2.0. Latest release{" "}
            <a href={`${REPO}/releases/tag/v0.1.3`} className="underline-offset-4 hover:text-ink hover:underline">
              v0.1.3
            </a>
            .
          </span>
          <span>Background photographs are AI-generated.</span>
        </div>
      </div>
    </footer>
  );
}
