import { useId, type InputHTMLAttributes } from "react";
import { cn } from "~/utils";

interface CampoTextoProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className"> {
  rotulo: string;
  /** Classes do contêiner (rótulo + campo), por exemplo para ocupar colunas do grid. */
  className?: string;
}

export function CampoTexto({ rotulo, className, ...props }: CampoTextoProps) {
  const id = useId();

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-base text-gray-900 dark:text-gray-100">
        {rotulo}
      </label>
      <input
        id={id}
        {...props}
        className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-base text-gray-900 placeholder:text-gray-500 focus:border-[#005b96] focus:outline-none focus:ring-2 focus:ring-[#005b96]/40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500"
      />
    </div>
  );
}
