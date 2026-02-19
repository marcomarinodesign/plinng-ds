import { Button } from "./components/Button";
import { LinkWeb } from "./components/LinkWeb";
import { Input } from "./components/Input";
import { Badge } from "./components/Badge";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-disabled">{title}</h2>
      {children}
    </section>
  );
}

function App() {
  return (
    <div className="p-8 flex flex-col gap-8 items-start">
      <h1 className="text-2xl font-bold">Plinng Design System</h1>

      <Section title="Button">
        <div className="flex gap-3 items-center flex-wrap">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" loading>Loading</Button>
        </div>
      </Section>

      <Section title="LinkWeb">
        <div className="flex gap-6 items-center flex-wrap">
          <LinkWeb href="#">Primary</LinkWeb>
          <LinkWeb href="#" variant="secondary">Secondary</LinkWeb>
          <LinkWeb href="#" variant="tertiary">Tertiary</LinkWeb>
          <LinkWeb href="#" aria-disabled="true">Disabled</LinkWeb>
        </div>
      </Section>

      <Section title="Badge">
        <div className="flex gap-2 items-center flex-wrap">
          <Badge variant="default">Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <Badge variant="default" dot>Default</Badge>
          <Badge variant="success" dot>Active</Badge>
          <Badge variant="error" dot>Critical</Badge>
          <Badge variant="warning" size="sm">Small</Badge>
        </div>
      </Section>

      <Section title="Input">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-start flex-wrap">
            <Input label="Default" placeholder="Placeholder..." />
            <Input label="With hint" hint="Helper text goes here." placeholder="Placeholder..." />
            <Input label="Error" error="This field is required." placeholder="Placeholder..." />
            <Input label="Disabled" disabled placeholder="Placeholder..." />
          </div>
          <div className="flex gap-4 items-start flex-wrap">
            <Input size="lg" label="Large" placeholder="Large..." />
            <Input size="md" label="Medium" placeholder="Medium..." />
            <Input size="sm" label="Small" placeholder="Small..." />
          </div>
        </div>
      </Section>
    </div>
  );
}

export default App;
