import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { site, isValidApk } from "@/config/site";

const TITLE = "Avinash Kumar — Developer, App Builder & Video Editor";
const DESC =
  "Explore Avinash Kumar's work in software development, application building, and video editing. Discover CashTrail, his personal finance application.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
  }),
  component: Index,
});

const NAV = [
  { href: "#about", label: "About" },
  { href: "#cashtrail", label: "CashTrail" },
  { href: "#creative", label: "Creative" },
  { href: "#contact", label: "Contact" },
];

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

// Content is visible by default; it is only hidden once JS is ready, and a
// data attribute (which React never overwrites) marks revealed elements.
// A timeout failsafe guarantees nothing stays invisible.
function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const show = (el: Element) => el.setAttribute("data-in", "");
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (show(e.target), io.unobserve(e.target))),
      { threshold: 0, rootMargin: "0px 0px -5% 0px" },
    );
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) show(el);
      else io.observe(el);
    });
    root.classList.add("reveal-ready");
    const t = window.setTimeout(() => document.querySelectorAll(".reveal").forEach(show), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
      root.classList.remove("reveal-ready");
    };
  }, []);
}

const Wrap = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-[1240px] px-5 md:px-10 ${className}`}>{children}</div>
);

const Label = ({
  n,
  children,
  className = "",
}: {
  n: string;
  children: ReactNode;
  className?: string;
}) => (
  <div className={`label-mono flex items-center gap-3 ${className}`}>
    <span>{n}</span>
    <span className="h-px w-10 bg-current opacity-40" />
    <span className="opacity-70">{children}</span>
  </div>
);

const btnBase =
  "inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
const btnForest = `${btnBase} bg-forest text-primary-foreground hover:bg-lime hover:text-accent-foreground`;
const btnLime = `${btnBase} bg-lime text-accent-foreground hover:bg-background`;
const btnOutline = `${btnBase} border border-foreground hover:bg-foreground hover:text-background`;
const btnOutlineLight = `${btnBase} border border-primary-foreground/40 text-primary-foreground hover:border-lime hover:text-lime`;

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${scrolled || open ? "border-border bg-background/90 backdrop-blur" : "border-transparent bg-background"}`}
    >
      <Wrap className="flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-3 leading-none">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest font-display text-sm italic text-lime">
            ak
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-bold tracking-tight">AVINASH KUMAR</span>
            <span className="label-mono mt-1 text-[0.6rem] text-muted-foreground">
              Developer / Creator
            </span>
          </span>
        </a>
        <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-8">
          <ul className="flex items-center gap-8 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="group relative py-1">
                  {n.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
          {site.socials.instagram && (
            <a href={site.socials.instagram} {...ext} className={`${btnForest} px-4 py-2 text-xs`}>
              Instagram ↗
            </a>
          )}
        </nav>
        <button
          className="label-mono rounded-full border border-border px-4 py-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </Wrap>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-border md:hidden">
          <Wrap className="py-6">
            <ul className="flex flex-col gap-4">
              {NAV.map((n, i) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 font-display text-4xl"
                  >
                    <span className="label-mono text-muted-foreground">0{i + 1}</span>
                    {n.label}
                  </a>
                </li>
              ))}
              {site.socials.instagram && (
                <li>
                  <a href={site.socials.instagram} {...ext} className={`${btnForest} mt-2`}>
                    Instagram ↗
                  </a>
                </li>
              )}
            </ul>
          </Wrap>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28">
      <Wrap className="grid gap-14 md:grid-cols-12 md:gap-8">
        <div className="reveal flex flex-col justify-between md:col-span-7">
          <p className="label-mono flex items-center gap-2 text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-lime ring-2 ring-forest/20" /> Avinash Kumar —
            Haldia University
          </p>
          <h1 className="mt-10 font-display text-[clamp(3rem,7.4vw,6.75rem)] leading-[0.95] tracking-[-0.03em]">
            Building useful
            <br />
            things.
            <br />
            <em className="text-forest">Making them</em>
            <br />
            <em className="relative inline-block text-forest">
              look good.
              <svg
                aria-hidden
                viewBox="0 0 300 20"
                className="absolute -bottom-2 left-0 w-full text-lime"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 14 C 80 2, 200 2, 298 12"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </em>
          </h1>
          <div className="mt-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              I'm Avinash, a B.Tech student at Haldia University who enjoys building digital
              products and bringing ideas to life through code and visual storytelling.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#cashtrail" className={btnForest}>
              Explore my work <span aria-hidden>↓</span>
            </a>
            <a href="#contact" className={btnOutline}>
              Say hello
            </a>
          </div>
        </div>

        <div className="reveal relative md:col-span-5">
          <div
            className="absolute -right-10 -top-6 h-[85%] w-[85%] rounded-t-full bg-sage md:-right-16"
            aria-hidden
          />
          <div className="relative ml-auto aspect-[4/5] w-[88%] overflow-hidden rounded-t-full border border-forest/15 bg-forest">
            {site.portrait ? (
              <img
                src={site.portrait}
                alt="Portrait of Avinash Kumar"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="relative flex h-full w-full items-end justify-center">
                <svg
                  viewBox="0 0 200 220"
                  className="w-3/4 text-primary-foreground/15"
                  aria-hidden
                  fill="currentColor"
                >
                  <circle cx="100" cy="80" r="42" />
                  <path d="M18 220c0-54 37-88 82-88s82 34 82 88z" />
                </svg>
                <span className="label-mono absolute left-1/2 top-1/3 -translate-x-1/2 rounded-full bg-lime px-3 py-1.5 text-accent-foreground">
                  Your photo here
                </span>
              </div>
            )}
          </div>
          <div className="float-slow absolute -left-2 bottom-32 rounded-full bg-lime px-5 py-3 font-display text-lg italic text-accent-foreground shadow-lg md:-left-8">
            hi, I'm Avinash
          </div>
          <ul className="label-mono relative mt-6 flex flex-wrap justify-between gap-2 border-t border-foreground pt-3">
            <li>Developer</li>
            <li aria-hidden>·</li>
            <li>App Builder</li>
            <li aria-hidden>·</li>
            <li>Video Editor</li>
          </ul>
        </div>
      </Wrap>
    </section>
  );
}

function Marquee() {
  const words = [
    "Development",
    "App Building",
    "Video Editing",
    "CashTrail",
    "Visual Storytelling",
  ];
  const row = [...words, ...words];
  return (
    <div
      className="overflow-hidden border-y border-forest bg-lime py-4 text-accent-foreground"
      aria-hidden
    >
      <div className="marquee flex w-max gap-10 whitespace-nowrap font-display text-2xl italic">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            {w}
            <span className="not-italic">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  const areas = [
    {
      n: "01",
      t: "Development",
      d: "Writing software that is practical, readable and built to be used — not just to be shown.",
    },
    {
      n: "02",
      t: "App Building",
      d: "Taking an everyday problem and shaping it into an application people can actually rely on.",
    },
    {
      n: "03",
      t: "Video Editing",
      d: "Working with pacing, sound and composition to turn raw footage into a story.",
    },
  ];
  return (
    <section id="about" className="scroll-mt-16 py-24 md:py-36">
      <Wrap>
        <Label n="01">About</Label>
        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <h2 className="reveal font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-[1] tracking-[-0.02em] md:col-span-7">
            Curious about how things work.{" "}
            <em className="text-forest">Always building something.</em>
          </h2>
          <div className="reveal md:col-span-4 md:col-start-9 md:pt-4">
            <p className="text-lg leading-relaxed">
              I'm studying for my B.Tech at Haldia University. Outside of lectures, most of my time
              goes into building software and applications — figuring out how things work, then
              making them work a little better.
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              I also edit video, which has taught me as much about rhythm and detail as code has.
            </p>
          </div>
        </div>

        <ol className="mt-20 grid md:grid-cols-3">
          {areas.map((a, i) => (
            <li
              key={a.n}
              className={`reveal group border-t border-foreground py-8 md:px-8 md:first:pl-0 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-l-border ${i === 1 ? "md:mt-16" : i === 2 ? "md:mt-32" : ""}`}
            >
              <span className="font-display text-6xl italic text-forest/25 transition-colors group-hover:text-forest">
                {a.n}
              </span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{a.t}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{a.d}</p>
            </li>
          ))}
        </ol>
      </Wrap>
    </section>
  );
}

function Phone({ src, label, className = "" }: { src: string; label: string; className?: string }) {
  return (
    <div
      className={`rounded-[2.2rem] bg-foreground p-2 shadow-2xl ring-1 ring-primary-foreground/10 ${className}`}
    >
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.8rem] bg-background">
        {src ? (
          <img src={src} alt={label} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div
            className="flex h-full flex-col gap-2.5 bg-sage p-3 md:p-4"
            role="img"
            aria-label={`${label} placeholder`}
          >
            <div className="mx-auto h-1.5 w-10 rounded-full bg-forest/20" />
            <div className="mt-3 h-2.5 w-1/2 rounded-full bg-forest/25" />
            <div className="h-16 rounded-lg bg-forest/90 md:h-20" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-10 rounded-lg bg-background" />
              <div className="h-10 rounded-lg bg-background" />
            </div>
            {[0, 1, 2].map((k) => (
              <div key={k} className="h-5 rounded-md bg-background/80" />
            ))}
            <span className="label-mono mt-auto self-start rounded-full bg-lime px-2 py-1 text-[0.5rem] text-accent-foreground md:text-[0.55rem]">
              {label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function CashTrail() {
  const ct = site.cashtrail;
  const ready = isValidApk(ct.apkUrl);
  const features = [
    ["Income & expenses", "Track money coming in and going out."],
    ["Transactions", "Keep every transaction organized."],
    ["Spending review", "Look back at where money went."],
    ["Records", "Structured financial records in one place."],
  ];
  const meta = [
    ["Role", "Developer"],
    ["Category", "Personal Finance"],
    ["Project", "CashTrail"],
  ];
  return (
    <section
      id="cashtrail"
      className="scroll-mt-16 overflow-hidden bg-forest py-24 text-primary-foreground md:py-36"
    >
      <Wrap>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Label n="02" className="text-lime">
            Flagship project
          </Label>
          {ct.platformConfirmed && (
            <span className="label-mono rounded-full bg-lime px-3 py-1 text-accent-foreground">
              Android app
            </span>
          )}
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <div className="reveal md:col-span-7">
            <p className="label-mono text-lime">CashTrail</p>
            <h2 className="mt-4 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.03em]">
              Your money.
              <br />
              <em className="text-lime">A clearer picture.</em>
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-relaxed opacity-75">
              CashTrail is a personal finance application designed to help people organize financial
              transactions, track income and expenses, and understand their spending more clearly.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              {ready ? (
                <a href={ct.apkUrl} download="CashTrail.apk" {...ext} className={btnLime}>
                  Get CashTrail <span aria-hidden>↓</span>
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className={`${btnBase} cursor-not-allowed border border-dashed border-primary-foreground/40 opacity-70`}
                >
                  Download coming soon
                </button>
              )}
              {ct.repoUrl && (
                <a href={ct.repoUrl} {...ext} className={btnOutlineLight}>
                  Repository ↗
                </a>
              )}
            </div>
            <dl className="mt-12 grid max-w-lg grid-cols-3 border-t border-primary-foreground/20 pt-5">
              {meta.map(([k, v]) => (
                <div key={k}>
                  <dt className="label-mono opacity-50">{k}</dt>
                  <dd className="mt-1 text-sm font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="reveal relative md:col-span-5">
            <div className="relative grid grid-cols-3 items-end gap-3 pt-6 md:gap-4">
              {ct.screenshots.map((s, i) => (
                <Phone
                  key={i}
                  src={s}
                  label={`Screenshot 0${i + 1}`}
                  className={`transition-transform duration-500 hover:-translate-y-2 ${i === 1 ? "-translate-y-8 scale-110" : "opacity-90"}`}
                />
              ))}
            </div>
          </div>
        </div>

        <ul className="mt-20 grid gap-px overflow-hidden border-t border-primary-foreground/20 sm:grid-cols-2 md:grid-cols-4">
          {features.map(([k, v], i) => (
            <li key={k} className="group py-8 md:pr-8">
              <span className="label-mono text-lime">0{i + 1}</span>
              <h3 className="mt-4 font-display text-2xl">{k}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-65">{v}</p>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}

function Interlude() {
  return (
    <section aria-label="What's next" className="py-24 md:py-36">
      <Wrap className="grid gap-8 md:grid-cols-12">
        <p className="reveal font-display text-[clamp(2.25rem,5.5vw,5rem)] leading-[1] tracking-[-0.02em] md:col-span-8">
          One idea at a time.
          <br />
          <em className="text-forest">Built with intention.</em>
        </p>
        <p className="reveal self-end leading-relaxed text-muted-foreground md:col-span-3 md:col-start-10">
          I'm continuing to explore new ideas across software, applications, and creative work.
        </p>
      </Wrap>
    </section>
  );
}

function Creative() {
  const v = site.video;
  return (
    <section
      id="creative"
      aria-labelledby="video-h"
      className="scroll-mt-16 bg-sage py-24 md:py-36"
    >
      <Wrap>
        <Label n="03" className="text-forest">
          Video & creative
        </Label>
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <div className="reveal flex flex-col justify-between md:col-span-4">
            <h2
              id="video-h"
              className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.02em]"
            >
              Beyond
              <br />
              <em className="text-forest">the code.</em>
            </h2>
            <div className="mt-8">
              <p className="leading-relaxed text-muted-foreground">
                I also enjoy video editing, exploring visual rhythm, and turning raw footage into
                something worth watching.
              </p>
              {site.socials.instagram && (
                <a href={site.socials.instagram} {...ext} className={`${btnForest} mt-8`}>
                  Watch on Instagram ↗
                </a>
              )}
            </div>
          </div>
          <div className="reveal md:col-span-8">
            <div className="group relative aspect-video overflow-hidden rounded-2xl bg-forest">
              {v.embedUrl ? (
                <iframe
                  src={v.embedUrl}
                  title="Video editing showreel"
                  className="h-full w-full"
                  allowFullScreen
                  loading="lazy"
                />
              ) : v.src ? (
                <div className="relative flex h-full w-full items-center justify-center bg-black/40">
                  {v.poster && (
                    <img
                      src={v.poster}
                      alt=""
                      aria-hidden
                      className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-35 blur-2xl"
                    />
                  )}
                  <video
                    src={v.src}
                    poster={v.poster}
                    controls
                    playsInline
                    preload="metadata"
                    className="relative z-10 h-full w-auto max-w-full object-contain"
                  >
                    <source src={v.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : v.poster ? (
                <div className="relative flex h-full w-full items-center justify-center">
                  <img
                    src={v.poster}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-cover blur-2xl opacity-35 scale-110"
                  />
                  <img
                    src={v.poster}
                    alt="Video thumbnail"
                    className="relative z-10 h-full w-auto max-w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-5 text-primary-foreground">
                  <div className="absolute inset-0 grid grid-cols-6 opacity-10" aria-hidden>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="border-r border-primary-foreground" />
                    ))}
                  </div>
                  <span
                    className="relative flex h-20 w-20 items-center justify-center rounded-full bg-lime text-2xl text-accent-foreground transition-transform duration-300 group-hover:scale-110"
                    aria-hidden
                  >
                    ▶
                  </span>
                  <span className="label-mono relative opacity-70">
                    Video thumbnail — replace in site config
                  </span>
                </div>
              )}
              <span className="label-mono pointer-events-none absolute left-4 top-4 z-20 rounded-full bg-background/90 px-3 py-1 text-foreground backdrop-blur-sm">
                Showreel
              </span>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

function Contact() {
  const s = site.socials;
  const links = [
    s.instagram && { label: "Instagram", href: s.instagram },
    s.email && { label: "Email", href: `mailto:${s.email}`, sub: s.email },
    s.github && { label: "GitHub", href: s.github },
    s.linkedin && { label: "LinkedIn", href: s.linkedin },
  ].filter(Boolean) as { label: string; href: string; sub?: string }[];
  return (
    <section
      id="contact"
      className="scroll-mt-16 bg-forest pt-24 pb-10 text-primary-foreground md:pt-36"
    >
      <Wrap>
        <Label n="04" className="text-lime">
          Contact
        </Label>
        <h2 className="reveal mt-12 font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.9] tracking-[-0.03em]">
          Got something
          <br />
          <em className="text-lime">in mind?</em>
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-xl leading-relaxed opacity-80">
              Have an idea, a project, or just want to connect? Let's talk.
            </p>
            {s.email && (
              <a href={`mailto:${s.email}`} className={`${btnLime} mt-8`}>
                Say hello →
              </a>
            )}
          </div>
          <ul className="border-t border-primary-foreground/20 md:col-span-6 md:col-start-7">
            {links.length ? (
              links.map((l) => (
                <li key={l.label} className="border-b border-primary-foreground/20">
                  <a
                    href={l.href}
                    {...(l.href.startsWith("mailto:") ? {} : ext)}
                    className="group flex items-baseline justify-between gap-4 py-5 transition-colors hover:text-lime"
                  >
                    <span className="font-display text-3xl">{l.label}</span>
                    <span className="label-mono flex items-center gap-3 opacity-60">
                      <span className="hidden normal-case sm:inline">{l.sub}</span>
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">
                        ↗
                      </span>
                    </span>
                  </a>
                </li>
              ))
            ) : (
              <li className="label-mono py-5 opacity-60">Contact details coming soon.</li>
            )}
          </ul>
        </div>
      </Wrap>
      <Wrap className="label-mono mt-28 flex flex-col justify-between gap-3 border-t border-primary-foreground/20 pt-6 opacity-70 md:flex-row">
        <span>Avinash Kumar</span>
        <span>Developer / Creator</span>
        <span>© {new Date().getFullYear()}</span>
      </Wrap>
    </section>
  );
}

function Index() {
  useReveal();
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-lime focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <CashTrail />
        <Interlude />
        <Creative />
        <Contact />
      </main>
    </>
  );
}
