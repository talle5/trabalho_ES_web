import { useId, type SelectHTMLAttributes } from "react";
import { cn } from "~/utils";

export interface OpcaoSelect {
  valor: string;
  rotulo: string;
}

interface CampoSelectProps
  extends Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "id" | "className" | "children"
  > {
  rotulo: string;
  /** Texto mostrado enquanto nada foi escolhido (valor ""). */
  placeholder: string;
  opcoes: OpcaoSelect[];
  /** Classes do contêiner (rótulo + campo), por exemplo para ocupar colunas do grid. */
  className?: string;
}

export function CampoSelect({
  rotulo,
  placeholder,
  opcoes,
  className,
  ...props
}: CampoSelectProps) {
  const id = useId();
  const semEscolha = props.value === "";

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-base text-gray-900 dark:text-gray-100">
        {rotulo}
      </label>
      <select
        id={id}
        {...props}
        className={cn(
          "h-12 w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 text-base focus:border-[#005b96] focus:outline-none focus:ring-2 focus:ring-[#005b96]/40 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900",
          semEscolha
            ? "text-gray-500 dark:text-gray-400"
            : "text-gray-900 dark:text-gray-100",
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {opcoes.map((opcao) => (
          <option
            key={opcao.valor}
            value={opcao.valor}
            className="text-gray-900 dark:text-gray-100"
          >
            {opcao.rotulo}
          </option>
        ))}
      </select>
    </div>
  );
}
