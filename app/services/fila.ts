/**
 * Dados provisórios (mock) da fila de atendimento.
 *
 * O backend (trabalho_ES_backend) ainda não expõe endpoints da fila. Quando
 * existirem, troque apenas a origem dos dados (hoje `obterFilasMock`) por
 * chamadas ao cliente de `~/services/api`; os tipos e as funções de filtro
 * continuam valendo.
 */

export interface Profissional {
  id: string;
  nome: string;
  especialidade: string;
}

export interface PacienteNaFila {
  id: string;
  nome: string;
  /** Posição real na fila do profissional, começando em 1. */
  posicao: number;
}

export interface FilaProfissional {
  profissional: Profissional;
  pacientes: PacienteNaFila[];
}

/** Quantidade de solicitações de saída pendentes (valor provisório). */
export const SOLICITACOES_PENDENTES_MOCK = 2;

interface FilaBase {
  profissional: Profissional;
  pacientes: { id: string; nome: string }[];
}

const filasBase: FilaBase[] = [
  {
    profissional: {
      id: "ricardo-mendes",
      nome: "Dr. Ricardo Mendes",
      especialidade: "Clínico geral",
    },
    pacientes: [
      { id: "p-101", nome: "Guilherme Nunes" },
      { id: "p-102", nome: "Beatriz Souza Oliveira" },
      { id: "p-103", nome: "Carlos Roberto Pereira" },
    ],
  },
  {
    profissional: {
      id: "luiza-freitas",
      nome: "Dra. Luiza Freitas",
      especialidade: "Dentista",
    },
    pacientes: [
      { id: "p-201", nome: "Sabrina Oliveira" },
      { id: "p-202", nome: "Antônio Carlos" },
      { id: "p-203", nome: "Ricardo Felipe" },
      { id: "p-204", nome: "Karla Santos de Oliveira" },
      { id: "p-205", nome: "Maria Helena Marques" },
    ],
  },
  {
    profissional: {
      id: "pedro-henrique",
      nome: "Dr. Pedro Henrique",
      especialidade: "Cardiologista",
    },
    pacientes: [
      { id: "p-301", nome: "Eduardo Lima" },
      { id: "p-302", nome: "Helena Duarte" },
      { id: "p-303", nome: "Marcos Vinícius Almeida" },
      { id: "p-304", nome: "Teresa Cristina Barbosa" },
      { id: "p-305", nome: "Paulo Sérgio Azevedo" },
    ],
  },
  {
    profissional: {
      id: "juliana-silva",
      nome: "Dra. Juliana Silva",
      especialidade: "Nutricionista",
    },
    pacientes: [
      { id: "p-401", nome: "Camila Rocha" },
      { id: "p-402", nome: "André Luiz Ferreira" },
      { id: "p-403", nome: "Renata Martins Costa" },
    ],
  },
];

/** Numera os pacientes na ordem em que estão (1º, 2º, 3º...). */
export function numerarPosicoes(
  pacientes: { id: string; nome: string }[],
): PacienteNaFila[] {
  return pacientes.map((paciente, indice) => ({
    id: paciente.id,
    nome: paciente.nome,
    posicao: indice + 1,
  }));
}

/** Retorna uma cópia nova das filas de exemplo, já com as posições. */
export function obterFilasMock(): FilaProfissional[] {
  return filasBase.map((fila) => ({
    profissional: { ...fila.profissional },
    pacientes: numerarPosicoes(fila.pacientes),
  }));
}

/** Minúsculas e sem acentos, para a busca ignorar "Antônio" x "antonio". */
export function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * Filtra as filas pelo termo de busca.
 * - Se o nome ou a especialidade do profissional combina, a fila inteira aparece.
 * - Caso contrário, aparecem só os pacientes que combinam (com a posição real).
 * - Profissionais sem nenhuma correspondência ficam de fora.
 */
export function filtrarFilas(
  filas: FilaProfissional[],
  termo: string,
): FilaProfissional[] {
  const busca = normalizarTexto(termo.trim());
  if (!busca) return filas;

  return filas.flatMap((fila) => {
    const profissionalCombina = normalizarTexto(
      `${fila.profissional.nome} ${fila.profissional.especialidade}`,
    ).includes(busca);
    if (profissionalCombina) return [fila];

    const pacientes = fila.pacientes.filter((paciente) =>
      normalizarTexto(paciente.nome).includes(busca),
    );
    return pacientes.length > 0 ? [{ ...fila, pacientes }] : [];
  });
}
