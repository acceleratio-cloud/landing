import { LifecycleRail } from "@/components/lifecycle-rail";
import { SectionHead } from "./shared";

export function Lifecycle() {
  return (
    <section id="lifecycle" style={{ "--cv": "4600px" } as React.CSSProperties} className="cv wrap scroll-mt-16 pt-24 sm:pt-28" aria-labelledby="lifecycle-title">
      <SectionHead
        id="lifecycle-title"
        label="Lifecycle"
        title="From a bare server to a live service"
        lede="Six steps, each one a script on the server or a screen in the console."
      />
      <div className="mt-12 lg:mt-4">
        <LifecycleRail />
      </div>
    </section>
  );
}
