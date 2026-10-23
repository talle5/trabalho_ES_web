/**
 * Máscaras de digitação para os campos do formulário.
 * Cada função recebe o texto digitado (com ou sem formatação) e devolve o
 * texto formatado, ignorando o que não for dígito.
 */

/** Mantém apenas os dígitos de um texto. */
export function apenasDigitos(valor: string): string {
  return valor.replace(/\D/g, "");
}

/**
 * Aplica um padrão onde cada "#" vira um dígito. Os caracteres fixos do padrão
 * só aparecem quando há um próximo dígito, então apagar com Backspace funciona
 * normalmente (ex.: "123" não vira "123.").
 */
function aplicarPadrao(valor: string, padrao: string): string {
  const digitos = apenasDigitos(valor);
  let resultado = "";
  let indice = 0;

  for (const caractere of padrao) {
    if (indice >= digitos.length) break;

    if (caractere === "#") {
      resultado += digitos[indice];
      indice += 1;
    } else {
      resultado += caractere;
    }
  }

  return resultado;
}

/** 000.000.000-00 */
export function mascararCpf(valor: string): string {
  return aplicarPadrao(valor, "###.###.###-##");
}

/** 000 0000 0000 0000 */
export function mascararCartaoSus(valor: string): string {
  return aplicarPadrao(valor, "### #### #### ####");
}

/** (00) 0000-0000 (fixo) ou (00) 00000-0000 (celular) */
export function mascararTelefone(valor: string): string {
  const padrao =
    apenasDigitos(valor).length > 10 ? "(##) #####-####" : "(##) ####-####";
  return aplicarPadrao(valor, padrao);
}

/** 00000-000 */
export function mascararCep(valor: string): string {
  return aplicarPadrao(valor, "#####-###");
}
