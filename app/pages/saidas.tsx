import { useEffect, useMemo, useState } from "react";
import type { Route } from "./+types/saidas";
import { MainLayout } from "~/layouts/MainLayout";
import { Breadcrumb } from "~/components/Breadcrumb";
import { AbasProfissionais } from "~/components/AbasProfissionais";
import { ListaSolicitacoes } from "~/components/ListaSolicitacoes";
import { AvisoSucesso } from "~/components/AvisoSucesso";
import { listarProfissionais } from "~/services/consultas";
import {
  obterSolicitacoesMock,
  solicitacoesDoProfissional,
  type SolicitacaoSaida,
} from "~/services/solicitacoes";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Saúde Digital - Solicitações de saída" },
    {
      name: "description",
      content: "Solicitações de saída da fila feitas pelos pacientes",
    },
  ];
}

export default function Saidas() {
  const profissionais = useMemo(listarProfissionais, []);
  const [solicitacoes, setSolicitacoes] =
    useState<SolicitacaoSaida[]>(obterSolicitacoesMock);
  const [profissionalAtivoId, setProfissionalAtivoId] = useState(
    () => profissionais[0]?.id ?? "",
  );
  const [avisoVisivel, setAvisoVisivel] = useState(false);

  // Esconde o aviso de sucesso depois de 3 segundos.
  useEffect(() => {
    if (!avisoVisivel) return;
    const temporizador = window.setTimeout(() => setAvisoVisivel(false), 3000);
    return () => window.clearTimeout(temporizador);
  }, [avisoVisivel]);

  const doProfissional = solicitacoesDoProfissional(
    solicitacoes,
    profissionalAtivoId,
  );

  function aceitar(solicitacao: SolicitacaoSaida) {
    setSolicitacoes((atual) =>
      atual.filter((item) => item.id !== solicitacao.id),
    );
    setAvisoVisivel(true);
  }

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <Breadcrumb itens={[{ rotulo: "Solicitações de saída" }]} />

        <section className="overflow-hidden rounded-xl border border-[#c0c6d0] bg-white dark:border-blue-600 dark:bg-gray-900">
          <AbasProfissionais
            profissionais={profissionais}
            ativoId={profissionalAtivoId}
            onSelecionar={setProfissionalAtivoId}
          />
          <ListaSolicitacoes solicitacoes={doProfissional} onAceitar={aceitar} />
        </section>
      </div>

      <AvisoSucesso visivel={avisoVisivel} mensagem="Pedido de saída aceito." />
    </MainLayout>
  );
}
