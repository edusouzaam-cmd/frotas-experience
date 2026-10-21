import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { countdown, getLotStatus, getSaleState, lots } from "@/data/event";
import { Pricing } from "@/components/frotas/Pricing";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});
describe("Calendário dos lotes no horário de Brasília", () => {
  it("aguarda 26/10, sem abrir três horas antes por causa do UTC", () => {
    expect(getSaleState(Date.parse("2026-10-26T02:59:59Z")).phase).toBe("upcoming");
    expect(getSaleState(Date.parse("2026-10-26T03:00:00Z")).active?.id).toBe(1);
  });
  it.each([
    ["2026-11-22T23:59:59-03:00", 1],
    ["2026-11-23T00:00:00-03:00", 2],
    ["2027-01-03T23:59:59-03:00", 2],
    ["2027-01-04T00:00:00-03:00", 3],
    ["2027-01-20T23:59:59-03:00", 3],
  ])("ativa somente o lote correto em %s", (date, expected) => {
    const now = Date.parse(date);
    expect(getSaleState(now).active?.id).toBe(expected);
    expect(lots.filter((lot) => getLotStatus(lot, now) === "open")).toHaveLength(1);
  });
  it("encerra definitivamente após 20/01, sem reiniciar o cronômetro", () => {
    const result = getSaleState(Date.parse("2027-01-21T00:00:00-03:00"));
    expect(result.phase).toBe("closed");
    expect(result.target).toBeNull();
    expect(countdown(0, 1000)).toEqual([0, 0, 0, 0]);
  });
  it("decompõe os dias, horas, minutos e segundos sem valores negativos", () => {
    expect(countdown(90061000, 0)).toEqual([1, 1, 1, 1]);
    expect(countdown(1, 0)).toEqual([0, 0, 0, 1]);
  });
  it("bloqueia a compra antes da abertura", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-21T12:00:00-03:00"));
    render(<Pricing />);
    expect(screen.queryByRole("link", { name: /Inscrever-se no/ })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Disponível em 26/10" })).toBeDisabled();
  });
  it("troca o checkout automaticamente quando a página permanece aberta na virada", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-22T23:59:59-03:00"));
    render(<Pricing />);
    expect(screen.getByRole("link", { name: /Inscrever-se no primeiro lote/ })).toHaveAttribute(
      "href",
      lots[0].checkout,
    );
    act(() => vi.advanceTimersByTime(1000));
    expect(
      screen.queryByRole("link", { name: /Inscrever-se no primeiro lote/ }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Inscrever-se no segundo lote/ })).toHaveAttribute(
      "href",
      lots[1].checkout,
    );
  });
  it("mostra o terceiro checkout e o total parcelado correto", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2027-01-10T12:00:00-03:00"));
    render(<Pricing />);
    expect(screen.getByRole("link", { name: /Inscrever-se no terceiro lote/ })).toHaveAttribute(
      "href",
      lots[2].checkout,
    );
    expect(screen.getByText(/Total em 12x: R\$\s2.478,48/)).toBeInTheDocument();
  });
});
