# Frotas Experience

Página da formação presencial em Gestão da Manutenção de Frotas e Máquinas Pesadas da ENGETELES. **27, 28 e 29 de janeiro de 2027, em Brasília.**

Implementação nativa em React, TypeScript e TanStack Start, conectada ao [projeto Lovable](https://lovable.dev/projects/baa59a6f-db41-4abb-9f1a-3375e1110532). Os envios à branch `main` sincronizam com o editor. Preserve o histórico publicado.

## Conteúdo e inscrições

- `src/routes/index.tsx`: página, navegação, módulos, perguntas frequentes e link para vídeo.
- `src/components/frotas/Pricing.tsx`: três cartões de preço, cronômetro e ativação automática dos checkouts.
- `src/data/event.ts`: datas, local, contato e calendário comercial.
- `src/data/course-modules.json`: os sete módulos e 40 tópicos do material original.
- `src/frotas.css`: identidade visual, responsividade e fontes locais.
- `public/images` e `public/fonts`: recursos otimizados. As dez imagens somam aproximadamente 609 KiB.

| Lote | Período (Brasília)      | À vista     | 12 parcelas com acréscimo | Total parcelado | Oferta Hotmart |
| ---- | ----------------------- | ----------- | ------------------------- | --------------- | -------------- |
| 1    | 26/10 a 22/11/2026      | R$ 1.297,00 | R$ 134,14                 | R$ 1.609,68     | `hf3x1a7n`     |
| 2    | 23/11/2026 a 03/01/2027 | R$ 1.597,00 | R$ 165,17                 | R$ 1.982,04     | `81jay5yd`     |
| 3    | 04/01 a 20/01/2027      | R$ 1.997,00 | R$ 206,54                 | R$ 2.478,48     | `lyc3plsd`     |

Datas e ofertas fornecidas pelo organizador; preços conferidos nos checkouts em 21/10/2026. As viradas usam `-03:00`, independentemente do fuso do visitante. Cada lote inclui seu último dia inteiro. Antes da abertura, os botões de compra ficam indisponíveis; depois do encerramento final, o contador não reinicia. As restrições da página não alteram a disponibilidade das ofertas dentro da Hotmart, que deve ser gerida pelo organizador.

O vídeo abre no YouTube e é identificado como relato de participantes da PCM Summit, outra experiência ENGETELES. A página não carrega players nem rastreadores de terceiros. WhatsApp, mapa e Hotmart abrem nos respectivos serviços. O antigo caminho `/frotas-experience/index.html` redireciona para a página atual, preservando parâmetros e âncora quando há JavaScript.

## Desenvolvimento e verificação

```sh
npm install
npm run dev
npm test
npm run lint
npx tsc --noEmit
node scripts/check-page-assets.mjs
npm run build
```

Os testes verificam as fronteiras de cada lote, a conversão de fuso, o cronômetro, o bloqueio antecipado e a troca automática de checkout durante uma visita. O verificador de recursos confere a existência e as assinaturas dos arquivos locais.

O projeto preserva a biblioteca de componentes de interface do template. Os avisos de Fast Refresh em alguns desses componentes são preexistentes e não impedem o build.
