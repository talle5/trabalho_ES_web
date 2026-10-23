import { Button } from "~/components/Button";
import type { PacienteNaFila } from "~/services/fila";

interface TabelaFilaProps {
  pacientes: PacienteNaFila[];
  /** Mensagem exibida quando não há pacientes para mostrar. */
  mensagemVazia?: string;
  onRemover: (paciente: PacienteNaFila) => void;
}

export function TabelaFila({
  pacientes,
  mensagemVazia = "Nenhum paciente na fila.",
  onRemover,
}: TabelaFilaProps) {
  return (
    <div className="max-h-[28rem] overflow-y-auto">
      <table className="w-full border-collapse">
        <thead className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800">
          <tr className="text-lg font-semibold text-[#005b96] dark:text-blue-400">
            <th scope="col" className="w-1/4 px-4 py-3 text-center">
              Posição
            </th>
            <th scope="col" className="px-4 py-3 text-left">
              Paciente
            </th>
            <th scope="col" className="w-1/3 px-4 py-3 text-center">
              Controle do fluxo
            </th>
          </tr>
        </thead>

        <tbody>
          {pacientes.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="px-4 py-10 text-center text-gray-600 dark:text-gray-400"
              >
                {mensagemVazia}
              </td>
            </tr>
          ) : (
            pacientes.map((paciente) => (
              <tr
                key={paciente.id}
                className="border-t border-gray-200 dark:border-gray-800"
              >
                <td className="px-4 py-5 text-center text-lg font-bold text-[#005b96] dark:text-blue-400">
                  {paciente.posicao}º
                </td>
                <td className="px-4 py-5 text-base font-semibold text-gray-900 dark:text-gray-100">
                  {paciente.nome}
                </td>
                <td className="px-4 py-5 text-center">
                  <Button
                    variant="danger"
                    aria-label={`Remover ${paciente.nome} da fila`}
                    onClick={() => onRemover(paciente)}
                  >
                    Remover paciente
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
