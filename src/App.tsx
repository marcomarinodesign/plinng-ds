import { useState, useEffect } from "react";
import { Button } from "./components/Button";
import { LinkWeb } from "./components/LinkWeb";
import { Input } from "./components/Input";
import { Badge } from "./components/Badge";
import { Text, type TextVariant } from "./components/Text";

// ─── Nav config ──────────────────────────────────────────────────────────────

const NAV = [
  {
    group: "Foundation",
    items: [{ label: "Typography", href: "#typography" }],
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

function Sidebar() {
  const active = useActiveSection();

  return (
    <aside
      aria-label="Design system navigation"
      className="fixed top-0 left-0 h-screen w-60 flex flex-col bg-primary overflow-y-auto z-10"
    >
      {/* Brand */}
      <div className="px-6 py-5 border-b border-white/10">
        <Text variant="heading-4" as="span" className="text-primary-text">Plinng</Text>
        <Text variant="caption" as="p" className="text-white/40 mt-0.5">Design System v0.1</Text>
      </div>

      {/* Navigation */}
      <nav aria-label="Design system sections" className="flex-1 px-3 py-4 flex flex-col gap-5">
        {NAV.map(({ group, items }) => (
          <div key={group}>
            <Text variant="overline" as="p" className="text-white/30 px-3 mb-1">{group}</Text>
            <ul role="list" className="flex flex-col gap-0.5">
              {items.map(({ label, href }) => {
                const id = href.slice(1);
                const isActive = active === id;
                return (
                  <li key={href}>
                    <a
                      href={href}
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
      <div className="pb-5 border-b border-tertiary-border">
        <Text as="h2" variant="heading-2" id={`${id}-heading`}>{title}</Text>
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
      <Text variant="overline" as="p" className="text-disabled">{label}</Text>
      <div className="rounded-xl border border-tertiary-border bg-white p-6 flex flex-wrap gap-4 items-start">
        {children}
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

const TYPE_SCALE: { variant: TextVariant; spec: string; sample: string }[] = [
  { variant: "display",   spec: "48 · Bold 700",     sample: "Display"                                    },
  { variant: "heading-1", spec: "36 · Bold 700",     sample: "Heading 1"                                  },
  { variant: "heading-2", spec: "30 · Bold 700",     sample: "Heading 2"                                  },
  { variant: "heading-3", spec: "24 · Semibold 600", sample: "Heading 3"                                  },
  { variant: "heading-4", spec: "20 · Semibold 600", sample: "Heading 4"                                  },
  { variant: "body-lg",   spec: "18 · Regular 400",  sample: "The quick brown fox jumps over the lazy dog" },
  { variant: "body-md",   spec: "16 · Regular 400",  sample: "The quick brown fox jumps over the lazy dog" },
  { variant: "body-sm",   spec: "14 · Regular 400",  sample: "The quick brown fox jumps over the lazy dog" },
  { variant: "label",     spec: "14 · Semibold 600", sample: "Label"                                      },
  { variant: "caption",   spec: "12 · Regular 400",  sample: "Caption text"                               },
  { variant: "overline",  spec: "11 · Semibold 600", sample: "Overline"                                   },
];

function App() {
  return (
    <>
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-text focus:text-sm focus:font-semibold focus:shadow-lg"
      >
        Skip to main content
      </a>

      <div className="min-h-screen flex bg-gray-50">
        <Sidebar />

        <main
          id="main-content"
          tabIndex={-1}
          className="ml-60 flex-1 focus-visible:outline-none"
        >
          <div className="max-w-3xl px-12 py-12 flex flex-col gap-16">

            {/* Hero */}
            <header>
              <Text variant="display">Plinng Design System</Text>
              <Text variant="body-lg" as="p" className="text-disabled mt-3">
                Component library built with React, Tailwind CSS, and Inter.
              </Text>
            </header>

            {/* ── Typography ── */}
            <Section
              id="typography"
              title="Typography"
              description="Inter across 11 variants. Pass the as prop to override the semantic element."
            >
              <div
                role="table"
                aria-label="Type scale"
                className="rounded-xl border border-tertiary-border overflow-hidden bg-white"
              >
                {TYPE_SCALE.map(({ variant, spec, sample }, i) => (
                  <div
                    key={variant}
                    role="row"
                    className={`flex items-baseline justify-between gap-6 px-6 py-4 ${i < TYPE_SCALE.length - 1 ? "border-b border-tertiary-border" : ""}`}
                  >
                    <Text role="cell" variant={variant}>{sample}</Text>
                    <Text role="cell" variant="caption" as="span" className="text-disabled shrink-0 tabular-nums">
                      {spec}
                    </Text>
                  </div>
                ))}
              </div>
            </Section>

            {/* ── Button ── */}
            <Section
              id="button"
              title="Button"
              description="Trigger actions. Three variants, three sizes, icon support, and loading state."
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

              <SubSection label="States">
                <Button variant="primary" disabled>Disabled</Button>
                <Button variant="secondary" disabled>Disabled</Button>
                <Button variant="tertiary" disabled>Disabled</Button>
                <Button variant="primary" loading>Loading</Button>
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
                <Badge variant="error" dot>Critical</Badge>
                <Badge variant="info" dot>Info</Badge>
              </SubSection>

              <SubSection label="Sizes">
                <Badge variant="success" size="md">Medium</Badge>
                <Badge variant="success" size="sm">Small</Badge>
              </SubSection>
            </Section>

            {/* ── Input ── */}
            <Section
              id="input"
              title="Input"
              description="Text fields for forms. Supports labels, hints, error states, and icons."
            >
              <SubSection label="States">
                <Input label="Default" placeholder="Placeholder..." />
                <Input label="With hint" hint="Helper text goes here." placeholder="Placeholder..." />
                <Input label="Error" error="This field is required." placeholder="Placeholder..." />
                <Input label="Disabled" disabled placeholder="Placeholder..." />
              </SubSection>

              <SubSection label="Sizes">
                <Input size="lg" label="Large" placeholder="Large..." />
                <Input size="md" label="Medium" placeholder="Medium..." />
                <Input size="sm" label="Small" placeholder="Small..." />
              </SubSection>
            </Section>

            {/* ── LinkWeb ── */}
            <Section
              id="linkweb"
              title="LinkWeb"
              description="Anchor links with semantic variants, disabled state, and icon support."
            >
              <SubSection label="Variants">
                <LinkWeb href="#">Primary</LinkWeb>
                <LinkWeb href="#" variant="secondary">Secondary</LinkWeb>
                <LinkWeb href="#" variant="tertiary">Tertiary</LinkWeb>
              </SubSection>

              <SubSection label="States">
                <LinkWeb href="#" aria-disabled="true" tabIndex={-1}>Disabled</LinkWeb>
              </SubSection>
            </Section>

          </div>
        </main>
      </div>
    </>
  );
}

export default App;
