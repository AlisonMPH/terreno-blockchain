import React, { useState } from 'react';
import { ethers } from 'ethers';
import RealEstateContract from '../artifacts/RealEstateContract.json'; // Ajuste o caminho conforme necessário

const CreateProperty = () => {
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controle de loading
  const [message, setMessage] = useState(''); // Estado para mensagens de feedback

  const createProperty = async (e) => {
    e.preventDefault();
    
    if (parseFloat(price) <= 0) {
      setMessage('O preço deve ser maior que zero.');
      return;
    }

    setLoading(true); // Inicia o loading
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(REAL_ESTATE_CONTRACT_ADDRESS, RealEstateContract.abi, signer);

    try {
      const tx = await contract.listProperty(location, ethers.utils.parseEther(price));
      await tx.wait();
      setMessage('Propriedade criada com sucesso!');
      setLocation(''); // Limpa o campo de localização
      setPrice(''); // Limpa o campo de preço
    } catch (error) {
      console.error(error);
      setMessage('Erro ao criar propriedade: ' + error.message);
    } finally {
      setLoading(false); // Finaliza o loading
    }
  };

  return (
    <div>
      <h2>Criar Propriedade</h2>
      <form onSubmit={createProperty}>
        <input
          type="text"
          placeholder="Localização"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Preço (ETH)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Criando...' : 'Criar Propriedade'}
        </button>
      </form>
      {message && <p>{message}</p>} {/* Exibe mensagens de feedback */}
    </div>
  );
};

export default CreateProperty;
