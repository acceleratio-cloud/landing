"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import bucket from "@/assets/console/bucket-explore.png";
import canvas from "@/assets/console/canvas.png";
import observability from "@/assets/console/observability.png";
import projects from "@/assets/console/projects.png";
import servers from "@/assets/console/servers.png";
import env from "@/assets/console/svc-env.png";
import overview from "@/assets/console/svc-overview.png";
import versions from "@/assets/console/svc-versions.png";

type Shot = {
  id: string;
  label: string;
  path: string;
  caption: string;
  img: StaticImageData;
};

/* Real screenshots of the console (apps/frontend in acceleratio-cloud/core), taken from a running install with demo data. */
const SHOTS: Shot[] = [
  {
    id: "projects",
    label: "Projects",
    path: "/",
    caption: "Every project is an isolated environment with its own namespace.",
    img: projects,
  },
  {
    id: "canvas",
    label: "Project canvas",
    path: "/project/storefront",
    caption: "Services of a project on a canvas, with live status, image, tag and domain.",
    img: canvas,
  },
  {
    id: "service",
    label: "Instances",
    path: "/project/storefront · api",
    caption: "Each instance with its status, CPU, memory, restarts and age.",
    img: overview,
  },
  {
    id: "env",
    label: "Variables",
    path: "/project/storefront · api · environment",
    caption: "Environment variables and secrets, hidden until you reveal them.",
    img: env,
  },
  {
    id: "versions",
    label: "Versions",
    path: "/project/storefront · api · versions",
    caption: "Every deploy is a version. Roll back to any of them in one click; v5 here is a rollback to v3.",
    img: versions,
  },
  {
    id: "observability",
    label: "Observability",
    path: "/project/storefront?tab=observability",
    caption: "CPU, memory, network and pod health for the whole project.",
    img: observability,
  },
  {
    id: "bucket",
    label: "Buckets",
    path: "/project/storefront · uploads · explore",
    caption: "Browse, upload and organise files in S3-compatible buckets.",
    img: bucket,
  },
  {
    id: "servers",
    label: "Servers",
    path: "/servers",
    caption: "The servers in your cluster, their resources and Kubernetes version.",
    img: servers,
  },
];

const INTERVAL = 6000;

export function ConsoleGallery() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hold, setHold] = useState(false); // hovered or focused
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [cycle, setCycle] = useState(0); // restarts the progress bar
  // Only frames that are showing, have been shown, or come next are rendered, so the rest never download.
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]));
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const running = playing && !hold && visible && !reduced;

  useEffect(() => {
    const m = matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(m.matches);
    set();
    m.addEventListener("change", set);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.35,
    });
    if (root.current) io.observe(root.current);
    return () => {
      m.removeEventListener("change", set);
      io.disconnect();
    };
  }, []);

  // Keep frames that have been on screen mounted, so going back never reloads them.
  const remember = useCallback((...ids: number[]) => {
    setLoaded((prev) => (ids.every((i) => prev.has(i)) ? prev : new Set([...prev, ...ids])));
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => {
      remember(active);
      setActive((a) => (a + 1) % SHOTS.length);
      setCycle((c) => c + 1);
    }, INTERVAL);
    return () => clearTimeout(t);
  }, [running, active, cycle, remember]);

  const select = (i: number) => {
    remember(active, i);
    setActive(i);
    setCycle((c) => c + 1);
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : SHOTS.length - 1)) % SHOTS.length;
    select(next);
    tabs.current[next]?.focus();
  };

  const shot = SHOTS[active];

  return (
    <div
      ref={root}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHold(false);
      }}
    >
      <div className="flex items-center gap-3">
        <div
          role="tablist"
          aria-label="Console screens"
          onKeyDown={onKey}
          className="-mx-1 flex min-w-0 flex-1 gap-1 overflow-x-auto pb-1 [scrollbar-width:none]"
        >
          {SHOTS.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`tab-${s.id}`}
              aria-selected={i === active}
              aria-controls="console-shot"
              tabIndex={i === active ? 0 : -1}
              onClick={() => select(i)}
              className={`relative h-9 shrink-0 overflow-hidden rounded-md px-3.5 text-sm transition-colors duration-200 ${
                i === active ? "bg-ink text-card" : "text-ink-2 hover:bg-paper-2 hover:text-ink"
              }`}
            >
              {s.label}
              {i === active && !reduced && (
                <span
                  key={cycle}
                  aria-hidden
                  className="gallery-progress absolute inset-x-0 bottom-0 h-[2px] bg-white/70"
                  style={
                    {
                      animationPlayState: running ? "running" : "paused",
                      "--d": `${INTERVAL}ms`,
                    } as CSSProperties
                  }
                />
              )}
            </button>
          ))}
        </div>
        {!reduced && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause the slideshow" : "Play the slideshow"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line-2 bg-card text-ink-2 transition-colors hover:text-ink"
          >
            {playing ? (
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                <rect x="2" y="1.5" width="2.6" height="9" rx="0.6" fill="currentColor" />
                <rect x="7.4" y="1.5" width="2.6" height="9" rx="0.6" fill="currentColor" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                <path d="M3 1.8v8.4L10 6z" fill="currentColor" />
              </svg>
            )}
          </button>
        )}
      </div>

      <figure
        id="console-shot"
        role="tabpanel"
        aria-labelledby={`tab-${shot.id}`}
        aria-live={running ? "off" : "polite"}
        className="mt-4 overflow-hidden rounded-xl border border-line-2 bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_40px_80px_-48px_rgba(30,40,60,0.45)]"
      >
        <div className="flex items-center gap-3 border-b border-line bg-paper px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
            <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
            <span className="h-2.5 w-2.5 rounded-full bg-line-2" />
          </span>
          <span className="mx-auto min-w-0 truncate rounded-md border border-line bg-card px-3 py-1 font-mono text-[11.5px] text-ink-3">
            your-server:30300{shot.path}
          </span>
          <span className="w-[42px]" aria-hidden />
        </div>
        <div className="grid aspect-[16/10]">
          {SHOTS.map((s, i) =>
            // Render the current frame, the next one once the gallery is in view, and frames already shown.
            !(loaded.has(i) || i === active || (visible && i === (active + 1) % SHOTS.length)) ? null : (
              <Image
                key={s.id}
                src={s.img}
                alt={i === active ? `Acceleratio console: ${s.label}. ${s.caption}` : ""}
                aria-hidden={i !== active}
                placeholder="blur"
                quality={82}
                sizes="(min-width: 1760px) 1616px, 94vw"
                className={`block h-full w-full object-cover object-top transition-opacity duration-700 ease-out [grid-area:1/1] ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ),
          )}
        </div>
      </figure>
      <p className="mt-4 flex flex-col justify-between gap-2 text-sm text-ink-2 sm:flex-row">
        <span>{shot.caption}</span>
        <span className="text-ink-3">Real screenshots of the console, from a running install with demo data.</span>
      </p>
    </div>
  );
}
