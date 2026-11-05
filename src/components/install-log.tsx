import type { CSSProperties } from "react";
import { CopyButton } from "./copy-command";

/* The installer's real phases and pinned versions, from acceleratio-cloud/core deploy/README.md.
   Keep these in step with that file when the installer pins change. */
const PHASES: [string, string][] = [
  ["preflight", "os, arch, kernel, memory, disk, fuse, ports"],
  ["host packages", "fuse3 iptables conntrack socat"],
  ["k3s", "v1.36.5+k3s1 · embedded etcd"],
  ["helm", "3.18.0"],
  ["cilium", "1.20.4 · kube-proxy replacement"],
  ["seaweedfs", "4.51.0 · master volume filer s3"],
  ["storage", "seaweedfs-storage set as default"],
  ["verification", "nodes, cilium, pvc and dns smoke test"],
  ["acceleratio", "postgres, api and console ready"],
];

export function InstallLog({ command }: { command: string }) {
  const lastIndex = PHASES.length + 1;
  return (
    <figure className="overflow-hidden rounded-lg bg-facility text-[#c8cbd0] shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_30px_60px_-30px_rgba(0,0,0,0.55)]">
      <figcaption className="flex items-center justify-between border-b border-white/[0.07] px-4 py-2.5 font-mono text-[11px] text-[#8b9096]">
        <span>root@server: ~</span>
        <span>install.sh</span>
      </figcaption>
      <div className="px-4 pb-5 pt-4 font-mono text-[12.5px] leading-[1.75] sm:px-5">
        <div className="flex items-start gap-3">
          <p className="min-w-0 flex-1 break-all text-[#eef0f2]">
            <span className="select-none text-[#8b9096]">$ </span>
            {command}
          </p>
          <CopyButton text={command} className="border-white/10! bg-white/[0.04]! text-[#c8cbd0]! hover:border-white/25! hover:text-white!" />
        </div>
        <ol className="mt-3 space-y-px" aria-label="What the installer does">
          {PHASES.map(([name, detail], i) => (
            <li key={name} className="log-line grid grid-cols-[3.2em_8.6em_1fr] gap-x-2" style={{ "--i": i + 1 } as CSSProperties}>
              <span className="text-[#6f757b]">[{i + 1}/9]</span>
              <span className="text-[#eef0f2]">{name}</span>
              <span className="truncate">
                <span className="text-[oklch(0.72_0.13_150)]">ok</span> <span className="text-[#8b9096]">{detail}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="log-line mt-3 text-[#eef0f2]" style={{ "--i": lastIndex } as CSSProperties}>
          Dashboard: <span className="text-[oklch(0.75_0.12_245)]">http://203.0.113.10:30300</span>
        </p>
        <p className="log-line text-[#8b9096]" style={{ "--i": lastIndex } as CSSProperties}>
          Open /auth/installation to create the first account.
        </p>
        <p className="log-line mt-1" style={{ "--i": lastIndex + 1 } as CSSProperties}>
          <span className="text-[#8b9096]">$ </span>
          <span className="log-cursor inline-block h-[1.1em] w-[0.55em] translate-y-[0.18em] bg-[#c8cbd0]" style={{ "--i": lastIndex + 1 } as CSSProperties} />
        </p>
      </div>
    </figure>
  );
}
