import Image from "next/image";
import hero from "@/assets/hero.jpg";

export function Statement() {
  return (
    <section aria-label="Statement" className="relative isolate mt-24 overflow-hidden border-y border-line sm:mt-28">
      <Image src={hero} alt="" fill quality={75} sizes="100vw" placeholder="blur" className="-z-20 object-cover object-[50%_70%]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(247,247,247,0.55),rgba(247,247,247,0.25)_50%,rgba(247,247,247,0.7))]" />
      <div className="wrap py-24 sm:py-32">
        <p className="display text-balance text-[clamp(44px,7.4vw,140px)] leading-[0.95]">
          The cloud,
          <br />
          on your own ground.
        </p>
        <p className="mt-8 max-w-[52ch] text-[17px] leading-relaxed text-ink-2">
          No vendor account, no hosted control plane, no lock-in. An open-source platform you install, own and can leave at any time.
        </p>
      </div>
    </section>
  );
}
