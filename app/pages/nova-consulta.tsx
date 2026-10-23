import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/nova-consulta";
import { MainLayout } from "~/layouts/MainLayout";
import { Button } from "~/components/Button";
import { Breadcrumb } from "~/components/Breadcrumb";
import { SecaoRecolhivel } from "~/components/SecaoRecolhivel";
import { CampoTexto } from "~/components/CampoTexto";
import { CampoSelect } from "~/components/CampoSelect";
import { AvisoSucesso } from "~/components/AvisoSucesso";
import { buscarEnderecoPorCep, formatarEndereco } from "~/services/cep";
import {
  CONSULTA_VAZIA,
  PACIENTE_VAZIO,
  PRIORIDADES,
  consultaCompleta,
  listarEspecialidades,
  listarProfissionais,
  pacienteCompleto,
  registrarConsulta,
  type DadosConsulta,
  type DadosPaciente,
} from "~/services/consultas";
import {
  apenasDigitos,
  mascararCartaoSus,
  mascararCep,
  mascararCpf,
  mascararTelefone,
} from "~/utils/mascaras";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Saúde Digital - Nova consulta" },
    {
      name: "description",
      content: "Cadastro de nova consulta na UBS",
    },
  ];
}

export default function NovaConsulta() {
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState<DadosPaciente>(PACIENTE_VAZIO);
  const [consulta, setConsulta] = useState<DadosConsulta>(CONSULTA_VAZIA);

  const [pacienteAberto, setPacienteAberto] = useState(true);
  const [consultaAberta, setConsultaAberta] = useState(false);

  const [buscandoCep, setBuscandoCep] = useState(false);
  const [erroCep, setErroCep] = useState("");

  const [enviando, setEnviando] = useState(false);
  const [cadastrada, setCadastrada] = useState(false);

  const profissionais = useMemo(listarProfissionais, []);
  const especialidades = useMemo(
    () => listarEspecialidades(profissionais),
    [profissionais],
  );
  const medicos = profissionais.filter(
    (profissional) => profissional.especialidade === consulta.especialidade,
  );

  const cepCompleto = apenasDigitos(paciente.cep).length === 8;
  const podeCadastrar =
    pacienteCompleto(paciente) &&
    consultaCompleta(consulta) &&
    !enviando &&
    !cadastrada;

  // Depois do aviso de sucesso, volta para a lista de consultas.
  useEffect(() => {
    if (!cadastrada) return;
    const temporizador = window.setTimeout(() => navigate("/consulta"), 2000);
    return () => window.clearTimeout(temporizador);
  }, [cadastrada, navigate]);

  function alterarPaciente(campo: keyof DadosPaciente, valor: string) {
    setPaciente((atual) => ({ ...atual, [campo]: valor }));
  }

  function alterarConsulta(campo: keyof DadosConsulta, valor: string) {
    setConsulta((atual) => ({ ...atual, [campo]: valor }));
  }

  async function buscarCep() {
    setErroCep("");
    setBuscandoCep(true);

    try {
      const endereco = await buscarEnderecoPorCep(paciente.cep);
      if (!endereco) {
        setErroCep("CEP não encontrado.");
        return;
      }
      alterarPaciente("endereco", formatarEndereco(endereco));
    } catch {
      setErroCep("Não foi possível consultar o CEP. Tente novamente.");
    } finally {
      setBuscandoCep(false);
    }
  }

  async function cadastrar() {
    if (!podeCadastrar) return;

    setEnviando(true);
    await registrarConsulta({ paciente, consulta });
    setCadastrada(true);
  }

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <Breadcrumb
          itens={[
            { rotulo: "Consultas", para: "/consulta" },
            { rotulo: "Cadastro de nova consulta" },
          ]}
        />

        <SecaoRecolhivel
          titulo="Informações do Paciente"
          descricao="Preencha os campos abaixo com os dados oficiais do paciente."
          aberta={pacienteAberto}
          onAlternar={() => setPacienteAberto((aberta) => !aberta)}
          textoAjuda="Para realizar o cadastro, preencha todas as informações do paciente."
        >
          <div className="grid gap-6 sm:grid-cols-3">
            <CampoTexto
              rotulo="Nome Completo"
              className="sm:col-span-3"
              value={paciente.nome}
              onChange={(evento) => alterarPaciente("nome", evento.target.value)}
              placeholder="Digite o nome completo conforme identidade"
              autoComplete="off"
            />
            <CampoTexto
              rotulo="CPF"
              value={paciente.cpf}
              onChange={(evento) =>
                alterarPaciente("cpf", mascararCpf(evento.target.value))
              }
              placeholder="000.000.000-00"
              inputMode="numeric"
              autoComplete="off"
            />
            <CampoTexto
              rotulo="Cartão do SUS"
              value={paciente.cartaoSus}
              onChange={(evento) =>
                alterarPaciente("cartaoSus", mascararCartaoSus(evento.target.value))
              }
              placeholder="000 0000 0000 0000"
              inputMode="numeric"
              autoComplete="off"
            />
            <CampoTexto
              rotulo="Telefone com DDD"
              type="tel"
              value={paciente.telefone}
              onChange={(evento) =>
                alterarPaciente("telefone", mascararTelefone(evento.target.value))
              }
              placeholder="(00) 00000-0000"
              autoComplete="off"
            />
            <CampoTexto
              rotulo="Data de Nascimento"
              type="date"
              value={paciente.dataNascimento}
              onChange={(evento) =>
                alterarPaciente("dataNascimento", evento.target.value)
              }
            />

            <div className="flex items-end gap-3">
              <CampoTexto
                rotulo="CEP"
                className="min-w-0 flex-1"
                value={paciente.cep}
                onChange={(evento) => {
                  setErroCep("");
                  alterarPaciente("cep", mascararCep(evento.target.value));
                }}
                placeholder="00000-000"
                inputMode="numeric"
                autoComplete="off"
              />
              <Button
                variant="secondary"
                className="h-12 shrink-0 gap-2"
                onClick={buscarCep}
                disabled={!cepCompleto || buscandoCep}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="size-4"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                {buscandoCep ? "Buscando..." : "Buscar"}
              </Button>
            </div>
            {erroCep && (
              <p
                role="alert"
                className="text-sm text-red-600 dark:text-red-400 sm:col-span-3"
              >
                {erroCep}
              </p>
            )}

            <CampoTexto
              rotulo="Endereço Residencial"
              className="sm:col-span-3"
              value={paciente.endereco}
              onChange={(evento) =>
                alterarPaciente("endereco", evento.target.value)
              }
              placeholder="Rua, Número, Bairro, Cidade - UF"
              autoComplete="off"
            />
          </div>
        </SecaoRecolhivel>

        <SecaoRecolhivel
          titulo="Informações da Consulta"
          descricao="Preencha os campos abaixo com os detalhes sobre a consulta do paciente."
          aberta={consultaAberta}
          onAlternar={() => setConsultaAberta((aberta) => !aberta)}
          textoAjuda="Para realizar o cadastro, preencha todas as informações sobre a consulta."
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <CampoSelect
              rotulo="Tipo de Consulta"
              placeholder="Selecione a especialidade"
              opcoes={especialidades.map((especialidade) => ({
                valor: especialidade,
                rotulo: especialidade,
              }))}
              value={consulta.especialidade}
              onChange={(evento) =>
                setConsulta((atual) => ({
                  ...atual,
                  especialidade: evento.target.value,
                  profissionalId: "",
                }))
              }
            />
            <CampoSelect
              rotulo="Médico"
              placeholder="Selecione o profissional"
              opcoes={medicos.map((medico) => ({
                valor: medico.id,
                rotulo: medico.nome,
              }))}
              value={consulta.profissionalId}
              onChange={(evento) =>
                alterarConsulta("profissionalId", evento.target.value)
              }
              disabled={!consulta.especialidade}
            />
            <CampoTexto
              rotulo="Data"
              type="date"
              value={consulta.data}
              onChange={(evento) => alterarConsulta("data", evento.target.value)}
            />
            <CampoTexto
              rotulo="Horário"
              type="time"
              value={consulta.horario}
              onChange={(evento) =>
                alterarConsulta("horario", evento.target.value)
              }
            />
            <CampoSelect
              rotulo="Prioridade"
              placeholder="Selecione a prioridade"
              opcoes={PRIORIDADES.map((prioridade) => ({
                valor: prioridade,
                rotulo: prioridade,
              }))}
              value={consulta.prioridade}
              onChange={(evento) =>
                alterarConsulta("prioridade", evento.target.value)
              }
            />
          </div>
        </SecaoRecolhivel>

        <div className="flex flex-wrap justify-end gap-4 pb-4">
          <Button
            variant="danger"
            size="lg"
            onClick={() => navigate("/consulta")}
            disabled={enviando || cadastrada}
          >
            Cancelar
          </Button>
          <Button
            variant="brand"
            size="lg"
            onClick={cadastrar}
            disabled={!podeCadastrar}
          >
            Cadastrar nova consulta
          </Button>
        </div>
      </div>

      <AvisoSucesso visivel={cadastrada} mensagem="Consulta cadastrada com sucesso!" />
    </MainLayout>
  );
}
