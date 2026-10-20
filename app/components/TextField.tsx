import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "~/utils";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  icon?: ReactNode;
  /** Conteúdo no canto direito do input (ex: botão de mostrar senha) */
  trailing?: ReactNode;
  /** Conteúdo ao lado do label (ex: link "Esqueci minha senha") */
  labelAside?: ReactNode;
  error?: string;
};

export function TextField({
  label,
  id,
  icon,
  trailing,
  labelAside,
  error,
  className,
  ...props
}: TextFieldProps) {
  return (
    <div className="mb-5">
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor={id} className="text-xs font-semibold text-gray-900">
          {label}
        </label>
        {labelAside}
      </div>

      <div
        className={cn(
          "flex h-11 items-center gap-2 rounded-lg border bg-[#f1f3fa] px-3 text-gray-500 transition",
          "focus-within:border-[#005a9c] focus-within:ring-4 focus-within:ring-[#005a9c]/15",
          error ? "border-red-600" : "border-[#dfe3ec]",
        )}
      >
        {icon}
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "flex-1 border-none bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400",
            className,
          )}
          {...props}
        />
        {trailing}
      </div>

      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
