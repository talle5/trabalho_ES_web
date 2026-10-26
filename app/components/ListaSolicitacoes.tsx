import { Button } from "~/components/Button";
import type { SolicitacaoSaida } from "~/services/solicitacoes";

interface ListaSolicitacoesProps {
  solicitacoes: SolicitacaoSaida[];
  onAceitar: (solicitacao: SolicitacaoSaida) => void;
}

export function ListaSolicitacoes({
  solicitacoes,
  onAceitar,
}: ListaSolicitacoesProps) {
  if (solicitacoes.length === 0) {
    return (
      <p className="px-6 py-12 text-center text-gray-600 dark:text-gray-400">
        Não há solicitações.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-800">
      {solicitacoes.map((solicitacao) => (
        <li
          key={solicitacao.id}
          className="flex flex-wrap items-center justify-between gap-4 px-6 py-6"
        >
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {solicitacao.nome}
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              CPF: {solicitacao.cpf}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs uppercase text-gray-700 dark:text-gray-300">
                Horário solicitação
              </p>
              <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {solicitacao.horario}
              </p>
            </div>
            <Button
              variant="danger"
              aria-label={`Aceitar solicitação de saída de ${solicitacao.nome}`}
              onClick={() => onAceitar(solicitacao)}
            >
              Aceitar Solicitação
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
