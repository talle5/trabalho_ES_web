import { useEffect, useRef, useState } from "react";
import { cn } from "~/utils";
import type { Profissional } from "~/services/fila";

interface AbasProfissionaisProps {
  profissionais: Profissional[];
  ativoId: string;
  onSelecionar: (profissionalId: string) => void;
}

export function AbasProfissionais({
  profissionais,
  ativoId,
  onSelecionar,
}: AbasProfissionaisProps) {
  const listaRef = useRef<HTMLDivElement>(null);
  const [temMais, setTemMais] = useState(false);

  // Mostra a seta apenas quando existem abas fora da área visível.
  useEffect(() => {
    const lista = listaRef.current;
    if (!lista) return;

    const atualizar = () =>
      setTemMais(lista.scrollLeft + lista.clientWidth < lista.scrollWidth - 1);

    atualizar();
    lista.addEventListener("scroll", atualizar);
    const observador = new ResizeObserver(atualizar);
    observador.observe(lista);

    return () => {
      lista.removeEventListener("scroll", atualizar);
      observador.disconnect();
    };
  }, [profissionais]);

  return (
    <div className="flex items-stretch border-b border-gray-300 dark:border-gray-700">
      <div
        ref={listaRef}
        role="tablist"
        aria-label="Filas por profissional"
        className="flex flex-1 overflow-x-auto"
      >
        {profissionais.map((profissional) => {
          const ativo = profissional.id === ativoId;
          return (
            <button
              key={profissional.id}
              type="button"
              role="tab"
              aria-selected={ativo}
              onClick={() => onSelecionar(profissional.id)}
              className={cn(
                "flex min-w-48 flex-1 shrink-0 cursor-pointer flex-col items-center gap-0.5 border-b-2 px-4 py-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#005b96]",
                ativo
                  ? "border-[#005b96] text-[#005b96] dark:border-blue-400 dark:text-blue-400"
                  : "border-transparent text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800",
              )}
            >
              <span className="text-base font-semibold">
                {profissional.nome}
              </span>
              <span className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400">
                {profissional.especialidade}
              </span>
            </button>
          );
        })}
      </div>

      {temMais && (
        <button
          type="button"
          aria-label="Ver mais profissionais"
          onClick={() =>
            listaRef.current?.scrollBy({ left: 240, behavior: "smooth" })
          }
          className="flex shrink-0 cursor-pointer items-center px-3 text-gray-600 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#005b96] dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="size-5"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      )}
    </div>
  );
}
