import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark p-3">
            <div className="nav navbar-nav">
                <NavLink className="nav-item nav-link" to="/" end>Home</NavLink>
                <NavLink className="nav-item nav-link" to="/create">Criar Propriedade</NavLink>
                <NavLink className="nav-item nav-link" to="/buy">Comprar Propriedade</NavLink>
                <NavLink className="nav-item nav-link" to="/properties">Listar Propriedades</NavLink>
            </div>
        </nav>
    );
}

export default Header;