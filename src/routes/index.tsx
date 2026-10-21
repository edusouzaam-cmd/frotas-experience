import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Frotas Experience" },
      { name: "description", content: "Frotas Experience" },
      { property: "og:title", content: "Frotas Experience" },
      { property: "og:description", content: "Frotas Experience" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground">Frotas Experience</h1>
    </main>
  );
}
