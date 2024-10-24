import Layout from './Layout';
import Home from './Home';
import NotFound from './NotFound';
import CreateProperty from './CreateProperty'; // Componente para criar propriedades
import BuyProperty from './BuyProperty'; // Componente para comprar propriedades
import PropertyList from './PropertyList'; // Componente para listar propriedades
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import '/src/css/Style.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/create" element={<CreateProperty />} /> {/* Rota para criar propriedades */}
          <Route path="/buy" element={<BuyProperty />} /> {/* Rota para comprar propriedades */}
          <Route path="/properties" element={<PropertyList />} /> {/* Rota para listar propriedades */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
