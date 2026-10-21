import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Clock3, LockKeyhole, MessageCircle, ShieldCheck } from "lucide-react";
import { brl, countdown, event, getLotStatus, getSaleState, lots } from "@/data/event";
const included = [
  "3 dias de imersão presencial",
  "60h de formação online",
  "2 certificados · 80h de formação",
  "Curso de liderança Líder 360",
  "Livro físico PCM Descomplicado",
  "Ferramentas e grupo de alunos",
];
export function Pricing() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const timer = window.setInterval(tick, 1000);
    window.addEventListener("focus", tick);
    document.addEventListener("visibilitychange", tick);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", tick);
      document.removeEventListener("visibilitychange", tick);
    };
  }, []);
  const sale = now === null ? null : getSaleState(now);
  const remaining = sale?.target && now !== null ? countdown(sale.target, now) : null;
  const featured = sale?.active?.id ?? (sale?.phase === "closed" ? null : 1);
  return (
    <section
      className="pricing-section section"
      id="investimento"
      aria-labelledby="pricing-heading"
    >
      <div className="wrap">
        <div className="section-heading centered">
          <span className="eyebrow">SEU PRÓXIMO PASSO</span>
          <h2 id="pricing-heading">
            Invista na sua próxima
            <br />
            <em>evolução profissional.</em>
          </h2>
          <p>
            Uma formação completa. Três lotes. Planeje sua inscrição e aproveite a melhor condição
            disponível.
          </p>
        </div>
        <div className="countdown-panel">
          <div>
            <span className="small-label">
              <Clock3 size={16} /> CALENDÁRIO DE INSCRIÇÕES
            </span>
            <h3 aria-live="polite">
              {sale?.label ?? "Prepare-se para a abertura em 26 de outubro"}
            </h3>
            <p>
              {sale?.phase === "closed"
                ? "Fale com nossa equipe para conhecer as próximas turmas."
                : "Viradas automáticas à meia-noite · horário de Brasília"}
            </p>
          </div>
          {sale?.phase !== "closed" && (
            <div
              className="countdown"
              role="timer"
              aria-live="off"
              aria-label="Tempo restante até a próxima etapa de inscrições"
            >
              {["Dias", "Horas", "Min", "Seg"].map((label, i) => (
                <div key={label}>
                  <strong>{remaining ? String(remaining[i]).padStart(2, "0") : "—"}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="lot-grid">
          {lots.map((lot) => {
            const status = now === null ? null : getLotStatus(lot, now);
            const isFeatured = featured === lot.id;
            return (
              <article
                className={`lot-card ${isFeatured ? "featured" : ""} ${status === "closed" ? "closed" : ""}`}
                key={lot.id}
                aria-label={lot.name}
              >
                <div className="lot-card-top">
                  <span className="lot-number">0{lot.id}</span>
                  <span className={`lot-status ${status === "open" ? "available" : ""}`}>
                    {status === "open"
                      ? "Inscrições abertas"
                      : status === "closed"
                        ? "Encerrado"
                        : `A partir de ${lot.openLabel}`}
                  </span>
                </div>
                <h3>{lot.name}</h3>
                <p className="lot-period">{lot.period}</p>
                <div className="lot-price">
                  <span>12x de</span>
                  <strong>{brl(lot.installment)}</strong>
                  <span>ou {brl(lot.price)} à vista</span>
                </div>
                <p className="installment-note">
                  Parcelamento com acréscimo.
                  <br />
                  Total em 12x: {brl(Math.round(lot.installment * 12 * 100) / 100)}.
                </p>
                <ul className="included-list">
                  {included.map((item) => (
                    <li key={item}>
                      <Check size={16} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                {status === "open" ? (
                  <a
                    className="button button-gold lot-cta"
                    href={lot.checkout}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Inscrever-se no ${lot.name.toLowerCase()} por ${brl(lot.price)} à vista. Abre o checkout Hotmart em nova aba.`}
                  >
                    Garantir minha inscrição <ArrowUpRight size={18} />
                  </a>
                ) : (
                  <button className="button lot-cta inactive" disabled>
                    <LockKeyhole size={15} />
                    {status === "closed"
                      ? "Lote encerrado"
                      : status === null
                        ? "Consultando calendário…"
                        : `Disponível em ${lot.openLabel}`}
                  </button>
                )}
                <span className="lot-footnote">
                  {isFeatured && status !== "closed"
                    ? "A melhor condição desta etapa"
                    : "A mesma experiência completa"}
                </span>
              </article>
            );
          })}
        </div>
        <div className="pricing-trust">
          <span>
            <ShieldCheck size={17} /> Compra processada pela Hotmart
          </span>
          <span>Parcelamento sujeito às condições do checkout</span>
          <a href={event.whatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={17} /> Precisa de ajuda para se inscrever?
          </a>
        </div>
      </div>
    </section>
  );
}
