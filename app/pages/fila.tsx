import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/fila";
import { MainLayout } from "~/layouts/MainLayout";
import { Button } from "~/components/Button";
import { AbasProfissionais } from "~/components/AbasProfissionais";
import { TabelaFila } from "~/components/TabelaFila";
import { ModalConfirmacao } from "~/components/ModalConfirmacao";
import { formatDate } from "~/utils";
import {
  SOLICITACOES_PENDENTES_MOCK,
  filtrarFilas,
  numerarPosicoes,
  obterFilasMock,
  type FilaProfissional,
  type PacienteNaFila,
  type Profissional,
} from "~/services/fila";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Saúde Digital - Fila" },
    {
      name: "description",
      content: "Acompanhe as filas de atendimento da UBS",
    },
  ];
}

interface AlvoRemocao {
  profissional: Profissional;
  paciente: PacienteNaFila;
}

export default function Fila() {
  const navigate = useNavigate();

  const [filas, setFilas] = useState<FilaProfissional[]>(obterFilasMock);
  const [busca, setBusca] = useState("");
  const [profissionalAtivoId, setProfissionalAtivoId] = useState(
    () => filas[0]?.profissional.id ?? "",
  );
  const [alvoRemocao, setAlvoRemocao] = useState<AlvoRemocao | null>(null);

  // A data é calculada só no navegador: com SSR, servidor e cliente podem
  // estar em fusos diferentes e divergir na hidratação perto da meia-noite.
  const [hoje, setHoje] = useState("");
  useEffect(() => {
    setHoje(formatDate(new Date()));
  }, []);

  const visiveis = useMemo(() => filtrarFilas(filas, busca), [filas, busca]);
  const profissionaisVisiveis = useMemo(
    () => visiveis.map((fila) => fila.profissional),
    [visiveis],
  );

  // Se a aba selecionada some por causa da busca, mostra a primeira visível.
  const ativa =
    visiveis.find((fila) => fila.profissional.id === profissionalAtivoId) ??
    visiveis[0];

  function confirmarRemocao() {
    if (!alvoRemocao) return;
    const { profissional, paciente } = alvoRemocao;

    setFilas((atual) =>
      atual.map((fila) =>
        fila.profissional.id === profissional.id
          ? {
              ...fila,
              pacientes: numerarPosicoes(
                fila.pacientes.filter((item) => item.id !== paciente.id),
              ),
            }
          : fila,
      ),
    );
    setAlvoRemocao(null);
  }

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Bom dia!
            </h1>
            <p className="mt-1 text-lg text-gray-600 dark:text-gray-300">
              Acompanhe as filas de atendimento da UBS para hoje.
            </p>
          </div>
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {hoje}
          </span>
        </header>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-500 dark:text-gray-400"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="text"
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
              placeholder="Buscar fila por médico ou paciente"
              aria-label="Buscar fila por médico ou paciente"
              className="w-full rounded-full bg-[#ebedf3] py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#005b96] dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400"
            />
          </div>

          <div className="relative">
            <Button
              variant="brand"
              onClick={() => navigate("/saidas")}
              aria-label={
                SOLICITACOES_PENDENTES_MOCK > 0
                  ? `Solicitações de saída, ${SOLICITACOES_PENDENTES_MOCK} pendentes`
                  : "Solicitações de saída"
              }
            >
              Solicitações de saída
            </Button>
            {SOLICITACOES_PENDENTES_MOCK > 0 && (
              <span
                aria-hidden="true"
                className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-red-600 px-1.5 text-xs font-bold text-white"
              >
                {SOLICITACOES_PENDENTES_MOCK}
              </span>
            )}
          </div>
        </div>

        <section className="overflow-hidden rounded-xl border border-[#c0c6d0] bg-white dark:border-blue-600 dark:bg-gray-900">
          {ativa ? (
            <>
              <AbasProfissionais
                profissionais={profissionaisVisiveis}
                ativoId={ativa.profissional.id}
                onSelecionar={setProfissionalAtivoId}
              />
              <TabelaFila
                pacientes={ativa.pacientes}
                onRemover={(paciente) =>
                  setAlvoRemocao({ profissional: ativa.profissional, paciente })
                }
              />
            </>
          ) : (
            <p className="px-6 py-12 text-center text-gray-600 dark:text-gray-400">
              {busca.trim()
                ? "Nenhum resultado para a busca."
                : "Nenhuma fila disponível."}
            </p>
          )}
        </section>
      </div>

      <ModalConfirmacao
        aberto={alvoRemocao !== null}
        titulo={
          alvoRemocao ? `Remover ${alvoRemocao.paciente.nome} da fila?` : ""
        }
        descricao={
          alvoRemocao
            ? `O paciente sai da fila de ${alvoRemocao.profissional.nome} e as posições são atualizadas.`
            : ""
        }
        textoConfirmar="Remover paciente"
        onConfirmar={confirmarRemocao}
        onCancelar={() => setAlvoRemocao(null)}
      />
    </MainLayout>
  );
}
