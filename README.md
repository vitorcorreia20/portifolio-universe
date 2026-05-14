# 🌌 Vitor Correia - Universe Portfolio 

![Status](https://img.shields.io/badge/Status-Online-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)

Um portfólio interativo em 3D construído para ir além da clássica landing page estática. Este projeto renderiza uma galáxia onde cada estrela representa um projeto puxado diretamente da API do GitHub, envolto por uma interface (HUD) moderna com efeito Glassmorphism.

> 🔗 **[Acesse o Portfólio Online Aqui](https://portifolio-universe.vercel.app/)**

## ✨ Funcionalidades

* **Galáxia Interativa 3D:** Navegação livre (pan, zoom, rotate) utilizando React Three Fiber.
* **Integração Dinâmica (GitHub API):** Os projetos são renderizados no universo automaticamente com base nos repositórios do GitHub.
* **HUD Glassmorphism:** Interface 2D sobreposta ao universo 3D sem bloquear a interatividade, projetada para usabilidade rápida de recrutadores.
* **Painel de Leitura Markdown:** Ao clicar em uma estrela, o `README.md` original do repositório é puxado, formatado e exibido na tela.
* **Totalmente Responsivo:** A experiência 3D e a HUD adaptam-se perfeitamente de monitores ultrawide a telas de smartphones.

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando as ferramentas mais modernas do ecossistema front-end:

* **[Next.js (App Router)](https://nextjs.org/)** - Framework React com renderização híbrida.
* **[React Three Fiber & Drei](https://docs.pmnd.rs/react-three-fiber)** - Renderização 3D e abstração do Three.js para React.
* **[Tailwind CSS v4](https://tailwindcss.com/)** - Estilização utilitária com a nova arquitetura unificada.
* **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para maior segurança e previsibilidade do código.
* **[Lucide React & React Icons](https://lucide.dev/)** - Iconografia otimizada.
* **GitHub REST API** - Consumo de dados dinâmicos dos repositórios.
