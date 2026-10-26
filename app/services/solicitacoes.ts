/**
 * Dados provisórios (mock) das solicitações de saída da fila, feitas pelos
 * pacientes e analisadas pelo atendente.
 *
 * O backend (trabalho_ES_backend) ainda não expõe endpoints para isso. Quando
 * existirem, troque `obterSolicitacoesMock` por uma chamada ao cliente de
 * `~/services/api`; a tela não precisa mudar.
 */

export interface SolicitacaoSaida {
  id: string;
  nome: string;
  cpf: string;
  /** Horário em que o paciente pediu a saída, no formato hh:mm. */
  horario: string;
  /** Mesmo id usado em `Profissional` (services/fila.ts). */
  profissionalId: string;
}

/** Retorna uma cópia nova das solicitações de exemplo. */
export function obterSolicitacoesMock(): SolicitacaoSaida[] {
  return [
    {
      id: "s-101",
      nome: "Ana Souza Matias",
      cpf: "987.654.321-11",
      horario: "15:10",
      profissionalId: "ricardo-mendes",
    },
    {
      id: "s-102",
      nome: "Roberto Oliveira",
      cpf: "444.222.111-99",
      horario: "15:30",
      profissionalId: "ricardo-mendes",
    },
  ];
}

/** Solicitações de um profissional, da mais antiga para a mais recente. */
export function solicitacoesDoProfissional(
  solicitacoes: SolicitacaoSaida[],
  profissionalId: string,
): SolicitacaoSaida[] {
  return solicitacoes
    .filter((solicitacao) => solicitacao.profissionalId === profissionalId)
    .sort((a, b) => a.horario.localeCompare(b.horario));
}
