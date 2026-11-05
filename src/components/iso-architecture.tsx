/* Isometric drawing of one Acceleratio server: a chassis, then four layers above it.
   World units: x 0..10 (right-down), y 0..4 (left-down), z up. Facts from the installer docs.
   Server-rendered: hovering a layer (or its card) is pure CSS, see the .iso-* rules in globals.css. */

const S = 40;
const OX = 440;
const OY = 610;
const P = (x: number, y: number, z: number): [number, number] => [
  OX + (x - 5 - (y - 2)) * 0.866 * S,
  OY + (x - 5 + (y - 2)) * 0.5 * S - z * S,
];
const pts = (...p: [number, number][]) => p.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" ");

/* Tones are CSS classes that set the face colours; the active layer swaps them in CSS. */
type Tone = "t-chassis" | "t-block" | "t-sky" | "t-plate";

function Box({ x0, x1, y0, y1, z0, z1, tone }: { x0: number; x1: number; y0: number; y1: number; z0: number; z1: number; tone: Tone }) {
  return (
    <g className={tone} strokeWidth="0.8">
      <polygon className="f-l" points={pts(P(x0, y1, z1), P(x1, y1, z1), P(x1, y1, z0), P(x0, y1, z0))} />
      <polygon className="f-r" points={pts(P(x1, y0, z1), P(x1, y1, z1), P(x1, y1, z0), P(x1, y0, z0))} />
      <polygon className="f-t" points={pts(P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1))} />
    </g>
  );
}

function Cylinder({ x, y, r, z0, z1, tone }: { x: number; y: number; r: number; z0: number; z1: number; tone: Tone }) {
  const [cx, top] = P(x, y, z1);
  const [, bot] = P(x, y, z0);
  const rx = r * S * 1.22;
  const ry = r * S * 0.7;
  return (
    <g className={tone} strokeWidth="0.8">
      <path className="f-l" d={`M${cx - rx},${top} L${cx - rx},${bot} A${rx},${ry} 0 0 0 ${cx + rx},${bot} L${cx + rx},${top} Z`} />
      <ellipse className="f-t" cx={cx} cy={top} rx={rx} ry={ry} />
      <ellipse className="f-ring" cx={cx} cy={top + (bot - top) * 0.45} rx={rx} ry={ry} />
    </g>
  );
}

const LAYERS = [
  {
    key: "control",
    name: "Control plane",
    z: 8.8,
    items: [
      ["Console", "The web app your team signs in to"],
      ["API", "Creates namespaces, workloads, volumes and network policies"],
      ["PostgreSQL", "Projects, services, versions and users"],
    ],
  },
  {
    key: "workloads",
    name: "Your workloads",
    z: 6.5,
    items: [
      ["Projects", "One namespace each, isolated by Cilium policies"],
      ["Services", "Docker images with versioned configuration"],
      ["Domains", "Generated and custom, certificates from Let's Encrypt"],
    ],
  },
  {
    key: "data",
    name: "Data",
    z: 4.2,
    items: [
      ["Volumes", "SeaweedFS, stored under /var/lib/seaweedfs"],
      ["Buckets", "The in-cluster SeaweedFS S3 endpoint"],
      ["Metrics", "VictoriaMetrics, 14 days on local disk"],
    ],
  },
  {
    key: "cluster",
    name: "Cluster",
    z: 1.9,
    items: [
      ["k3s", "Single node with embedded etcd"],
      ["Cilium", "Networking, replaces kube-proxy"],
      ["Traefik", "Ingress and TLS, bundled with k3s"],
    ],
  },
] as const;

const PT = 0.12; // plate thickness

function Plate({ z }: { z: number }) {
  return <Box x0={0.4} x1={9.6} y0={0.4} y1={3.6} z0={z} z1={z + PT} tone="t-plate" />;
}

function Cluster({ z }: { z: number }) {
  const t = z + PT;
  const hex: [number, number][] = [
    [4.4, 1.6], [5.3, 1.2], [6.2, 1.6], [6.2, 2.6], [5.3, 3.0], [4.4, 2.6], [5.3, 2.1],
  ];
  return (
    <g>
      <Box x0={0.9} x1={3.3} y0={1.1} y1={3.1} z0={t} z1={t + 0.55} tone="t-block" />
      {hex.slice(0, 6).map(([x, y], i) => {
        const [a, b] = P(x, y, t + 0.08);
        const [c, d] = P(hex[6][0], hex[6][1], t + 0.08);
        const [e, f] = P(hex[(i + 1) % 6][0], hex[(i + 1) % 6][1], t + 0.08);
        return (
          <g key={i} className="iso-mesh" strokeWidth="0.9">
            <line x1={a} y1={b} x2={c} y2={d} />
            <line x1={a} y1={b} x2={e} y2={f} />
          </g>
        );
      })}
      {hex.map(([x, y], i) => (
        <Box key={i} x0={x - 0.17} x1={x + 0.17} y0={y - 0.17} y1={y + 0.17} z0={t} z1={t + 0.24} tone={i === 6 ? "t-sky" : "t-block"} />
      ))}
      <Box x0={7.0} x1={9.2} y0={1.9} y1={2.9} z0={t} z1={t + 0.3} tone="t-block" />
      <Box x0={7.0} x1={7.4} y0={1.9} y1={2.9} z0={t + 0.3} z1={t + 0.9} tone="t-block" />
      <Box x0={8.8} x1={9.2} y0={1.9} y1={2.9} z0={t + 0.3} z1={t + 0.9} tone="t-block" />
    </g>
  );
}

function Data({ z }: { z: number }) {
  const t = z + PT;
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <Box key={i} x0={0.9} x1={3.2} y0={1.1} y1={3.0} z0={t + i * 0.22} z1={t + i * 0.22 + 0.14} tone="t-block" />
      ))}
      <Cylinder x={5.1} y={2.1} r={0.8} z0={t} z1={t + 0.7} tone="t-block" />
      {[0.5, 0.9, 0.65, 1.15, 0.8, 1.35].map((h, i) => (
        <Box key={i} x0={6.9 + i * 0.38} x1={7.14 + i * 0.38} y0={1.9} y1={2.8} z0={t} z1={t + h} tone={i === 5 ? "t-sky" : "t-block"} />
      ))}
    </g>
  );
}

function Workloads({ z }: { z: number }) {
  const t = z + PT;
  const ns = [
    { x0: 0.8, x1: 4.6, y0: 0.8, y1: 3.2, name: "storefront", pods: [[1.4, 1.5], [2.3, 1.5], [3.2, 1.5], [4.0, 1.5], [1.4, 2.5], [2.3, 2.5], [3.2, 2.5]] },
    { x0: 4.9, x1: 7.0, y0: 0.8, y1: 3.2, name: "internal-tools", pods: [[5.5, 2.0], [6.4, 2.0]] },
    { x0: 7.3, x1: 9.2, y0: 0.8, y1: 3.2, name: "analytics", pods: [[7.9, 2.0], [8.7, 2.0]] },
  ];
  return (
    <g>
      {ns.map((n) => {
        const ring = pts(P(n.x0, n.y0, t + 0.01), P(n.x1, n.y0, t + 0.01), P(n.x1, n.y1, t + 0.01), P(n.x0, n.y1, t + 0.01));
        return (
          <g key={n.name}>
            <polygon className="iso-ns" points={ring} strokeWidth="0.9" strokeDasharray="4 4" />
            {n.pods.map(([x, y], i) => (
              <Box key={i} x0={x - 0.28} x1={x + 0.28} y0={y - 0.28} y1={y + 0.28} z0={t} z1={t + 0.48} tone={n.name === "storefront" && i === 0 ? "t-sky" : "t-block"} />
            ))}
          </g>
        );
      })}
    </g>
  );
}

function Control({ z }: { z: number }) {
  const t = z + PT;
  return (
    <g>
      <Box x0={0.9} x1={3.7} y0={1.6} y1={2.2} z0={t} z1={t + 1.1} tone="t-block" />
      <polygon className="iso-screen" points={pts(P(1.1, 2.2, t + 0.95), P(3.5, 2.2, t + 0.95), P(3.5, 2.2, t + 0.2), P(1.1, 2.2, t + 0.2))} opacity="0.55" />
      <Box x0={4.6} x1={5.9} y0={1.4} y1={2.7} z0={t} z1={t + 0.8} tone="t-sky" />
      <Cylinder x={7.9} y={2.1} r={0.6} z0={t} z1={t + 0.7} tone="t-block" />
    </g>
  );
}

function Chassis() {
  const bays = Array.from({ length: 10 }, (_, i) => 0.7 + i * 0.88);
  return (
    <g>
      <Box x0={0} x1={10} y0={0} y1={4} z0={0} z1={1.1} tone="t-chassis" />
      {bays.map((x) => (
        <polygon key={x} points={pts(P(x, 4, 0.85), P(x + 0.66, 4, 0.85), P(x + 0.66, 4, 0.3), P(x, 4, 0.3))} fill="#0c0d0f" stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" />
      ))}
      {bays.map((x, i) => {
        const [a, b] = P(x + 0.12, 4, 0.42);
        return <circle key={`l${x}`} cx={a} cy={b} r="1.4" fill={i % 3 === 1 ? "oklch(0.78 0.14 150)" : "oklch(0.74 0.13 245)"} opacity="0.9" />;
      })}
      <polyline points={pts(P(10, 0.5, 0.55), P(10, 3.5, 0.55))} stroke="oklch(0.7 0.16 265)" strokeWidth="2.2" strokeLinecap="round" />
      <polyline points={pts(P(10, 0.5, 0.55), P(10, 3.5, 0.55))} stroke="oklch(0.7 0.16 265)" strokeWidth="9" strokeLinecap="round" opacity="0.18" />
    </g>
  );
}

/* Paths the packets travel, in screen space. */
const Z = { control: 8.8, workloads: 6.5, data: 4.2, cluster: 1.9 };

function paths() {
  const users: [number, number] = [OX - 340, P(0, 4, Z.cluster)[1] - 10];
  const ops: [number, number] = P(11.8, 3.2, 0.6);
  const traefik = P(8.1, 2.9, Z.cluster + PT + 0.3);
  const web = P(1.4, 2.5, Z.workloads + PT + 0.48);
  const console_ = P(2.3, 2.2, Z.control + PT + 0.6);
  const api = P(5.25, 2.7, Z.control + PT + 0.4);
  const k3s = P(2.1, 3.1, Z.cluster + PT + 0.3);
  const L = (...p: [number, number][]) => "M" + p.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" L");
  return {
    users,
    ops,
    list: [
      { id: "in", tone: "user", d: L(users, [users[0] + 140, traefik[1] + 30], traefik, [traefik[0] - 40, web[1] + 70], web), dur: 4.4 },
      { id: "ops", tone: "ops", d: L(ops, [ops[0], console_[1] + 90], [console_[0] + 60, console_[1] + 40], console_, api, [api[0] - 30, api[1] + 120], [k3s[0] + 80, k3s[1] - 40], k3s), dur: 6.4 },
    ],
  };
}

export function IsoArchitecture() {
  const { users, ops, list } = paths();

  return (
    <div className="iso-wrap">
      <svg
        viewBox="0 0 1060 820"
        className="mx-auto block w-full max-w-[1240px]"
        role="img"
        aria-label="One Acceleratio server with four layers: the cluster (k3s, Cilium, Traefik), data (volumes, S3 buckets, metrics), your workloads (pods grouped into isolated projects) and the control plane (console, API, PostgreSQL). Users reach services through Traefik on ports 80 and 443; operators reach the console on 30300 and the API on 30080."
      >
        <defs>
          <radialGradient id="iso-floor" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#aac4e6" stopOpacity="0.18" />
            <stop offset="1" stopColor="#aac4e6" stopOpacity="0" />
          </radialGradient>
          <filter id="iso-cloud" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="28" />
          </filter>
          <filter id="iso-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* clouds drifting around the stack (the drift is CSS, off under reduced motion) */}
        <g filter="url(#iso-cloud)" className="iso-clouds">
          <ellipse cx="200" cy="80" rx="170" ry="40" fill="#eef3fa" opacity="0.10" />
          <ellipse cx="640" cy="40" rx="220" ry="44" fill="#eef3fa" opacity="0.08" />
          <ellipse cx="930" cy="170" rx="150" ry="36" fill="#eef3fa" opacity="0.07" />
          <ellipse cx="110" cy="560" rx="140" ry="34" fill="#eef3fa" opacity="0.06" />
        </g>
        <ellipse cx={OX} cy={OY + 120} rx="340" ry="80" fill="url(#iso-floor)" />

        <Chassis />

        {/* corner pillars tying the layers to the server */}
        {[
          [0.4, 3.6],
          [9.6, 3.6],
          [9.6, 0.4],
        ].map(([x, y]) => {
          const [a, b] = P(x, y, 1.1);
          const [, d] = P(x, y, Z.control);
          return <line key={`${x}${y}`} x1={a} y1={b} x2={a} y2={d} stroke="rgba(255,255,255,0.12)" strokeDasharray="2 5" />;
        })}

        {[3, 2, 1, 0].map((i) => {
          const L = LAYERS[i];
          const [rx, ry] = P(9.6, 0.4, L.z + PT);
          return (
            <g key={L.key} className="iso-layer cursor-pointer" data-l={L.key}>
              <Plate z={L.z} />
              {L.key === "cluster" && <Cluster z={L.z} />}
              {L.key === "data" && <Data z={L.z} />}
              {L.key === "workloads" && <Workloads z={L.z} />}
              {L.key === "control" && <Control z={L.z} />}
              <line className="iso-lead" x1={rx} y1={ry} x2={790} y2={ry} strokeWidth="1" />
              <circle className="iso-dot" cx={rx} cy={ry} r="2.5" />
              <text className="iso-name" x={804} y={ry - 4} fontSize="16" fontWeight="500">
                {L.name}
              </text>
              <text x={804} y={ry + 15} fill="#7f858c" fontSize="12" fontFamily="var(--font-geist-mono)">
                {L.items.map((x) => x[0].toLowerCase()).join(" · ")}
              </text>
            </g>
          );
        })}

        {/* where traffic comes from */}
        <g>
          <circle cx={users[0]} cy={users[1]} r="20" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.3)" />
          <path d={`M${users[0] - 20},${users[1]} H${users[0] + 20} M${users[0]},${users[1] - 20} C${users[0] - 12},${users[1] - 8} ${users[0] - 12},${users[1] + 8} ${users[0]},${users[1] + 20} M${users[0]},${users[1] - 20} C${users[0] + 12},${users[1] - 8} ${users[0] + 12},${users[1] + 8} ${users[0]},${users[1] + 20}`} fill="none" stroke="rgba(255,255,255,0.3)" />
          <text x={users[0]} y={users[1] + 42} textAnchor="middle" fill="#dfe2e6" fontSize="13">
            Your users
          </text>
          <text x={users[0]} y={users[1] + 58} textAnchor="middle" fill="#7f858c" fontSize="11" fontFamily="var(--font-geist-mono)">
            :80 :443
          </text>
        </g>
        <g>
          <rect x={ops[0] - 22} y={ops[1] - 14} width="44" height="28" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.3)" />
          <path d={`M${ops[0] - 30},${ops[1] + 18} H${ops[0] + 30}`} stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
          <text x={ops[0]} y={ops[1] + 40} textAnchor="middle" fill="#dfe2e6" fontSize="13">
            Your operators
          </text>
          <text x={ops[0]} y={ops[1] + 56} textAnchor="middle" fill="#7f858c" fontSize="11" fontFamily="var(--font-geist-mono)">
            :30300 :30080
          </text>
        </g>

        {/* routes and the packets moving along them (packets hidden under reduced motion) */}
        {list.map((p) => (
          <path key={p.id} d={p.d} fill="none" stroke={p.tone === "user" ? "rgba(140,180,240,0.35)" : "rgba(255,255,255,0.22)"} strokeWidth="1" strokeDasharray="3 5" />
        ))}
        {list.map((p) =>
          [0, 0.5].map((off) => (
            <g key={`${p.id}${off}`} className="iso-packet">
              <circle r="5" fill={p.tone === "user" ? "oklch(0.78 0.13 245)" : "#ffffff"} opacity="0.5" filter="url(#iso-glow)">
                <animateMotion dur={`${p.dur}s`} begin={`${-off * p.dur}s`} repeatCount="indefinite" path={p.d} />
              </circle>
              <circle r="2.2" fill={p.tone === "user" ? "oklch(0.86 0.09 245)" : "#ffffff"}>
                <animateMotion dur={`${p.dur}s`} begin={`${-off * p.dur}s`} repeatCount="indefinite" path={p.d} />
              </circle>
            </g>
          )),
        )}
      </svg>

      <ul className="mx-auto mt-6 flex max-w-[1240px] flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-[var(--n-text-2)]">
        <li className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-[oklch(0.78_0.13_245)] shadow-[0_0_8px_oklch(0.78_0.13_245)]" aria-hidden />
          Requests from your users: ports 80 and 443, through Traefik, to your services
        </li>
        <li className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_white]" aria-hidden />
          Your operators: the console on 30300, then the API, which drives the cluster
        </li>
      </ul>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {LAYERS.map((layer) => (
          <li key={layer.key}>
            <button
              type="button"
              data-legend={layer.key}
              className="iso-legend-item h-full w-full rounded-xl border border-[var(--n-line)] px-4 py-3.5 text-left transition-colors duration-300"
            >
              <span className="block text-[15px] font-medium text-[var(--n-text)]">{layer.name}</span>
              <span className="mt-2 grid gap-1.5">
                {layer.items.map(([n, d]) => (
                  <span key={n} className="block text-[13px] leading-snug">
                    <span className="text-[var(--n-text-2)]">{n}</span> <span className="text-[var(--n-text-3)]">{d}</span>
                  </span>
                ))}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
