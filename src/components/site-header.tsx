"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Fixed header: transparent at the very top, frosted glass once the page scrolls.
 * Over sections marked data-surface="dark" it switches to dark glass with light text.
 */
export function SiteHeader({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 8);
      const probe = 32;
      let overDark = false;
      for (const el of document.querySelectorAll<HTMLElement>('[data-surface="dark"]')) {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom >= probe) {
          overDark = true;
          break;
        }
      }
      setDark(overDark);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      data-tone={dark ? "dark" : "light"}
      className="group/header fixed inset-x-0 top-0 z-50 border-b border-transparent bg-transparent backdrop-blur-none transition-[background-color,border-color,backdrop-filter,box-shadow,color] duration-300 ease-out data-[scrolled=true]:border-white/60 data-[scrolled=true]:bg-paper/55 data-[scrolled=true]:shadow-[0_1px_0_rgba(0,0,0,0.06),0_8px_24px_-12px_rgba(0,0,0,0.12)] data-[scrolled=true]:backdrop-blur-xl data-[scrolled=true]:backdrop-saturate-150 data-[tone=dark]:border-white/[0.08]! data-[tone=dark]:bg-[rgba(13,14,15,0.55)]! data-[tone=dark]:text-[#eceef0]"
    >
      {children}
    </header>
  );
}
