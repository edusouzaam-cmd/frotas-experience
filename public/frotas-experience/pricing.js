(() => {
  const data = document.getElementById('fx-lots-data');
  if (!data) return;
  const lots = JSON.parse(data.textContent);
  const title = document.getElementById('fx-calendar-title');
  const timer = document.querySelector('.fx-timer');
  function update() {
    const now = Date.now();
    const active = lots.find(lot => now >= Date.parse(lot.opensAt) && now < Date.parse(lot.closesAt));
    const next = lots.find(lot => now < Date.parse(lot.opensAt));
    const target = active ? Date.parse(active.closesAt) : next ? Date.parse(next.opensAt) : null;
    const label = active ? (active.id === 3 ? 'As inscrições encerram em' : 'O próximo lote começa em') : next ? 'As inscrições abrem em 26 de outubro' : 'Inscrições encerradas para esta turma';
    if (title.textContent !== label) title.textContent = label;
    timer.hidden = target === null;
    if (target !== null) {
      const seconds = Math.max(0, Math.ceil((target - now) / 1000));
      const remaining = [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
      timer.querySelectorAll('[data-time]').forEach((el, i) => { el.textContent = String(remaining[i]).padStart(2, '0'); });
    }
    lots.forEach(lot => {
      const card = document.querySelector(`.fx-lot[data-lot="${lot.id}"]`);
      const status = now < Date.parse(lot.opensAt) ? 'upcoming' : now < Date.parse(lot.closesAt) ? 'open' : 'closed';
      if (card.dataset.status === status) return;
      card.dataset.status = status;
      card.querySelector('.fx-status').textContent = status === 'open' ? 'Inscrições abertas' : status === 'closed' ? 'Encerrado' : `A partir de ${lot.openLabel}`;
      const action = card.querySelector('.fx-action');
      action.replaceChildren();
      const control = document.createElement(status === 'open' ? 'a' : 'span');
      if (status === 'open') {
        control.href = lot.checkout;
        control.target = '_blank';
        control.rel = 'noopener noreferrer';
        control.setAttribute('aria-label', `Garantir minha vaga no ${lot.name.toLowerCase()} — abre o checkout Hotmart em nova aba`);
        control.textContent = 'Garantir minha vaga ↗';
      } else {
        control.className = 'fx-unavailable';
        control.textContent = status === 'closed' ? 'Lote encerrado' : `Disponível em ${lot.openLabel}`;
      }
      action.append(control);
    });
  }
  update();
  window.setInterval(update, 1000);
  window.addEventListener('focus', update);
  document.addEventListener('visibilitychange', update);
})();
