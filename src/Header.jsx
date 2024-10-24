import { NavLink } from "react-router-dom";
import '/src/css/Header.css'; // Importar um arquivo CSS separado para estilos personalizados

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Imobiliária XYZ</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav ms-auto"> {/* Alinha os itens à direita */}
                        <NavLink className="nav-item nav-link" to="/" end>
                            Home
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/create">
                            Vender Propriedade
                        </NavLink>
                        <NavLink className="nav-item nav-link" to="/buy">
                            Comprar Propriedade
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
