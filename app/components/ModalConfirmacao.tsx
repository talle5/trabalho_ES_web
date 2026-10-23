import { useEffect, useRef } from "react";
import { Button } from "~/components/Button";

interface ModalConfirmacaoProps {
  aberto: boolean;
  titulo: string;
  descricao: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export function ModalConfirmacao({
  aberto,
  titulo,
  descricao,
  textoConfirmar = "Confirmar",
  textoCancelar = "Cancelar",
  onConfirmar,
  onCancelar,
}: ModalConfirmacaoProps) {
  const dialogoRef = useRef<HTMLDialogElement>(null);

  // O <dialog> nativo cuida do foco, da tecla Esc e do fundo escurecido.
  useEffect(() => {
    const dialogo = dialogoRef.current;
    if (!dialogo) return;

    if (aberto && !dialogo.open) dialogo.showModal();
    if (!aberto && dialogo.open) dialogo.close();
  }, [aberto]);

  return (
    <dialog
      ref={dialogoRef}
      onClose={onCancelar}
      aria-labelledby="modal-confirmacao-titulo"
      className="m-auto w-full max-w-md rounded-xl bg-white p-6 text-gray-900 shadow-xl backdrop:bg-black/50 dark:bg-gray-900 dark:text-gray-100"
    >
      <h2 id="modal-confirmacao-titulo" className="text-xl font-bold">
        {titulo}
      </h2>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{descricao}</p>

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" autoFocus onClick={onCancelar}>
          {textoCancelar}
        </Button>
        <Button variant="danger" onClick={onConfirmar}>
          {textoConfirmar}
        </Button>
      </div>
    </dialog>
  );
}
