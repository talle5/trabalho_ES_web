import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // 1. Página inicial (URL: "/")
  index("pages/home.tsx"),

  // 2. Novas páginas adicionadas com route("caminho-da-url", "arquivo-em-app"):
  route("login", "pages/login.tsx"),           // Acessa em: /login
  route("fila", "pages/fila.tsx"),             // Acessa em: /fila
  route("consulta", "pages/consulta.tsx"),     // Acessa em: /consulta
  route("saidas", "pages/saidas.tsx"),         // Acessa em: /saidas
  route("perfil", "pages/perfil.tsx"),         // Acessa em: /perfil
] satisfies RouteConfig;