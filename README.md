# Frotas Experience

Página do curso presencial de Gestão da Manutenção de Frotas e Máquinas Pesadas, importada do ZIP fornecido.

A página completa está em `src/content/frotas.html`. O servidor a entrega em `/` e `/frotas-experience/`, preservando o documento original e os scripts do Elementor. Imagens, estilos, fontes e scripts locais ficam em `public/mirror/`.

As fontes corrompidas na exportação foram recuperadas das suas origens. Recursos ausentes no ZIP mantêm os endereços externos originais. Formulários, vídeos, checkout e WhatsApp continuam dependendo dos serviços da página de origem.

Para conferir os recursos locais, execute `node scripts/check-page-assets.mjs`. Para validar o projeto, execute `npm run build` e `npm test`.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/baa59a6f-db41-4abb-9f1a-3375e1110532).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
