import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { CampoTexto } from "~/components/CampoTexto";
import { AvisoSucesso } from "~/components/AvisoSucesso";
import { mascararTelefone } from "~/utils/mascaras";
import { cn } from "~/utils";

type Atendente = {
  nome: string;
  nomeSocial: string;
  email: string;
  telefone: string;
  cpf: string;
  nascimento: string;
  funcao: string;
  setor: string;
  matricula: string;
  unidade: string;
  perfilAcesso: string;
  avatarUrl?: string;
};

// Dados fictícios (ambiente de demonstração). Depois virão da API.
const DADOS_DEMO: Atendente = {
  nome: "Mariana Costa Ferreira",
  nomeSocial: "Mariana",
  email: "mariana.ferreira@example.com",
  telefone: "11900000000",
  cpf: "***.***.***-00",
  nascimento: "14/08/1992",
  funcao: "Atendente",
  setor: "Recepção",
  matricula: "ATD-0042",
  unidade: "UBS CENTRO",
  perfilAcesso: "atendente",
};

type DadosEditaveis = Pick<Atendente, "nome" | "email" | "telefone" | "nomeSocial">;

type Props = {
  atendente?: Atendente;
  onSalvar?: (dados: DadosEditaveis) => void;
  onAlterarSenha?: () => void;
};

export function PerfilAtendente({
  atendente = DADOS_DEMO,
  onSalvar,
  onAlterarSenha,
}: Props) {
  const inicial: DadosEditaveis = {
    nome: atendente.nome,
    email: atendente.email,
    telefone: mascararTelefone(atendente.telefone),
    nomeSocial: atendente.nomeSocial,
  };
  const [form, setForm] = useState<DadosEditaveis>(inicial);
  const [avisoVisivel, setAvisoVisivel] = useState(false);

  // Esconde o aviso de sucesso depois de 3 segundos
  useEffect(() => {
    if (!avisoVisivel) return;
    const timer = setTimeout(() => setAvisoVisivel(false), 3000);
    return () => clearTimeout(timer);
  }, [avisoVisivel]);

  function atualizar(campo: keyof DadosEditaveis, valor: string) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSalvar?.(form); // TODO: integrar com app/services (API)
    setAvisoVisivel(true);
  }

  return (
    <div className="mx-auto w-full max-w-6xl p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold">Meu perfil</h1>
      <p className="mt-1 mb-6 text-sm text-gray-500 dark:text-gray-400">
        Consulte seu vínculo com a unidade e mantenha seus dados de contato atualizados.
      </p>

      {/* Cabeçalho do perfil */}
      <section className="mb-6 flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-center gap-4">
          <Avatar nome={atendente.nome} url={atendente.avatarUrl} />
          <div>
            <h2 className="text-lg font-semibold">{atendente.nome}</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {atendente.funcao} · {atendente.setor}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Perfil de acesso: {atendente.perfilAcesso}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-3 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">Unidade de atendimento</p>
          <p className="text-sm font-semibold">{atendente.unidade}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Matrícula: {atendente.matricula}
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Dados pessoais */}
        <Painel
          titulo="Dados pessoais e de contato"
          subtitulo="Edite as informações abaixo e salve suas alterações."
        >
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <CampoTexto
                rotulo="Nome completo"
                className="sm:col-span-2"
                value={form.nome}
                onChange={(e) => atualizar("nome", e.target.value)}
              />

              <div className="relative">
                <CampoTexto rotulo="CPF" value={atendente.cpf} readOnly />
                <IconeCadeado className="absolute right-4 bottom-4.25" />
              </div>
              <div className="relative">
                <CampoTexto
                  rotulo="Data de nascimento"
                  value={atendente.nascimento}
                  readOnly
                />
                <IconeCadeado className="absolute right-4 bottom-4.25" />
              </div>

              <CampoTexto
                rotulo="E-mail"
                type="email"
                className="sm:col-span-2"
                value={form.email}
                onChange={(e) => atualizar("email", e.target.value)}
              />
              <CampoTexto
                rotulo="Telefone com DDD"
                type="tel"
                inputMode="tel"
                value={form.telefone}
                onChange={(e) => atualizar("telefone", mascararTelefone(e.target.value))}
              />
              <CampoTexto
                rotulo="Nome social (opcional)"
                value={form.nomeSocial}
                onChange={(e) => atualizar("nomeSocial", e.target.value)}
              />
            </div>

            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              CPF e data de nascimento são somente leitura. Para corrigir, procure o
              responsável pela unidade.
            </p>

            <div className="mt-5 flex items-center justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
              <button
                type="button"
                onClick={() => setForm(inicial)}
                className="h-10 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#005b96] px-4 text-sm font-semibold text-white hover:bg-[#004a7a]"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12l5 5L20 7" />
                </svg>
                Salvar alterações
              </button>
            </div>
          </form>
        </Painel>

        {/* Coluna lateral */}
        <div className="flex flex-col gap-6">
          <Painel
            titulo="Vínculo profissional"
            subtitulo="Informações do seu cadastro na unidade."
          >
            <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
              <Info rotulo="Unidade" valor={atendente.unidade} className="col-span-2" />
              <Info rotulo="Função" valor={atendente.funcao} />
              <Info rotulo="Matrícula" valor={atendente.matricula} />
              <Info rotulo="Setor" valor={atendente.setor} className="col-span-2" />
            </dl>
            <p className="mt-4 flex items-start gap-2 border-t border-gray-200 pt-3 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
              <IconeCadeado className="mt-0.5" />O vínculo é definido pela unidade e não
              pode ser alterado neste perfil.
            </p>
          </Painel>

          <Painel titulo="Segurança da conta" subtitulo="Cuide do acesso à sua conta.">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Use uma senha exclusiva e não compartilhe suas credenciais.
            </p>
            <button
              type="button"
              onClick={onAlterarSenha}
              className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-[#005b96] hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-blue-300 dark:hover:bg-gray-800"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="8" cy="15" r="4" />
                <path d="M11 12l9-9M16 7l3 3" />
              </svg>
              Alterar senha
            </button>
          </Painel>
        </div>
      </div>

      <p className="mt-8 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8v.01M12 11v5" />
        </svg>
        Ambiente de demonstração. Todos os dados deste perfil são fictícios.
      </p>

      <AvisoSucesso visivel={avisoVisivel} mensagem="Alterações salvas com sucesso." />
    </div>
  );
}

/* ---------- Peças internas ---------- */

function Painel({
  titulo,
  subtitulo,
  children,
}: {
  titulo: string;
  subtitulo: string;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <header className="border-b border-gray-200 bg-gray-50 px-5 py-3 dark:border-gray-700 dark:bg-gray-800/60">
        <h2 className="text-sm font-semibold">{titulo}</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">{subtitulo}</p>
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Info({
  rotulo,
  valor,
  className,
}: {
  rotulo: string;
  valor: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-xs text-gray-500 dark:text-gray-400">{rotulo}</dt>
      <dd className="font-semibold">{valor}</dd>
    </div>
  );
}

function Avatar({ nome, url }: { nome: string; url?: string }) {
  const iniciais = nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return url ? (
    <img src={url} alt={nome} className="size-16 rounded-full object-cover" />
  ) : (
    <span
      aria-hidden="true"
      className="grid size-16 place-items-center rounded-full bg-blue-100 text-lg font-semibold text-[#005b96] dark:bg-blue-950 dark:text-blue-200"
    >
      {iniciais}
    </span>
  );
}

function IconeCadeado({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0 text-gray-400", className)}
      aria-hidden="true"
    >
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}