# Trabalho ES - Frontend (React Router + Tailwind CSS)

Estrutura limpa, direta e simplificada para desenvolvimento web em React Router e Tailwind CSS.

---

## 📁 Estrutura de Diretórios Simplificada

```text
trabalho_ES_web/
├── app/
│   ├── assets/              # Imagens, logotipos e ícones estáticos
│   │   ├── logo-dark.svg
│   │   └── logo-light.svg
│   ├── components/          # Componentes visuais reutilizáveis
│   │   ├── Button.tsx       # Botão personalizável
│   │   └── Card.tsx         # Card com suporte a título e descrição
│   ├── layouts/             # Estruturas e molduras de tela da aplicação
│   │   ├── Navbar.tsx       # Barra de navegação do topo
│   │   ├── Footer.tsx       # Rodapé
│   │   └── MainLayout.tsx   # Layout principal (Navbar + Conteúdo + Footer)
│   ├── pages/               # Telas / Páginas da aplicação
│   │   └── home.tsx         # Página inicial
│   ├── services/            # Comunicação com APIs e backend
│   │   └── api.ts           # Cliente HTTP base (fetch com tratamento de erro)
│   ├── utils/               # Funções utilitárias simples (ex: helper 'cn')
│   │   └── index.ts
│   ├── app.css              # Configurações de estilo global com Tailwind CSS
│   ├── root.tsx             # Componente raiz da aplicação (HTML shell)
│   └── routes.ts            # Registro e mapeamento das rotas
├── public/                  # Arquivos estáticos servidos diretamente na raiz (ex: favicon)
│   └── favicon.ico
├── Dockerfile               # Configuração Docker
├── package.json             # Dependências e scripts
├── react-router.config.ts   # Configurações do React Router
├── tsconfig.json            # Configuração do TypeScript e alias (~/*)
└── vite.config.ts           # Configuração de build do Vite
```

---

## 🎯 Onde colocar cada coisa?

- **Quer criar uma nova página/tela?**
  1. Crie o arquivo em `app/pages/minha-pagina.tsx`.
  2. Registre a rota em `app/routes.ts`:
     ```ts
     route("minha-url", "pages/minha-pagina.tsx")
     ```
- **Quer alterar o menu ou rodapé?**
  - Altere os arquivos dentro de `app/layouts/` (`Navbar.tsx`, `Footer.tsx`, `MainLayout.tsx`).
- **Quer criar um botão, input, modal ou card reutilizável?**
  - Crie dentro de `app/components/`.
- **Quer adicionar imagens ou logos?**
  - Coloque em `app/assets/` e importe usando `import logo from "~/assets/meu-logo.svg"`.
- **Quer chamar uma API ou backend?**
  - Use ou expanda o cliente em `app/services/api.ts`.

---

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Rodar ambiente de desenvolvimento
npm run dev

# Checagem de tipos e compilação
npm run typecheck
npm run build
```
