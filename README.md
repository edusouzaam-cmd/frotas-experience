# Frotas Experience

Página original da ENGETELES recuperada da versão `84ab47b`, anterior à reconstrução, mantendo conteúdo, ordem das seções e disposição original.

- `src/routes/index.tsx`: integra a página original ao aplicativo React/TanStack.
- `public/frotas-experience/index.html`: conteúdo original e player incorporado do YouTube com prévia e reprodução na página.
- `public/frotas-experience/refinements.css`: fundo preto, contraste, acabamentos dos módulos, foco acessível e iluminação dourada discreta.
- `public/mirror`: imagens, fontes e recursos da página original.

Os arquivos da reconstrução, incluindo o calendário de lotes, permanecem no histórico e alguns módulos no código, mas não fazem parte da página restaurada. Os links e informações comerciais voltaram aos valores da página original.

## Verificação

```sh
npm install
node scripts/check-page-assets.mjs
npm test
npm run build
```

O projeto é conectado ao Lovable. Preserve o histórico publicado; envie novos commits sem force push.
