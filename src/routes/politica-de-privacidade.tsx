import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({ meta: [{ title: "Política de Privacidade | Frotas Experience" }, { name: "description", content: "Política de Privacidade do site Frotas Experience, da ENGETELES." }] }),
  component: () => (
    <main style={{ height: "100dvh", width: "100%", background: "#060606" }}>
      <iframe title="Política de Privacidade" src="/frotas-experience/politica-de-privacidade.html" style={{ display: "block", border: 0, width: "100%", height: "100%" }} />
    </main>
  ),
});
