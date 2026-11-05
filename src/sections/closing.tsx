import Image from "next/image";
import ground from "@/assets/ground.jpg";
import { CopyCommand } from "@/components/copy-command";
import { REPO } from "@/lib/github";
import { ButtonOutline, GUIDE, INSTALL } from "./shared";

export function Closing() {
  return (
    <section style={{ "--cv": "640px" } as React.CSSProperties} className="cv relative isolate overflow-hidden border-y border-line" aria-labelledby="closing-title">
      <Image src={ground} alt="" fill placeholder="blur" quality={75} sizes="100vw" className="-z-20 object-cover object-[78%_70%] lg:object-[50%_70%]" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(247,247,247,0.92)_0%,rgba(247,247,247,0.7)_55%,rgba(247,247,247,0.1)_100%)] lg:bg-[linear-gradient(90deg,rgba(247,247,247,0.96)_0%,rgba(247,247,247,0.82)_34%,rgba(247,247,247,0.1)_64%,rgba(247,247,247,0)_80%)]"
      />
      <div className="wrap grid min-h-[640px] grid-cols-[minmax(0,1fr)] content-center pb-[70vw] pt-20 lg:py-28">
        <div className="min-w-0 max-w-[680px]">
          <h2 id="closing-title" className="display text-balance text-[clamp(32px,3.4vw,56px)] leading-[1.04]">
            Install it on a server you own
          </h2>
          <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-ink-2">
            Run this on a fresh Ubuntu or Debian server. It prints the console address when it finishes.
          </p>
          <div className="mt-7">
            <CopyCommand command={INSTALL} />
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <ButtonOutline href={GUIDE}>Read the install guide</ButtonOutline>
            <a href={`${REPO}/blob/main/CONTRIBUTING.md`} className="px-2 text-sm text-accent underline-offset-4 hover:underline">
              Contribute on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
