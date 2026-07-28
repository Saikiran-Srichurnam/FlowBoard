import Button, { buttonVarients } from "../components/ui/Button";

const ComponentLibrary = () => {
  return (
    <main className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-7xl space-y-12">

        {/* Page Header */}
        <section>
          <h1 className="text-4xl font-bold text-heading">
            FlowBoard UI Library
          </h1>
          <p className="mt-2 text-body">
            Showcase of reusable UI components used across the application.
          </p>
        </section>

        {/* Variants */}
        <section className="space-y-5">
          <h2 className="text-2xl font-semibold text-heading">
            Button Variants
          </h2>

          <div className="flex flex-wrap gap-4">
            <Button>Primary</Button>

            <Button variant="secondary">
              Secondary
            </Button>

            <Button variant="outline">
              Outline
            </Button>

            <Button variant="ghost">
              Ghost
            </Button>

            <Button variant="danger">
              Danger
            </Button>
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-5">
          <h2 className="text-2xl font-semibold text-heading">
            Button Sizes
          </h2>

          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">
              Small
            </Button>

            <Button>
              Medium
            </Button>

            <Button size="lg">
              Large
            </Button>

            <Button size="icon">
              ⚙
            </Button>
          </div>
        </section>

        {/* States */}
        <section className="space-y-5">
          <h2 className="text-2xl font-semibold text-heading">
            Button States
          </h2>

          <div className="flex flex-wrap gap-4">

            <Button loading>
              Save Changes
            </Button>

            <Button disabled>
              Disabled
            </Button>

            <Button leftIcon="➕">
              New Project
            </Button>

            <Button rightIcon="→">
              Continue
            </Button>
          </div>
        </section>

      </div>
    </main>
  );
};

export default ComponentLibrary;