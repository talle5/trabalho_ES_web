/**
 * Busca de endereço pelo CEP na API pública ViaCEP (https://viacep.com.br).
 * É chamada pelo navegador, só quando a pessoa clica em "Buscar".
 */
import { apenasDigitos } from "~/utils/mascaras";

export interface EnderecoCep {
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
}

interface RespostaViaCep {
  erro?: unknown;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
}

/**
 * Retorna o endereço do CEP, ou `null` se o CEP for inválido ou não existir.
 * Lança erro se o serviço não puder ser consultado (sem internet, fora do ar).
 */
export async function buscarEnderecoPorCep(
  cep: string,
): Promise<EnderecoCep | null> {
  const digitos = apenasDigitos(cep);
  if (digitos.length !== 8) return null;

  const resposta = await fetch(`https://viacep.com.br/ws/${digitos}/json/`);
  if (!resposta.ok) throw new Error("Falha ao consultar o CEP.");

  const dados: RespostaViaCep = await resposta.json();
  if (dados.erro) return null;

  return {
    logradouro: dados.logradouro ?? "",
    bairro: dados.bairro ?? "",
    cidade: dados.localidade ?? "",
    uf: dados.uf ?? "",
  };
}

/**
 * Monta "Rua, Bairro, Cidade - UF". O número da casa não vem do CEP: a pessoa
 * completa no próprio campo.
 */
export function formatarEndereco(endereco: EnderecoCep): string {
  const rua = [endereco.logradouro, endereco.bairro].filter(Boolean).join(", ");
  const cidade = [endereco.cidade, endereco.uf].filter(Boolean).join(" - ");
  return [rua, cidade].filter(Boolean).join(", ");
}
