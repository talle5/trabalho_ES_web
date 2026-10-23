interface AvisoSucessoProps {
  visivel: boolean;
  mensagem: string;
}

/**
 * Aviso centralizado na tela, com ícone de informação. Quem usa decide por
 * quanto tempo ele fica visível (controla `visivel`).
 */
export function AvisoSucesso({ visivel, mensagem }: AvisoSucessoProps) {
  if (!visivel) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        role="status"
        aria-live="polite"
        className="flex w-full max-w-xs flex-col items-center gap-4 rounded-2xl bg-white px-8 py-6 text-center text-gray-900 shadow-xl ring-1 ring-gray-200 dark:bg-gray-900 dark:text-gray-100 dark:ring-gray-700"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-[#005b96] text-white">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="size-8"
          >
            <path d="M12 16v-5" />
            <path d="M12 7.5h.01" />
          </svg>
        </span>
        <p className="text-sm">{mensagem}</p>
      </div>
    </div>
  );
}
