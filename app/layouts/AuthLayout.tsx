import type { ReactNode } from "react";
import { Link } from "react-router";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9ff] font-sans text-gray-900">
      <header className="flex items-center justify-between bg-white px-4 py-3 sm:px-8 sm:py-4">
        <Link to="/" aria-label="Saúde Digital" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-md bg-[#005a9c]">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff" aria-hidden="true">
              <path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6z" />
            </svg>
          </span>
          <span className="text-xl font-bold tracking-tight text-[#005a9c]">
            Saúde Digital
          </span>
        </Link>

        <nav className="flex gap-3 text-xs font-medium sm:gap-6">
          <a href="#" className="hover:text-[#005a9c]">Sobre o sistema</a>
          <a href="#" className="hover:text-[#005a9c]">Suporte</a>
        </nav>
      </header>

      <main className="grid flex-1 place-items-center px-4 py-12">{children}</main>

      <footer className="flex justify-center gap-6 border-t border-[#dfe3ec] bg-white p-5 text-[10px]">
        <a href="#" className="hover:text-[#005a9c]">Termos de Uso</a>
        <a href="#" className="hover:text-[#005a9c]">Privacidade</a>
      </footer>
    </div>
  );
}