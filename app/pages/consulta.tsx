import { useState } from "react";
import { MainLayout } from "~/layouts/MainLayout";

interface PacienteConsulta {
  id: string;
  nome: string;
  horario: string;
  tipo: string;
  prioridade: "Normal" | "Preferencial";
}

export function meta() {
  return [{ title: "Saúde Digital | Consultas" }];
}

export default function Consulta() {
  const medico = {
    nome: "Dr. Carlos Eduardo",
    especialidade: "Clínico Geral",
    consultorio: "Consultório 03",
    crm: "124589-SP",
  };

  // Listas de pacientes por status
  const [listas] = useState<Record<string, PacienteConsulta[]>>({
    "1": [
      {
        id: "1",
        nome: "Maria Aparecida Silva",
        horario: "08:30",
        tipo: "Retorno",
        prioridade: "Preferencial",
      },
      {
        id: "2",
        nome: "João Pedro Santos",
        horario: "09:00",
        tipo: "Consulta de Rotina",
        prioridade: "Normal",
      },
      {
        id: "3",
        nome: "Ana Beatriz Souza",
        horario: "09:30",
        tipo: "Avaliação de Exames",
        prioridade: "Normal",
      },
      {
        id: "4",
        nome: "Sebastião Ferreira",
        horario: "10:00",
        tipo: "Renovação de Receita",
        prioridade: "Preferencial",
      },
    ],
    "2": [
      {
        id: "5",
        nome: "Roberto Lima Carvalho",
        horario: "08:00",
        tipo: "Primeira Consulta",
        prioridade: "Normal",
      },
    ],
    "3": [
      {
        id: "6",
        nome: "Francisca Nogueira",
        horario: "07:30",
        tipo: "Retorno",
        prioridade: "Preferencial",
      },
    ],
  });

  const abas = [
    { id: "1", nome: "Dr. Carlos" },
    { id: "2", nome: "Dr. Carlos" },
    { id: "3", nome: "Dr. Carlos" },
  ];

  const [atual, setAtual] = useState<string>("1");
  const pacientesAtuais = listas[atual] || [];

  return (
    <MainLayout>
      <div className="flex flex-col gap-2">
        <div className="flex justify-end">
          <button className="bg-[#005b96] rounded-2xl p-2.5 font-semibold min-w-72 text-white">Cadastrar nova consulta</button>
        </div>
        <div className="w-full border border-[#d4d8e2] dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900 overflow-hidden shadow-xs">
          <header className="flex justify-between p-5 font-bold text-[#434951] border-b border-[#d4d8e2] dark:border-gray-800 bg-[#f8f9fb] dark:bg-gray-950">
            <span>CONSULTAS</span>
            <span>{new Date().toLocaleDateString()}</span>
          </header>
          <div className="flex border-b border-[#d4d8e2] dark:border-gray-800 bg-[#f8f9fb] dark:bg-gray-950 gap-2 overflow-x-auto">
            {abas.map((x) => (
              <button
                key={x.id}
                onClick={() => setAtual(x.id)}
                type="button"
                className={`flex flex-col items-center gap-2 px-5 py-3 border-b-2 cursor-pointer transition-all ${atual === x.id
                  ? "border-[#005a9c] bg-white dark:bg-gray-900 shadow-xs" : "border-transparent"}`}
              >
                <span className={`text-sm font-bold dark:text-white ${atual === x.id ? "text-[#005b96]" : ""}`}>
                  {medico.nome}
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {medico.especialidade.toUpperCase()}
                </p>
              </button>
            ))}
          </div>

          <div className="p-6">
            {pacientesAtuais.length === 0 ? (
              <div className="py-16 text-center text-gray-500 dark:text-gray-400">
                <p className="text-base font-medium">Nenhum paciente nesta lista.</p>
                <p className="text-xs mt-1 text-gray-400">
                  Os pacientes aparecerão aqui conforme forem triados ou chamados.
                </p>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800">
                {pacientesAtuais.map((paciente) => (
                  <div
                    key={paciente.id}
                    className="py-4 flex flex-col md:flex-row md:items-center gap-4 hover:bg-gray-50/70 dark:hover:bg-gray-800/40 px-3 rounded-xl transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg min-w-18">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Horário
                      </span>
                      <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                        {paciente.horario}
                      </span>
                    </div>

                    <div className="flex flex-col items-baseline gap-2 flex-wrap">
                      <h2 className="font-semibold text-gray-900 dark:text-white text-base">
                        {paciente.nome}
                      </h2>
                      <div className="flex gap-2">
                        <span
                          className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${paciente.prioridade === "Preferencial"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                            }`}
                        >
                          {paciente.prioridade}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Tipo: {paciente.tipo}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <span className="text-xs">  Após o último paciente ser atendido, o registro de fila será reiniciado.</span>
      </div>
    </MainLayout>
  );
}
