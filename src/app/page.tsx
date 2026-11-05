import { Architecture } from "@/sections/architecture";
import { BuiltOn } from "@/sections/built-on";
import { Closing } from "@/sections/closing";
import { Compare } from "@/sections/compare";
import { ConsoleSection } from "@/sections/console";
import { FAQ } from "@/sections/faq";
import { Footer } from "@/sections/footer";
import { Hero } from "@/sections/hero";
import { Lifecycle } from "@/sections/lifecycle";
import { Nav } from "@/sections/nav";
import { Security } from "@/sections/security";
import { Statement } from "@/sections/statement";
import { StructuredData } from "@/sections/structured-data";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <BuiltOn />
        <ConsoleSection />
        <Statement />
        <Lifecycle />
        <Architecture />
        <Security />
        <Compare />
        <FAQ />
        <Closing />
      </main>
      <Footer />
      <StructuredData />
    </>
  );
}
