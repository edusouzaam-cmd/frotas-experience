export const event = {
  date: "22, 23 e 24 de janeiro de 2027",
  location: "Brasília · DF",
  venue: "Ed. E-Business · Águas Claras",
  address: "Av. Pau Brasil, nº 6, 1º andar (auditório), Águas Claras, Brasília–DF. CEP 71916-500.",
  whatsapp:
    "https://wa.me/5561996502757?text=" +
    encodeURIComponent(
      "Olá! Quero saber mais sobre o Frotas Experience de 22 a 24 de janeiro de 2027, em Brasília.",
    ),
} as const;

// End dates are exclusive: each offer includes its final calendar day in Brasília.
// Prices checked against the three Hotmart offers supplied by the organizer.
export const lots = [
  {
    id: 1,
    name: "Primeiro lote",
    period: "26 out — 22 nov 2026",
    openLabel: "26/10",
    opensAt: "2026-10-26T00:00:00-03:00",
    closesAt: "2026-11-23T00:00:00-03:00",
    price: 1297,
    installment: 134.14,
    checkout: "https://pay.hotmart.com/N106256879J?off=hf3x1a7n",
  },
  {
    id: 2,
    name: "Segundo lote",
    period: "23 nov 2026 — 03 jan 2027",
    openLabel: "23/11",
    opensAt: "2026-11-23T00:00:00-03:00",
    closesAt: "2027-01-04T00:00:00-03:00",
    price: 1597,
    installment: 165.17,
    checkout: "https://pay.hotmart.com/N106256879J?off=81jay5yd",
  },
  {
    id: 3,
    name: "Terceiro lote",
    period: "04 jan — 20 jan 2027",
    openLabel: "04/01",
    opensAt: "2027-01-04T00:00:00-03:00",
    closesAt: "2027-01-21T00:00:00-03:00",
    price: 1997,
    installment: 206.54,
    checkout: "https://pay.hotmart.com/N106256879J?off=lyc3plsd",
  },
] as const;
export type Lot = (typeof lots)[number];
export function getLotStatus(lot: Lot, now: number): "upcoming" | "open" | "closed" {
  if (now < Date.parse(lot.opensAt)) return "upcoming";
  return now < Date.parse(lot.closesAt) ? "open" : "closed";
}
export function getSaleState(now: number) {
  const active = lots.find((lot) => getLotStatus(lot, now) === "open");
  if (active)
    return {
      phase: "open" as const,
      active,
      target: Date.parse(active.closesAt),
      label: active.id === 3 ? "As inscrições encerram em" : "O próximo lote começa em",
    };
  const next = lots.find((lot) => getLotStatus(lot, now) === "upcoming");
  if (next)
    return {
      phase: "upcoming" as const,
      active: null,
      target: Date.parse(next.opensAt),
      label: "A abertura do primeiro lote acontece em",
    };
  return {
    phase: "closed" as const,
    active: null,
    target: null,
    label: "Inscrições encerradas para esta turma",
  };
}
export function countdown(target: number, now: number) {
  const seconds = Math.max(0, Math.ceil((target - now) / 1000));
  return [
    Math.floor(seconds / 86400),
    Math.floor(seconds / 3600) % 24,
    Math.floor(seconds / 60) % 60,
    seconds % 60,
  ];
}
export const brl = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
