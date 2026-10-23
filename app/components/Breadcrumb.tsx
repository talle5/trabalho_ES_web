import { Link } from "react-router";

export interface ItemMigalha {
  rotulo: string;
  /** Destino do link. Sem `para`, o item é só texto. O último item nunca é link. */
  para?: string;
}

interface BreadcrumbProps {
  itens: ItemMigalha[];
}

export function Breadcrumb({ itens }: BreadcrumbProps) {
  return (
    <nav aria-label="Caminho da página">
      <ol className="flex flex-wrap items-center gap-x-4 gap-y-1 text-base font-semibold text-[#005b96] dark:text-blue-400">
        {itens.map((item, indice) => {
          const ultimo = indice === itens.length - 1;

          return (
            <li key={item.rotulo} className="flex items-center gap-2">
              <span aria-hidden="true">›</span>
              {item.para && !ultimo ? (
                <Link to={item.para} className="hover:underline">
                  {item.rotulo}
                </Link>
              ) : (
                <span aria-current={ultimo ? "page" : undefined}>
                  {item.rotulo}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
