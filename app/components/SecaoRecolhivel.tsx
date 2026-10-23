import { useId, type ReactNode } from "react";
import { cn } from "~/utils";

interface SecaoRecolhivelProps {
  titulo: string;
  descricao: string;
  aberta: boolean;
  onAlternar: () => void;
  /** Texto de ajuda exibido abaixo do card, ao lado de um ícone de informação. */
  textoAjuda?: string;
  children: ReactNode;
}

export function SecaoRecolhivel({
  titulo,
  descricao,
  aberta,
  onAlternar,
  textoAjuda,
  children,
}: SecaoRecolhivelProps) {
  const painelId = `${useId()}-painel`;

  return (
    <section>
      <div className="overflow-hidden rounded-xl border border-[#c0c6d0] bg-white dark:border-blue-600 dark:bg-gray-900">
        <h2>
          <button
            type="button"
            aria-expanded={aberta}
            aria-controls={painelId}
            onClick={onAlternar}
            className="flex w-full cursor-pointer items-center justify-between gap-4 bg-blue-50 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#005b96] dark:bg-gray-800"
          >
            <span>
              <span className="block text-base font-semibold text-gray-900 dark:text-gray-100">
                {titulo}
              </span>
              <span className="mt-1 block text-base text-gray-600 dark:text-gray-300">
                {descricao}
              </span>
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className={cn(
                "size-6 shrink-0 text-gray-600 transition-transform dark:text-gray-300",
                aberta && "rotate-180",
              )}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </h2>

        <div
          id={painelId}
          hidden={!aberta}
          className="border-t border-[#c0c6d0] p-6 dark:border-gray-700"
        >
          {children}
        </div>
      </div>

      {textoAjuda && (
        <p className="mt-2 flex items-center gap-2 px-2 text-sm text-gray-600 dark:text-gray-400">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="size-4 shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          {textoAjuda}
        </p>
      )}
    </section>
  );
}
