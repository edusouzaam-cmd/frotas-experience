import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Curso de Gestão da Manutenção de Frotas e Máquinas Pesadas | Brasília-DF" },
      { name: "description", content: "Certificação presencial em Gestão da Manutenção de Frotas e Máquinas Pesadas em Brasília-DF." },
      { property: "og:title", content: "Frotas Experience | Gestão da Manutenção de Frotas" },
      { property: "og:description", content: "Imersão presencial em Gestão da Manutenção de Frotas e Máquinas Pesadas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main style={{ height: "100dvh", width: "100%", background: "#060606" }}>
      <iframe
        title="Frotas Experience — Gestão da Manutenção de Frotas e Máquinas Pesadas"
        src="/frotas-experience/index.html"
        style={{ display: "block", border: 0, width: "100%", height: "100%" }}
        allow="autoplay; fullscreen; picture-in-picture"
      />
    </main>
  );
}
