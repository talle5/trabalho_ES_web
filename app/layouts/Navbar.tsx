import { NavLink } from "react-router";
import Logo from "../assets/Logo_1.svg";
import FilaIcon from "../assets/Icon_2.svg";
import SaidaIcon from "../assets/Icon_3.svg";
import PerfilIcon from "../assets/Icon_1.svg";
import ConsultasIcon from "../assets/Icon_6.svg";

export function Navbar() {
  const options = [
    { to: "/fila", label: "Fila", icon: FilaIcon },
    { to: "/consulta", label: "Consultas", icon: ConsultasIcon },
    { to: "/saidas", label: "Solicitações de saída", icon: SaidaIcon },
    { to: "/perfil", label: "Meu perfil", icon: PerfilIcon },
  ];

  return (
    <div className="w-1/5 shrink-0 h-screen overflow-y-auto border-r border-[#c0c6d0] dark:border-blue-600 flex flex-col p-4 bg-[#ebedf3]">
      <div className="flex flex-row justify-center gap-2 items-center h-16">
        <img src={Logo} alt="Logo" />
        <span className="font-semibold text-gray-800 dark:text-white">Saúde Digital</span>
      </div>

      <nav className="flex flex-col gap-1 mt-4">
        {options.map((i) => (
          <NavLink
            key={i.to}
            to={i.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-semibold dark:bg-blue-950/50 dark:text-blue-400"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/60"
              }`
            }
          >
            <img src={i.icon} alt="" className="h-5 w-5" />
            <span>{i.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}