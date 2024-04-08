import { Link } from "react-router-dom";

const Unauthorized = () => (
  <div>
    <h1>Page non autorisée</h1>
    <p>Vous n'avez pas la permission d'accéder à cette page.</p>
    <Link to="/">Retourner à la page d'accueil.</Link>
  </div>
);

export default Unauthorized;