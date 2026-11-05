import { SectionHead } from "./shared";

const faqs: [string, string][] = [
  [
    "Isn't Kubernetes too much for one server?",
    "The installer sets up k3s, a lightweight Kubernetes built for small machines, with networking, storage and metrics already wired in. Your team works in the console. Kubernetes is there when you need to look underneath. The recommended server is 2 vCPU and 4 GiB of RAM.",
  ],
  [
    "Who keeps it patched and updated?",
    "You do, with update.sh. It lists what will change and asks before it starts, backs up first, and rolls back if the new version does not come up healthy.",
  ],
  [
    "Can it run on more than one server?",
    "The installer sets up and tests one server that acts as both control plane and worker. Underneath it is standard k3s, so you can manage the cluster with the usual Kubernetes tools.",
  ],
  [
    "Do we need an account with Acceleratio?",
    "No. There is no Acceleratio account, license key or hosted service. The first visit to your console creates the first operator account, on your server.",
  ],
  [
    "How do we stop using it?",
    "Run uninstall.sh. It removes everything, including the database. Your images, data and configuration were on your servers the whole time.",
  ],
  [
    "What does it cost?",
    "Acceleratio is open source under Apache 2.0. You pay for the servers you run it on.",
  ],
];

export function FAQ() {
  return (
    <section id="faq" style={{ "--cv": "640px" } as React.CSSProperties} className="cv wrap scroll-mt-16 py-24 sm:py-28" aria-labelledby="faq-title">
      <SectionHead id="faq-title" label="FAQ" title="Questions from platform teams" />
      <div className="faq mt-12 grid gap-x-12 md:grid-cols-2">
        {faqs.map(([q, a]) => (
          <details key={q} className="border-t border-line last:border-b md:[&:nth-last-child(2)]:border-b">
            <summary className="flex items-center justify-between gap-6 py-5 text-[17px] font-medium transition-colors duration-150 hover:text-accent">
              {q}
              <svg width="14" height="14" viewBox="0 0 16 16" className="chev shrink-0 text-ink-3" aria-hidden>
                <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </summary>
            <p className="-mt-1 max-w-[72ch] pb-6 text-[15px] leading-relaxed text-ink-2">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
