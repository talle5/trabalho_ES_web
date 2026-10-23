/**
 * Regras e dados provisórios do cadastro de nova consulta.
 *
 * O backend (trabalho_ES_backend) ainda não expõe endpoints de consulta.
 * Quando existirem, troque o corpo de `registrarConsulta` por uma chamada ao
 * cliente de `~/services/api`; a tela não precisa mudar.
 */
import { obterFilasMock, type Profissional } from "~/services/fila";
import { apenasDigitos } from "~/utils/mascaras";

export interface DadosPaciente {
  nome: string;
  cpf: string;
  cartaoSus: string;
  telefone: string;
  /** Formato do input de data: aaaa-mm-dd. */
  dataNascimento: string;
  cep: string;
  endereco: string;
}

export interface DadosConsulta {
  /** Tipo de consulta = especialidade do profissional. */
  especialidade: string;
  profissionalId: string;
  /** Formato do input de data: aaaa-mm-dd. */
  data: string;
  /** Formato do input de hora: hh:mm. */
  horario: string;
  prioridade: string;
}

export interface NovaConsulta {
  paciente: DadosPaciente;
  consulta: DadosConsulta;
}

export const PACIENTE_VAZIO: DadosPaciente = {
  nome: "",
  cpf: "",
  cartaoSus: "",
  telefone: "",
  dataNascimento: "",
  cep: "",
  endereco: "",
};

export const CONSULTA_VAZIA: DadosConsulta = {
  especialidade: "",
  profissionalId: "",
  data: "",
  horario: "",
  prioridade: "",
};

/**
 * Provisório: o protótipo só mostra "Normal". "Preferencial" segue o termo já
 * usado na lista de consultas (pages/consulta.tsx). Ajuste esta lista conforme
 * as prioridades definidas para a UBS.
 */
export const PRIORIDADES: string[] = ["Normal", "Preferencial"];

/** Profissionais disponíveis (provisório: os mesmos da tela de fila). */
export function listarProfissionais(): Profissional[] {
  return obterFilasMock().map((fila) => fila.profissional);
}

/** Especialidades sem repetição, na ordem em que aparecem. */
export function listarEspecialidades(profissionais: Profissional[]): string[] {
  return Array.from(new Set(profissionais.map((p) => p.especialidade)));
}

/**
 * Confere se todos os campos do paciente estão preenchidos. Para CPF, SUS,
 * telefone e CEP confere só a quantidade de dígitos (não valida o dígito
 * verificador do CPF).
 */
export function pacienteCompleto(paciente: DadosPaciente): boolean {
  const telefone = apenasDigitos(paciente.telefone).length;

  return (
    paciente.nome.trim() !== "" &&
    apenasDigitos(paciente.cpf).length === 11 &&
    apenasDigitos(paciente.cartaoSus).length === 15 &&
    (telefone === 10 || telefone === 11) &&
    paciente.dataNascimento !== "" &&
    apenasDigitos(paciente.cep).length === 8 &&
    paciente.endereco.trim() !== ""
  );
}

/** Confere se todos os campos da consulta estão preenchidos. */
export function consultaCompleta(consulta: DadosConsulta): boolean {
  return Object.values(consulta).every((valor) => valor.trim() !== "");
}

/** Registra a consulta. Provisório: ainda não grava em lugar nenhum. */
export async function registrarConsulta(_dados: NovaConsulta): Promise<void> {
  return;
}
