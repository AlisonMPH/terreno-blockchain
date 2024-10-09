import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div class="d-flex flex-column justify-content-center min-vh-100 align-items-center">
        <h1>Página Não Encontrada</h1>
        <p className="text-muted">Desculpe, a página que você está tentando acessar não existe.</p>
        <NavLink to="/" className="btn btn-primary">Voltar para a Home</NavLink>
      </div>
    </>
  );
}

export default NotFound;
