import { REPO } from "@/lib/github";

/* schema.org description of the product for search engines. Keep softwareVersion in step with the latest release. */
const data = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Acceleratio",
  description:
    "An open-source, self-hosted cloud platform. One command turns a server you own into a private cloud with projects, deploys, domains, storage and metrics.",
  url: "https://acceleratio.cloud",
  image: "https://acceleratio.cloud/og.jpg",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Ubuntu 22.04, Ubuntu 24.04, Debian 12",
  softwareVersion: "0.1.3",
  license: "https://www.apache.org/licenses/LICENSE-2.0",
  downloadUrl: `${REPO}/tree/main/deploy`,
  sameAs: [REPO],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so the JSON can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
