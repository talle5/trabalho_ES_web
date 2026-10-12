import { Link } from "react-router";
import Logo from "../assets/Logo_1.svg";

export function Navbar() {

  const options = [
    {to:"/fila",label:"Fila"}
  ]

  return (
    <div>
      <div className="flex flex-row justify-center gap-2 items-center min-h-24"> 
        <img src={Logo} alt="" />
        <span>Saúde Digital</span>
      </div>
      <div>
        {options.map(
          (i) => <Link to={i.to}> {i.label}</Link>
        )}
      </div>
      <div></div>
    </div>
  );
}
