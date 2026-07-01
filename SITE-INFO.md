# Site da Imagini — Ficha Completa

## Tecnologia

- **Framework:** Astro 4 (gera HTML estático — site rápido e seguro)
- **Linguagem:** HTML, CSS, JavaScript + arquivos Markdown e JSON
- **CMS:** Decap CMS (painel visual de edição)
- **Código-fonte:** arquivos na pasta `/Users/kelly/imagini-site` no seu Mac

---

## Hospedagem

- **Host:** Netlify
- **Painel Netlify:** https://app.netlify.com
- **Login Netlify:** kellyfmba@gmail.com
- **Senha Netlify:** *(sua senha do Netlify)*

---

## Domínio

- **Domínio:** www.imagini-mkt.com
- **Onde foi registrado:** *(registradora onde você comprou o domínio — Registro.br, GoDaddy, etc.)*

---

## Repositório do Código

- **GitHub:** https://github.com/kelly-aguiar/imagini-site
- **Login GitHub:** kelly-aguiar
- **Senha GitHub:** *(sua senha do GitHub)*

---

## Links de acesso

| O quê                  | Link                                          |
|------------------------|-----------------------------------------------|
| Site público           | https://www.imagini-mkt.com                   |
| Painel CMS (edição)    | https://www.imagini-mkt.com/admin             |
| Painel Netlify         | https://app.netlify.com                       |
| Código no GitHub       | https://github.com/kelly-aguiar/imagini-site  |

---

## Login do CMS

- **URL:** https://www.imagini-mkt.com/admin
- **E-mail:** *(e-mail usado ao aceitar o convite do Netlify Identity)*
- **Senha:** *(senha definida ao aceitar o convite)*

---

## Como funciona o fluxo de publicação

1. Você edita algo no CMS (`/admin`)
2. O CMS salva automaticamente no GitHub
3. O Netlify detecta a mudança e republica o site em ~1 minuto
4. A alteração aparece em www.imagini-mkt.com

---

## Estrutura de arquivos importantes

| Arquivo / Pasta                  | O que é                                      |
|----------------------------------|----------------------------------------------|
| `src/data/clientes.json`         | Lista de clientes do portfólio               |
| `src/data/servicos.json`         | Serviços individuais e pacotes               |
| `src/data/homepage.json`         | Textos da página inicial                     |
| `src/data/sobre.json`            | Textos da página Sobre                       |
| `src/data/contato.json`          | E-mail, redes sociais e promessa de resposta |
| `src/content/noticias/`          | Artigos e notícias (arquivos .md)            |
| `public/images/clientes/`        | Logos dos clientes                           |
| `public/images/noticias/`        | Imagens dos artigos                          |
| `public/admin/config.yml`        | Configuração do CMS                          |
