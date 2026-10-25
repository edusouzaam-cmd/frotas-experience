# Publicação manual na KingHost

O projeto do Lovable usa TanStack Start, Vite, React e Bun (`bun.lock`). O build original é `bun run build`, com saída de cliente/servidor gerenciada pelo adaptador Lovable/Nitro. Ele exige um ambiente de servidor e não é o pacote para Apache.

A rota principal exibe o HTML de `public/frotas-experience/index.html`. O comando de produção `bun run build:kinghost` exporta diretamente esse site estático, sem iframe ou servidor Node, para `dist/kinghost/`. Usa apenas APIs nativas do Node 24 e não precisa compilar o aplicativo React que envolve a prévia. A instalação reprodutível do projeto continua usando `bun install --frozen-lockfile`, com Bun 1.4.4. Nenhuma configuração da prévia é modificada.

O exportador preserva os recursos públicos, coloca imagens, fontes e recursos espelhados em `assets/`, adapta os caminhos para `/frotas-experience/`, preserva o favicon existente e gera SEO, sitemap e robots. As páginas legais são HTML reais. Os links com extensão funcionam diretamente; o htaccess também aceita as duas URLs legais sem extensão. O validador verifica os arquivos, referências locais, metadados e estrutura antes do upload.

## Download e publicação

1. GitHub → Actions → **Gerar pacote KingHost** → execução concluída com sucesso → Artifacts → **frotas-experience-kinghost**. Também é possível executar com **Run workflow** na branch `main`.
2. Extraia o ZIP. `index.html`, `favicon.ico`, `robots.txt`, `sitemap.xml`, `htaccess`, `assets/` e os demais arquivos estão diretamente na raiz, sem outro ZIP ou pasta envolvendo o site.
3. Envie todo o conteúdo para a pasta **frotas-experience** dentro da raiz pública do domínio **engeteles.com.br** na KingHost.
4. No servidor, renomeie **htaccess** para **.htaccess**, pois o Apache só reconhece as regras com o ponto inicial.
5. Acesse **https://engeteles.com.br/frotas-experience/**. Confira também `politica-de-privacidade.html` e `termos-de-uso.html`, inclusive atualizando o navegador.

O `robots.txt` desta subpasta não substitui o `robots.txt` da raiz do domínio. Nenhum arquivo de outros sites deve ser alterado. O workflow apenas gera o download; não realiza deploy nem usa credenciais da KingHost. Integrações externas existentes continuam dependendo de seus respectivos serviços. A validação do pacote não equivale a um teste na hospedagem KingHost.
