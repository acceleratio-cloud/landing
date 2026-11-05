import { IsoArchitecture } from "@/components/iso-architecture";
import { StageHead } from "./shared";

export function Architecture() {
  return (
    <section
      id="architecture"
      data-surface="dark"
      style={{ "--cv": "1700px" } as React.CSSProperties}
      className="cv stage relative isolate mt-24 scroll-mt-16 overflow-hidden pb-24 pt-24 sm:mt-28 sm:pb-32 sm:pt-28"
      aria-labelledby="architecture-title"
    >
      <div className="wrap">
        <StageHead
          id="architecture-title"
          eyebrow="Architecture"
          title="Four layers on one server"
          lede="The console, the API, your services and their data share one k3s cluster on hardware you own. Acceleratio runs no hosted service, so your platform does not depend on one. Hover a layer to see what runs in it."
        />
        <div className="mt-10">
          <IsoArchitecture />
        </div>
      </div>
    </section>
  );
}
