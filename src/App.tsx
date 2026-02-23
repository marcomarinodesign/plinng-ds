import { useState, useEffect } from "react";
import { Button } from "./components/Button";
import { LinkWeb } from "./components/LinkWeb";
import { Input } from "./components/Input";
import { Badge } from "./components/Badge";
import { Text, type TextVariant } from "./components/Text";

// ─── Icons ───────────────────────────────────────────────────────────────────

const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Nav config ──────────────────────────────────────────────────────────────

const NAV = [
  {
    group: "Foundation",
    items: [
      { label: "Colors",          href: "#colors"          },
      { label: "Typography",      href: "#typography"      },
      { label: "Spacing",         href: "#spacing"         },
      { label: "Border",          href: "#border"          },
      { label: "Shadows",         href: "#shadows"         },
      { label: "Sizing & Layout", href: "#sizing-layout"   },
    ],
  },
  {
    group: "Components",
    items: [
      { label: "Button",  href: "#button"  },
      { label: "Badge",   href: "#badge"   },
      { label: "Input",   href: "#input"   },
      { label: "LinkWeb", href: "#linkweb" },
    ],
  },
];

// ─── Color palette ───────────────────────────────────────────────────────────

type ColorToken = { name: string; hex: string; dark?: boolean };
type ColorGroup = { group: string; colors: ColorToken[] };

const COLOR_PALETTE: ColorGroup[] = [
  {
    group: "Accent",
    colors: [
      { name: "Soft 100",    hex: "#EEFFC7" },
      { name: "Light 200",   hex: "#DBFF95" },
      { name: "Primary 300", hex: "#BEFF50" },
      { name: "Middle 500",  hex: "#86DD05" },
      { name: "Dark 700",    hex: "#4D8605", dark: true },
    ],
  },
  {
    group: "Basics",
    colors: [
      { name: "Black",          hex: "#000000", dark: true },
      { name: "White",          hex: "#FFFFFF" },
      { name: "Text Secondary", hex: "#95958F", dark: true },
    ],
  },
  {
    group: "Beige",
    colors: [
      { name: "Light 25",  hex: "#FBFBF7" },
      { name: "Base 50",   hex: "#F5F5EB" },
      { name: "Middle 100",hex: "#DCDCCB" },
      { name: "Dark 200",  hex: "#D0CFB8" },
      { name: "Bold 300",  hex: "#B4B290" },
    ],
  },
  {
    group: "Grey",
    colors: [
      { name: "Soft",        hex: "#EBEBEB" },
      { name: "Soft Middle", hex: "#D8D8D8" },
      { name: "Middle",      hex: "#C3C3C3" },
      { name: "Dark",        hex: "#949494", dark: true },
    ],
  },
  {
    group: "Status",
    colors: [
      { name: "Error 1",   hex: "#DC2625", dark: true },
      { name: "Error 2",   hex: "#FECACA" },
      { name: "Error 3",   hex: "#FFE0E0" },
      { name: "Warning 1", hex: "#E89E1B", dark: true },
      { name: "Warning 2", hex: "#FFEBC6" },
    ],
  },
];

function ColorSwatch({ name, hex }: ColorToken) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="w-full h-16 rounded-lg border border-grey-soft"
        style={{ backgroundColor: hex }}
        aria-label={`${name} — ${hex}`}
      />
      <div>
        <Text variant="body-sm" bold className="leading-tight">{name}</Text>
        <Text variant="caption-lg" className="text-black/40 font-mono tabular-nums">{hex}</Text>
      </div>
    </div>
  );
}

// ─── Foundation data ─────────────────────────────────────────────────────────

const SPACING_SCALE = [
  { token: "--space-1",  tw: "p-1",  px: 4  },
  { token: "--space-2",  tw: "p-2",  px: 8  },
  { token: "--space-3",  tw: "p-3",  px: 12 },
  { token: "--space-4",  tw: "p-4",  px: 16 },
  { token: "--space-5",  tw: "p-5",  px: 20 },
  { token: "--space-6",  tw: "p-6",  px: 24 },
  { token: "--space-8",  tw: "p-8",  px: 32 },
  { token: "--space-10", tw: "p-10", px: 40 },
  { token: "--space-12", tw: "p-12", px: 48 },
  { token: "--space-16", tw: "p-16", px: 64 },
  { token: "--space-20", tw: "p-20", px: 80 },
  { token: "--space-24", tw: "p-24", px: 96 },
];

const RADIUS_SCALE = [
  { name: "None", token: "--radius-none", px: 0    },
  { name: "XS",   token: "--radius-xs",   px: 2    },
  { name: "SM",   token: "--radius-sm",   px: 4    },
  { name: "MD",   token: "--radius-md",   px: 8    },
  { name: "LG",   token: "--radius-lg",   px: 12   },
  { name: "XL",   token: "--radius-xl",   px: 16   },
  { name: "2XL",  token: "--radius-2xl",  px: 24   },
  { name: "Full", token: "--radius-full", px: 9999 },
];

const BORDER_WIDTH_SCALE = [
  { name: "0",  token: "—",                 px: 0 },
  { name: "1",  token: "--border-width-1",  px: 1 },
  { name: "2",  token: "--border-width-2",  px: 2 },
  { name: "4",  token: "--border-width-4",  px: 4 },
];

const SHADOW_SCALE = [
  { name: "None", token: "—",           label: "Sin elevación",  value: "none" },
  { name: "SM",   token: "--shadow-sm", label: "Sutil",          value: "0 1px 2px 0 rgba(0,0,0,0.05)" },
  { name: "MD",   token: "--shadow-md", label: "Card",           value: "0 4px 6px -1px rgba(0,0,0,0.10), 0 2px 4px -2px rgba(0,0,0,0.10)" },
  { name: "LG",   token: "--shadow-lg", label: "Dropdown",       value: "0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.10)" },
  { name: "XL",   token: "--shadow-xl", label: "Modal / Overlay",value: "0 20px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.10)" },
];

const BREAKPOINTS = [
  { name: "Base",  token: "—",                  px: 375,  note: "Mobile default"   },
  { name: "SM",    token: "--breakpoint-sm",     px: 640,  note: "Mobile landscape" },
  { name: "MD",    token: "--breakpoint-md",     px: 768,  note: "Tablet"           },
  { name: "LG",    token: "--breakpoint-lg",     px: 1024, note: "Desktop"          },
  { name: "XL",    token: "--breakpoint-xl",     px: 1280, note: "Large desktop"    },
  { name: "2XL",   token: "--breakpoint-2xl",    px: 1536, note: "Wide"             },
];

const GRID_COLUMNS = [
  { cols: 4,  note: "Mobile" },
  { cols: 8,  note: "Tablet" },
  { cols: 12, note: "Desktop" },
];

// ─── Active section hook ──────────────────────────────────────────────────────

const ALL_IDS = NAV.flatMap(({ items }) => items.map(({ href }) => href.slice(1)));

function useActiveSection() {
  const [active, setActive] = useState<string>(ALL_IDS[0]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    ALL_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}

// ─── Layout primitives ───────────────────────────────────────────────────────

function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const active = useActiveSection();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        id="sidebar-nav"
        aria-label="Design system navigation"
        className={`fixed top-0 left-0 h-screen w-60 flex flex-col bg-primary overflow-y-auto z-30 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <Text variant="h4" as="span" className="text-primary-text">Plinng</Text>
            <Text variant="caption-lg" as="p" className="text-white/40 mt-0.5">Design System v0.1</Text>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="md:hidden flex items-center justify-center w-8 h-8 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close navigation"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav aria-label="Design system sections" className="flex-1 px-3 py-4 flex flex-col gap-5">
          {NAV.map(({ group, items }) => (
            <div key={group}>
              <Text variant="overline" as="p" className="text-white/30 px-3 mb-1 tracking-[2px]">{group}</Text>
              <ul role="list" className="flex flex-col gap-0.5">
                {items.map(({ label, href }) => {
                  const id = href.slice(1);
                  const isActive = active === id;
                  return (
                    <li key={href}>
                      <a
                        href={href}
                        onClick={onClose}
                        aria-current={isActive ? "true" : undefined}
                        className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
                          isActive
                            ? "bg-secondary text-secondary-text"
                            : "text-white/60 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="flex flex-col gap-6 scroll-mt-10"
    >
      <div className="pb-5 border-b border-grey-soft">
        <Text as="h2" variant="h2" id={`${id}-heading`}>{title}</Text>
        {description && (
          <Text variant="body-sm" as="p" className="text-disabled mt-1">{description}</Text>
        )}
      </div>
      {children}
    </section>
  );
}

function SubSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Text variant="overline" as="p" className="text-disabled tracking-[2px]">{label}</Text>
      <div className="rounded-xl bg-white shadow-sm p-4 sm:p-6 flex flex-wrap gap-4 items-start">
        {children}
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

const TYPE_SCALE: { variant: TextVariant; spec: string; sample: string }[] = [
  { variant: "hero-xl",        spec: "80 Desktop / 60 Mobile · ExtraBold 800", sample: "Hero Extralarge"                                  },
  { variant: "hero-lg",        spec: "60 Desktop / 45 Mobile · Bold 700",      sample: "Hero Large"                                       },
  { variant: "hero-md",        spec: "48 Desktop / 36 Mobile · Bold 700",      sample: "Hero Medium"                                      },
  { variant: "hero-sm",        spec: "34 Desktop / 30 Mobile · Bold 700",      sample: "Hero Small"                                       },
  { variant: "h1",             spec: "30 Desktop / 28 Mobile · Bold 700",      sample: "Heading 1"                                        },
  { variant: "h2",             spec: "28 Desktop / 26 Mobile · Bold 700",      sample: "Heading 2"                                        },
  { variant: "h3",             spec: "24 · Bold 700",                          sample: "Heading 3"                                        },
  { variant: "h4",             spec: "22 · Bold 700",                          sample: "Heading 4"                                        },
  { variant: "subhead",        spec: "20 · Regular 400",                       sample: "Subheading"                                       },
  { variant: "body-editorial", spec: "18 · Regular 400",                       sample: "The quick brown fox jumps over the lazy dog"      },
  { variant: "body-lg",        spec: "16 · Regular 400",                       sample: "The quick brown fox jumps over the lazy dog"      },
  { variant: "body-sm",        spec: "14 · Regular 400",                       sample: "The quick brown fox jumps over the lazy dog"      },
  { variant: "caption-lg",     spec: "12 · Regular 400",                       sample: "Caption large"                                    },
  { variant: "caption-sm",     spec: "11 · Regular 400",                       sample: "Caption small"                                    },
  { variant: "overline",       spec: "12 · Bold 700 · Uppercase · ls 2px",     sample: "Overline"                                         },
];

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-text focus:text-sm focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>

      <div className="min-h-screen flex bg-beige-25">
        <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

        <main
          id="main-content"
          tabIndex={-1}
          className="w-full md:ml-60 flex-1 focus-visible:outline-none"
        >
          {/* Mobile header */}
          <div className="md:hidden sticky top-0 z-10 bg-primary flex items-center gap-3 px-4 py-4 border-b border-white/10">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center justify-center w-8 h-8 text-primary-text rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Open navigation"
              aria-expanded={isMobileMenuOpen}
              aria-controls="sidebar-nav"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4.5H16M2 9H16M2 13.5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <Text variant="h4" as="span" className="text-primary-text">Plinng</Text>
            <Text variant="caption-lg" as="span" className="text-white/40">Design System v0.1</Text>
          </div>

          <div className="max-w-3xl px-4 sm:px-8 md:px-12 py-8 md:py-12 flex flex-col gap-12 md:gap-16">

            {/* Hero */}
            <header>
              <Text variant="hero-sm">Plinng Design System</Text>
              <Text variant="body-editorial" as="p" className="text-disabled mt-3">
                Component library built with React, Tailwind CSS, and Inter.
              </Text>
            </header>

            {/* ── Colors ── */}
            <Section
              id="colors"
              title="Colors"
              description="22 tokens across 5 groups: Accent, Basics, Beige, Grey, and Status."
            >
              {COLOR_PALETTE.map(({ group, colors }) => (
                <div key={group} className="flex flex-col gap-3">
                  <Text variant="overline" as="p" className="text-disabled/50">{group}</Text>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {colors.map((color) => (
                      <ColorSwatch key={color.hex} {...color} />
                    ))}
                  </div>
                </div>
              ))}
            </Section>

            {/* ── Typography ── */}
            <Section
              id="typography"
              title="Typography"
              description="Inter across 15 variants (Hero, Header, Body, Caption, Overline). Responsive desktop/mobile. Pass as to override the semantic element."
            >
              <div
                role="table"
                aria-label="Type scale"
                className="rounded-xl overflow-hidden bg-white shadow-sm"
              >
                {TYPE_SCALE.map(({ variant, spec, sample }, i) => (
                  <div
                    key={variant}
                    role="row"
                    className={`flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6 px-4 sm:px-6 py-4 ${i < TYPE_SCALE.length - 1 ? "border-b border-grey-soft" : ""}`}
                  >
                    <Text role="cell" variant={variant}>{sample}</Text>
                    <Text role="cell" variant="caption-lg" as="span" className="text-disabled sm:shrink-0 tabular-nums">
                      {spec}
                    </Text>
                  </div>
                ))}
              </div>
            </Section>

            {/* ── Spacing ── */}
            <Section
              id="spacing"
              title="Spacing"
              description="Escala de 12 pasos sobre una base de 4px. Úsala para margin, padding y gap."
            >
              <div className="rounded-xl overflow-hidden bg-white shadow-sm">
                {SPACING_SCALE.map(({ token, tw, px }, i) => (
                  <div
                    key={token}
                    role="row"
                    className={`flex items-center gap-4 px-4 sm:px-6 py-3 ${i < SPACING_SCALE.length - 1 ? "border-b border-grey-soft" : ""}`}
                  >
                    <div
                      className="shrink-0 bg-secondary rounded-sm"
                      style={{ width: px, height: 16, minWidth: 2 }}
                      aria-hidden="true"
                    />
                    <div className="flex items-baseline gap-3 min-w-0">
                      <Text variant="body-sm" bold className="shrink-0 tabular-nums">{px}px</Text>
                      <Text variant="caption-lg" className="text-disabled/50 font-mono shrink-0">{token}</Text>
                      <Text variant="caption-lg" className="text-disabled/40 font-mono shrink-0">{tw}</Text>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* ── Border ── */}
            <Section
              id="border"
              title="Border"
              description="Radios de esquina y anchos de borde del sistema."
            >
              <SubSection label="Border Radius">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                  {RADIUS_SCALE.map(({ name, token, px }) => (
                    <div key={token} className="flex flex-col items-start gap-2">
                      <div
                        className="w-full h-14 border-2 border-grey-soft bg-white shadow-sm"
                        style={{ borderRadius: px }}
                        aria-label={`${name} — ${px === 9999 ? "full" : px + "px"}`}
                      />
                      <div>
                        <Text variant="body-sm" bold className="leading-tight">{name}</Text>
                        <Text variant="caption-lg" className="text-disabled/50 font-mono">{px === 9999 ? "full" : `${px}px`}</Text>
                        <Text variant="caption-sm" className="text-disabled/40 font-mono block">{token}</Text>
                      </div>
                    </div>
                  ))}
                </div>
              </SubSection>

              <SubSection label="Border Width">
                <div className="flex flex-wrap gap-8 w-full">
                  {BORDER_WIDTH_SCALE.map(({ name, token, px }) => (
                    <div key={name} className="flex flex-col items-start gap-2">
                      <div
                        className="w-20 h-14 border-grey-soft bg-white shadow-sm rounded-md"
                        style={{ borderWidth: px, borderStyle: "solid" }}
                        aria-label={`Border ${name} — ${px}px`}
                      />
                      <div>
                        <Text variant="body-sm" bold className="leading-tight">{px}px</Text>
                        <Text variant="caption-lg" className="text-disabled/50 font-mono">{token}</Text>
                      </div>
                    </div>
                  ))}
                </div>
              </SubSection>
            </Section>

            {/* ── Shadows ── */}
            <Section
              id="shadows"
              title="Shadows"
              description="5 niveles de elevación. Cada nivel comunica jerarquía visual y profundidad."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {SHADOW_SCALE.map(({ name, token, label, value }) => (
                  <div key={name} className="flex flex-col gap-3">
                    <div
                      className="bg-white rounded-xl p-5 h-24 flex items-end shadow-sm"
                      style={{ boxShadow: value === "none" ? undefined : value }}
                      aria-label={`Shadow ${name}`}
                    />
                    <div>
                      <div className="flex items-baseline gap-2">
                        <Text variant="body-sm" bold className="leading-tight">Shadow {name}</Text>
                        <Text variant="caption-lg" className="text-disabled/50">{label}</Text>
                      </div>
                      <Text variant="caption-sm" className="text-disabled/40 font-mono block mt-0.5">{token}</Text>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* ── Sizing & Layout ── */}
            <Section
              id="sizing-layout"
              title="Sizing & Layout"
              description="Breakpoints responsivos y grid de columnas del sistema."
            >
              <SubSection label="Breakpoints">
                <div className="w-full flex flex-col gap-2">
                  {BREAKPOINTS.map(({ name, token, px, note }) => (
                    <div key={name} className="flex items-center gap-3">
                      <Text variant="caption-lg" bold className="w-8 shrink-0">{name}</Text>
                      <div className="flex-1 relative h-6 bg-white rounded overflow-hidden shadow-sm">
                        <div
                          className="h-full bg-secondary/60 rounded"
                          style={{ width: `${Math.min((px / 1536) * 100, 100)}%` }}
                          aria-hidden="true"
                        />
                      </div>
                      <Text variant="caption-lg" bold className="w-12 text-right shrink-0 tabular-nums font-mono">{px}px</Text>
                      <Text variant="caption-lg" className="text-disabled/50 w-28 shrink-0 hidden sm:block">{note}</Text>
                      <Text variant="caption-sm" className="text-disabled/40 font-mono hidden md:block">{token}</Text>
                    </div>
                  ))}
                </div>
              </SubSection>

              <SubSection label="Grid columns">
                <div className="w-full flex flex-col gap-4">
                  {GRID_COLUMNS.map(({ cols, note }) => (
                    <div key={cols} className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <Text variant="caption-lg" bold>{cols} cols</Text>
                        <Text variant="caption-lg" className="text-disabled/50">{note}</Text>
                      </div>
                      <div
                        className="grid gap-1"
                        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
                        aria-hidden="true"
                      >
                        {Array.from({ length: cols }).map((_, i) => (
                          <div key={i} className="h-6 bg-secondary/40 rounded-sm" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </SubSection>
            </Section>

            {/* ── Button ── */}
            <Section
              id="button"
              title="Button"
              description="Trigger actions. Three variants, three sizes, icon support, loading state, and block layout."
            >
              <SubSection label="Variants">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="tertiary">Tertiary</Button>
              </SubSection>

              <SubSection label="Sizes">
                <Button size="lg">Large</Button>
                <Button size="md">Medium</Button>
                <Button size="sm">Small</Button>
              </SubSection>

              <SubSection label="With icon left">
                <Button variant="primary"   iconLeft={<IconSearch />}>Search</Button>
                <Button variant="secondary" iconLeft={<IconSearch />}>Search</Button>
                <Button variant="tertiary"  iconLeft={<IconSearch />}>Search</Button>
              </SubSection>

              <SubSection label="With icon right">
                <Button variant="primary"   iconRight={<IconArrowRight />}>Continue</Button>
                <Button variant="secondary" iconRight={<IconArrowRight />}>Continue</Button>
                <Button variant="tertiary"  iconRight={<IconArrowRight />}>Continue</Button>
              </SubSection>

              <SubSection label="Block">
                <div className="w-full flex flex-col gap-3">
                  <Button variant="primary"   block>Primary block</Button>
                  <Button variant="secondary" block>Secondary block</Button>
                  <Button variant="tertiary"  block>Tertiary block</Button>
                </div>
              </SubSection>

              <SubSection label="States">
                <Button variant="primary"   disabled>Disabled</Button>
                <Button variant="secondary" disabled>Disabled</Button>
                <Button variant="tertiary"  disabled>Disabled</Button>
                <Button variant="primary"   loading>Loading</Button>
                <Button variant="secondary" loading>Loading</Button>
              </SubSection>
            </Section>

            {/* ── Badge ── */}
            <Section
              id="badge"
              title="Badge"
              description="Compact labels for status, categories, or metadata."
            >
              <SubSection label="Variants">
                <Badge variant="default">Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
              </SubSection>

              <SubSection label="With dot">
                <Badge variant="default" dot>Default</Badge>
                <Badge variant="success" dot>Active</Badge>
                <Badge variant="warning" dot>Warning</Badge>
                <Badge variant="error"   dot>Critical</Badge>
                <Badge variant="info"    dot>Info</Badge>
              </SubSection>

              <SubSection label="Sizes">
                <Badge variant="default" size="md">Medium</Badge>
                <Badge variant="success" size="md">Medium</Badge>
                <Badge variant="warning" size="md">Medium</Badge>
                <Badge variant="error"   size="md">Medium</Badge>
                <Badge variant="info"    size="md">Medium</Badge>
              </SubSection>

              <SubSection label="Sizes · Small">
                <Badge variant="default" size="sm">Small</Badge>
                <Badge variant="success" size="sm">Small</Badge>
                <Badge variant="warning" size="sm">Small</Badge>
                <Badge variant="error"   size="sm">Small</Badge>
                <Badge variant="info"    size="sm">Small</Badge>
              </SubSection>
            </Section>

            {/* ── Input ── */}
            <Section
              id="input"
              title="Input"
              description="Text fields for forms. Supports labels, hints, error states, icons, and sizes."
            >
              <SubSection label="States">
                <Input label="Default"   placeholder="Placeholder..." />
                <Input label="With hint" hint="Helper text goes here." placeholder="Placeholder..." />
                <Input label="Error"     error="This field is required." placeholder="Placeholder..." />
                <Input label="Disabled"  disabled placeholder="Placeholder..." />
              </SubSection>

              <SubSection label="Sizes">
                <Input size="lg" label="Large"  placeholder="Large..."  />
                <Input size="md" label="Medium" placeholder="Medium..." />
                <Input size="sm" label="Small"  placeholder="Small..."  />
              </SubSection>

              <SubSection label="With icon left">
                <Input size="lg" label="Large"  iconLeft={<IconSearch />} placeholder="Search..." />
                <Input size="md" label="Medium" iconLeft={<IconSearch />} placeholder="Search..." />
                <Input size="sm" label="Small"  iconLeft={<IconSearch />} placeholder="Search..." />
              </SubSection>

              <SubSection label="With icon right">
                <Input size="lg" label="Large"  iconRight={<IconArrowRight />} placeholder="Placeholder..." />
                <Input size="md" label="Medium" iconRight={<IconArrowRight />} placeholder="Placeholder..." />
                <Input size="sm" label="Small"  iconRight={<IconArrowRight />} placeholder="Placeholder..." />
              </SubSection>
            </Section>

            {/* ── LinkWeb ── */}
            <Section
              id="linkweb"
              title="LinkWeb"
              description="Anchor links with semantic variants, sizes, alternative option, disabled state, and icon support."
            >
              <SubSection label="Variants">
                <LinkWeb href="#">Primary</LinkWeb>
                <LinkWeb href="#" variant="secondary">Secondary</LinkWeb>
                <LinkWeb href="#" variant="tertiary">Tertiary</LinkWeb>
              </SubSection>

              <SubSection label="Alternative">
                <div className="flex flex-wrap gap-4 bg-primary rounded-xl p-4">
                  <LinkWeb href="#" option="alternative">Primary alt</LinkWeb>
                </div>
              </SubSection>

              <SubSection label="Sizes">
                <LinkWeb href="#" size="lg">Large</LinkWeb>
                <LinkWeb href="#" size="md">Medium</LinkWeb>
              </SubSection>

              <SubSection label="With icon left">
                <LinkWeb href="#"                    iconLeft={<IconSearch />}>Primary</LinkWeb>
                <LinkWeb href="#" variant="secondary" iconLeft={<IconSearch />}>Secondary</LinkWeb>
                <LinkWeb href="#" variant="tertiary"  iconLeft={<IconSearch />}>Tertiary</LinkWeb>
              </SubSection>

              <SubSection label="With icon right">
                <LinkWeb href="#"                    iconRight={<IconArrowRight />}>Primary</LinkWeb>
                <LinkWeb href="#" variant="secondary" iconRight={<IconArrowRight />}>Secondary</LinkWeb>
                <LinkWeb href="#" variant="tertiary"  iconRight={<IconArrowRight />}>Tertiary</LinkWeb>
              </SubSection>

              <SubSection label="States">
                <LinkWeb href="#" aria-disabled="true" tabIndex={-1}>Disabled primary</LinkWeb>
                <LinkWeb href="#" variant="secondary" aria-disabled="true" tabIndex={-1}>Disabled secondary</LinkWeb>
                <LinkWeb href="#" variant="tertiary"  aria-disabled="true" tabIndex={-1}>Disabled tertiary</LinkWeb>
              </SubSection>
            </Section>

          </div>
        </main>
      </div>
    </>
  );
}

export default App;
