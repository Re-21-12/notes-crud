
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div>
            <Link to="/" className="text-white text-lg font-semibold">
              Visualizador de punteos
            </Link>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/ver-tareas"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  Ver Tareas
                </Link>
              </li>
              <li>
                <Link
                  to="agregar-tarea"
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  Agegar Tarea
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
