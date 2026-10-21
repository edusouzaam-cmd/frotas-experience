import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/termos-de-uso")({
  head: () => ({ meta: [{ title: "Termos de Uso | Frotas Experience" }, { name: "description", content: "Termos de Uso do site Frotas Experience, da ENGETELES." }] }),
  component: () => (
    <main style={{ height: "100dvh", width: "100%", background: "#060606" }}>
      <iframe title="Termos de Uso" src="/frotas-experience/termos-de-uso.html" style={{ display: "block", border: 0, width: "100%", height: "100%" }} />
    </main>
  ),
});
