import { ConsoleGallery } from "@/components/console-gallery";
import { SectionHead } from "./shared";

export function ConsoleSection() {
  return (
    <section id="console" className="wrap scroll-mt-16 pt-24 sm:pt-28" aria-labelledby="console-title">
      <SectionHead
        id="console-title"
        label="Console"
        title="The console your team works in"
        lede="Projects, services, domains, buckets and metrics in one place, served from your own server. These are real screens."
      />
      <div className="mt-12">
        <ConsoleGallery />
      </div>
    </section>
  );
}
