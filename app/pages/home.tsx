import type { Route } from "./+types/home";
import { MainLayout } from "~/layouts/MainLayout";
import { Button } from "~/components/Button";
import { Card } from "~/components/Card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Trabalho ES - Início" },
    { name: "description", content: "Aplicação Web Trabalho ES" },
  ];
}

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center text-center gap-8 py-10">
        <div className="w-64 max-w-full">
        </div>

        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Bem-vindo ao Trabalho ES
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Estrutura simplificada com páginas (<code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm">pages/</code>),
            layouts (<code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm">layouts/</code>) e componentes (<code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm">components/</code>).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl text-left mt-6">
          <Card
            title="Páginas (pages/)"
            description="Crie suas telas diretamente aqui e registre no routes.ts."
          >
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400">
              app/pages/home.tsx
            </span>
          </Card>

          <Card
            title="Layouts (layouts/)"
            description="Gerencie barras de navegação, rodapés e estruturas comuns."
          >
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400">
              app/layouts/MainLayout.tsx
            </span>
          </Card>

          <Card
            title="Componentes (components/)"
            description="Elementos visuais reutilizáveis em qualquer página."
          >
            <span className="text-xs font-mono text-blue-600 dark:text-blue-400">
              app/components/Button.tsx
            </span>
          </Card>
        </div>

        <div className="flex items-center gap-4 mt-4">
          <Button variant="primary" size="lg">
            Começar Agora
          </Button>
          <Button variant="outline" size="lg">
            Documentação
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
