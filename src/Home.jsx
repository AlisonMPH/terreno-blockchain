import '/src/css/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bem-vindo a EthLand</h1>
      <p>
        Encontre a propriedade dos seus sonhos com facilidade. Nosso sistema permite que você compre e venda imóveis
        de forma rápida e segura, como em uma imobiliária tradicional.
      </p>
      <section className="features-section">
        <h2>Recursos Principais</h2>
        <ul>
          <li><strong>Variedade de Imóveis:</strong> Explore casas, apartamentos e mais.</li>
          <li><strong>Compra Simples:</strong> Adquira propriedades com apenas um clique.</li>
        </ul>
      </section>
    </div>
  );
}

export default Home;