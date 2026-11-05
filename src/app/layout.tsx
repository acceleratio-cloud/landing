import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

/* Archivo (SIL OFL 1.1), pinned to the one instance the headings use (weight 620, width 118) and subset to Latin. */
const archivo = localFont({
  src: "../assets/fonts/archivo-expanded-semibold.woff2",
  variable: "--font-archivo",
  weight: "600",
  display: "swap",
  fallback: ["Geist", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Acceleratio: an open-source cloud platform for servers you own",
  description:
    "Acceleratio is an open-source, self-hosted cloud platform. One command turns a server you own into a private cloud with projects, deploys, domains, storage and metrics.",
  metadataBase: new URL("https://acceleratio.cloud"),
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    siteName: "Acceleratio",
    title: "Acceleratio: your cloud. Your data. Your control.",
    description: "Open-source, self-hosted alternative to Railway, Render, Northflank and Heroku. Built on Kubernetes.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Acceleratio: your cloud, your data, your control. The intro of acceleratio.cloud with the install log." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Acceleratio: your cloud. Your data. Your control.",
    description: "Open-source, self-hosted alternative to Railway, Render, Northflank and Heroku. Built on Kubernetes.",
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f7f7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} antialiased`}>
      <body className="min-h-full">
        <a
          href="#main"
          className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-md bg-ink px-4 py-2 text-sm text-card transition focus:translate-y-0"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
