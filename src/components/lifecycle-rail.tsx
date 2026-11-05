"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import cropDomains from "@/assets/console/crop-domains.png";
import cropProjects from "@/assets/console/crop-projects.png";
import cropVersions from "@/assets/console/crop-versions.png";
import { CopyButton } from "./copy-command";

const RAW = "https://raw.githubusercontent.com/acceleratio-cloud/core/main/deploy";
const ok = "oklch(0.74 0.14 150)";

function Terminal({ cmd, children }: { cmd: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl bg-facility text-[#c8cbd0] shadow-[0_30px_60px_-36px_rgba(0,0,0,0.55)]">
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-2.5 font-mono text-[11px] text-[#8b9096]">
        <span>root@server: ~</span>
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <p className="min-w-0 flex-1 break-all font-mono text-[12.5px] text-[#eef0f2]">
            <span className="select-none text-[#8b9096]">$ </span>
            {cmd}
          </p>
          <CopyButton text={cmd} className="border-white/10! bg-white/[0.04]! text-[#c8cbd0]! hover:border-white/25! hover:text-white!" />
        </div>
        <div className="mt-4 font-mono text-[12px] leading-[1.8]">{children}</div>
      </div>
    </div>
  );
}

function Shot({ img, alt, path }: { img: StaticImageData; alt: string; path: string }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-line-2 bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_30px_60px_-40px_rgba(30,40,60,0.4)]">
      <figcaption className="flex items-center gap-2 border-b border-line bg-paper px-4 py-2 font-mono text-[11px] text-ink-3">
        <span className="flex gap-1" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-line-2" />
          <span className="h-2 w-2 rounded-full bg-line-2" />
          <span className="h-2 w-2 rounded-full bg-line-2" />
        </span>
        <span className="ml-2 truncate">{path}</span>
      </figcaption>
      <Image src={img} alt={alt} placeholder="blur" quality={82} sizes="(min-width: 1280px) 760px, 92vw" className="block h-auto w-full" />
    </figure>
  );
}

const Ok = ({ children }: { children: ReactNode }) => (
  <p>
    <span style={{ color: ok }}>ok</span> <span className="text-[#a3a9af]">{children}</span>
  </p>
);

const STEPS: { id: string; title: string; body: string; scene: ReactNode }[] = [
  {
    id: "step-install",
    title: "Install",
    body: "Run one script on a fresh Ubuntu or Debian server. It checks the machine, installs k3s, Cilium and SeaweedFS, verifies storage and DNS, then starts Acceleratio. Running it again updates instead of starting over.",
    scene: (
      <Terminal cmd={`curl -fsSL ${RAW}/install.sh | sudo bash`}>
        <div className="grid gap-x-4 sm:grid-cols-3">
          {["preflight", "host packages", "k3s", "helm", "cilium", "seaweedfs", "storage", "verification", "acceleratio"].map((p, i) => (
            <p key={p}>
              <span className="text-[#6f757b]">{i + 1}.</span> <span className="text-[#eef0f2]">{p}</span> <span style={{ color: ok }}>ok</span>
            </p>
          ))}
        </div>
        <p className="mt-3 text-[#eef0f2]">
          Dashboard: <span className="text-[oklch(0.75_0.12_245)]">http://203.0.113.10:30300</span>
        </p>
      </Terminal>
    ),
  },
  {
    id: "step-account",
    title: "Create the first account",
    body: "Open /auth/installation on the console address. The first account becomes the operator, with no seeded credentials to change. Then you land on your projects.",
    scene: <Shot img={cropProjects} alt="The Projects page of the Acceleratio console, listing projects and their services" path="your-server:30300/" />,
  },
  {
    id: "step-deploy",
    title: "Deploy a service",
    body: "Add a service from any Docker image, set its resources, replicas, variables and secrets. Every deploy becomes a version you can see and roll back to.",
    scene: <Shot img={cropVersions} alt="A service's Versions tab, showing the active version with its image, CPU, memory, replicas and variables" path="your-server:30300/project/storefront" />,
  },
  {
    id: "step-domain",
    title: "Attach a domain",
    body: "Every service gets a generated sslip.io domain right away. Point a custom domain's A record at the server and its Let's Encrypt certificate is issued on its own.",
    scene: <Shot img={cropDomains} alt="Service cards on the project canvas, each showing status, image, tag and domain" path="your-server:30300/project/storefront" />,
  },
  {
    id: "step-update",
    title: "Update",
    body: "update.sh lists every component's current and target version and asks before it starts. It backs up first, and rolls back the changed releases if the new version is not healthy.",
    scene: (
      <Terminal cmd={`curl -fsSL ${RAW}/update.sh | sudo bash`}>
        <Ok>backup written to /var/backups/acceleratio/&lt;timestamp&gt;</Ok>
        <Ok>helm releases upgraded</Ok>
        <Ok>postgres, api and console healthy</Ok>
      </Terminal>
    ),
  },
  {
    id: "step-remove",
    title: "Remove",
    body: "uninstall.sh removes the cluster, the database and all stored data, and keeps SSH and host networking working without a reboot. There is no account to close.",
    scene: (
      <Terminal cmd={`curl -fsSL ${RAW}/uninstall.sh | sudo bash -s -- --yes`}>
        <Ok>helm releases removed</Ok>
        <Ok>cilium detached, host networking kept</Ok>
        <Ok>k3s, etcd, database and seaweedfs data removed</Ok>
      </Terminal>
    ),
  },
];

export function LifecycleRail() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <nav aria-label="Lifecycle steps" className="hidden lg:col-span-3 lg:block">
        <div className="sticky top-28">
          <div className="relative pl-7">
            <span className="absolute bottom-2 left-[5px] top-2 w-px bg-line-2" aria-hidden />
            <span
              className="rail-fill absolute bottom-2 left-[5px] top-2 w-px bg-ink"
              style={{ "--rp": active / (STEPS.length - 1) } as CSSProperties}
              aria-hidden
            />
            <ol className="space-y-5">
              {STEPS.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    data-active={i === active}
                    data-done={i < active}
                    aria-current={i === active ? "step" : undefined}
                    className="rail-step relative flex items-center gap-3 text-[15px] text-ink-3 hover:text-ink-2"
                  >
                    <span className="dot absolute -left-7 top-1/2 h-[11px] w-[11px] -translate-y-1/2 rounded-full border border-line-2 bg-paper" aria-hidden />
                    <span className="font-mono text-[12px]">{i + 1}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </nav>

      <div className="space-y-16 lg:col-span-9 lg:space-y-0">
        {STEPS.map((s, i) => (
          <div
            key={s.id}
            id={s.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            data-active={i === active}
            className="scene scroll-mt-28 lg:flex lg:min-h-[72vh] lg:items-center"
          >
            <div className="grid w-full gap-6 xl:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] xl:items-center xl:gap-12">
              <div>
                <p className="font-mono text-[12px] text-ink-3">
                  Step {i + 1} of {STEPS.length}
                </p>
                <h3 className="display mt-2 text-[clamp(24px,2vw,34px)] leading-[1.1]">{s.title}</h3>
                <p className="mt-3 max-w-[48ch] text-[16px] leading-relaxed text-ink-2">{s.body}</p>
              </div>
              <div className="min-w-0">{s.scene}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
