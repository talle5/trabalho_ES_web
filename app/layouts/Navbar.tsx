import { NavLink } from "react-router";
import Logo from "../assets/Logo_1.svg";
import {
  UserMultiple4Outlined,
  CalendarDaysOutlined,
  ExitOutlined,
  User4Outlined,
} from "@lineiconshq/free-icons";
import Lineicons from "@lineiconshq/react-lineicons";

export function Navbar() {
  const options = [
    { to: "/fila", label: "Fila", icon: UserMultiple4Outlined },
    { to: "/consulta", label: "Consultas", icon: CalendarDaysOutlined },
    { to: "/saidas", label: "Solicitações de saída", icon: ExitOutlined },
    { to: "/perfil", label: "Meu perfil", icon: User4Outlined },
  ];

  return (
    <div className="w-1/5 shrink-0 h-screen overflow-y-auto border-r border-[#c0c6d0] dark:border-blue-600 flex flex-col bg-[#ebedf3] dark:bg-gray-950">
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
              `flex items-center gap-3 px-4 py-3 text-sm transition-all ${isActive
                ? "bg-[#3173b2] border-l-8 border-[#005b96] text-white font-semibold dark:bg-blue-950/50 dark:text-blue-400"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/60"
              }`
            }
          >
            <Lineicons icon={i.icon} size={20} />
            <span>{i.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}