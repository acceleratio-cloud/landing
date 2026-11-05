import Image from "next/image";
import heroShot from "@/assets/console/canvas.png";
import hero from "@/assets/hero.jpg";
import { InstallLog } from "@/components/install-log";
import { REPO } from "@/lib/github";
import { ButtonOutline, ButtonPrimary, INSTALL } from "./shared";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line" aria-labelledby="hero-title">
      <Image src={hero} alt="" fill preload placeholder="blur" quality={82} sizes="100vw" className="-z-20 object-cover object-[50%_40%]" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(247,247,247,0.94)_0%,rgba(247,247,247,0.78)_55%,rgba(247,247,247,0.35)_100%)] lg:bg-[linear-gradient(90deg,rgba(247,247,247,0.96)_0%,rgba(247,247,247,0.85)_36%,rgba(247,247,247,0.2)_62%,rgba(247,247,247,0)_78%)]"
      />
      <div className="wrap grid min-h-[min(84svh,900px)] grid-cols-[minmax(0,1fr)] items-center gap-12 pb-14 pt-28 lg:grid-cols-12 lg:gap-8">
        <div className="min-w-0 lg:col-span-6 xl:col-span-6">
          <a
            href={`${REPO}/releases/tag/v0.1.3`}
            className="group inline-flex items-center gap-2.5 rounded-full border border-line-2 bg-card/80 py-1 pl-1 pr-3 text-[13px] text-ink-2 transition-colors duration-200 hover:border-ink-3 hover:text-ink"
          >
            <span className="rounded-full bg-ink px-2 py-0.5 font-mono text-[11px] text-card">v0.1.3</span>
            Open source under Apache 2.0. Read the release notes
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </a>
          <h1 id="hero-title" className="display mt-6 text-[clamp(42px,5vw,88px)] leading-[0.98]">
            Your cloud.
            <br />
            Your data.
            <br />
            Your control.
          </h1>
          <p className="mt-7 max-w-[54ch] text-pretty text-[clamp(17px,1.1vw,19px)] leading-relaxed text-ink-2">
            Acceleratio is an open-source platform for running apps on servers you own. One command installs it, and
            your team gets projects, deploys, domains with HTTPS, storage and metrics in one console. The control plane
            and your data stay inside your infrastructure.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonPrimary href="#lifecycle">Read the install guide</ButtonPrimary>
            <ButtonOutline href={REPO}>View the source</ButtonOutline>
          </div>
        </div>
        <div className="min-w-0 lg:col-span-6 lg:pl-6 xl:col-span-5 xl:col-start-8 xl:pl-0">
          <InstallLog command={INSTALL} />
        </div>
      </div>

      {/* A real console screen, rising out of the clouds. */}
      <div className="wrap hidden md:block" aria-hidden>
        <div className="mx-auto max-w-[1480px] [perspective:2400px]">
          <div className="hero-shot overflow-hidden rounded-t-xl border border-b-0 border-line-2 bg-card shadow-[0_60px_120px_-50px_rgba(30,50,80,0.5)] [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)]">
            <div className="flex items-center gap-3 border-b border-line bg-paper px-4 py-2.5">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
                <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
                <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
              </span>
              <span className="mx-auto rounded-md border border-line bg-card px-3 py-1 font-mono text-[11.5px] text-ink-3">your-server:30300/project/storefront</span>
              <span className="w-[42px]" />
            </div>
            <div className="aspect-[16/6.2] overflow-hidden">
              <Image src={heroShot} alt="" placeholder="blur" quality={82} sizes="(min-width: 1760px) 1480px, 90vw" className="block w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
