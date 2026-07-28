import ComponentLibrary from "./pages";

export default function App() {
  return (
    <main className="min-h-screen bg-background p-10">
      <div className="bg-surface border border-border rounded-xl p-8">
        <h1 className="text-heading text-3xl font-bold">
          FlowBoard
        </h1>

        <p className="text-body mt-3">
          Modern project management platform.
        </p>

        <button className="mt-6 rounded-lg bg-primary px-5 py-2 text-white">
          Create Project
        </button>
        <ComponentLibrary />
      </div>
    </main>
  );
}