import { GitHubStars } from "@/components/github-stars";
import { Wordmark } from "@/components/logo";
import { SiteHeader } from "@/components/site-header";
import { REPO } from "@/lib/github";

export function Nav() {
  const links = [
    ["Console", "#console"],
    ["Lifecycle", "#lifecycle"],
    ["Architecture", "#architecture"],
    ["Security", "#security"],
    ["FAQ", "#faq"],
    ["Docs", `${REPO}/tree/main/docs`],
  ];
  return (
    <SiteHeader>
      <nav aria-label="Main" className="wrap flex h-16 items-center justify-between gap-6">
        <a href="#main" className="text-ink transition-colors duration-300 group-data-[tone=dark]/header:text-[#eceef0]" aria-label="Acceleratio, back to top">
          <Wordmark />
        </a>
        <ul className="hidden items-center gap-7 text-sm text-ink-2 transition-colors duration-300 group-data-[tone=dark]/header:text-[#a3a9af] lg:flex">
          {links.map(([l, h]) => (
            <li key={l}>
              <a href={h} className="transition-colors duration-150 hover:text-ink group-data-[tone=dark]/header:hover:text-white">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2.5">
          <GitHubStars variant="nav" />
          <a
            href="#lifecycle"
            className="btn hidden h-9 items-center rounded-md bg-ink px-3.5 text-[13px] font-medium text-card transition-colors duration-150 hover:bg-graphite-hover group-data-[tone=dark]/header:bg-[#eceef0] group-data-[tone=dark]/header:text-[#0d0e0f] group-data-[tone=dark]/header:hover:bg-white sm:inline-flex"
          >
            Install guide
          </a>
        </div>
      </nav>
    </SiteHeader>
  );
}
