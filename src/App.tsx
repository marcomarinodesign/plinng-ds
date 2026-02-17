import { Button } from "./components/Button";

function App() {
  return (
    <div className="p-8 flex flex-col gap-4 items-start">
      <h1 className="text-2xl font-bold">Plinng Design System</h1>
      <div className="flex gap-3 items-center">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
      </div>
    </div>
  );
}

export default App;
