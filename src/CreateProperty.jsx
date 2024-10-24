import React, { useState } from 'react';
import { ethers } from 'ethers';
import RealEstateContract from '../artifacts/RealEstateContract.json';
import axios from 'axios';

const REAL_ESTATE_CONTRACT_ADDRESS = "0xSEU_CONTRATO_AQUI"; // Endereço do contrato

const CreateProperty = () => {
  const [name, setName] = useState(''); // Campo para o nome da propriedade
  const [price, setPrice] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [local, setLocal] = useState('');
  const [loading, setLoading] = useState(false); // Controle de loading
  const [message, setMessage] = useState(''); // Feedback visual

  const createProperty = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage('O nome da propriedade é obrigatório.');
      return;
    }

    if (parseFloat(price) <= 0) {
      setMessage('O preço deve ser maior que zero.');
      return;
    }

    if (!locsl.trim()) {
      setMessage('A Localização da propriedade é obrigatório.');
      return;
    }

    if (parseFloat(tamanho) <= 0) {
      setMessage('O tamanho deve ser maior que zero.');
      return;
    }

    setLoading(true); // Inicia o loading
    setMessage('');

    try {
      // Conexão com a blockchain e assinatura da transação
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(REAL_ESTATE_CONTRACT_ADDRESS, RealEstateContract.abi, signer);

      // Envia a transação para a blockchain
      const tx = await contract.listarPropriedade(name, ethers.utils.parseEther(price));
      setMessage('Transação enviada. Aguardando confirmação...');
      await tx.wait(); // Aguarda a confirmação da transação

      // Após criar na blockchain, envia uma requisição ao backend para salvar no SQLite
      //await axios.post('http://localhost:5000/propriedades', {
      //  name,
      // price,
      //  transactionHash: "" //& tx.hash // Passando o hash da transação
      //});

      //setMessage('Propriedade criada com sucesso na blockchain e no banco de dados local!');
      setName(''); // Limpa os campos
      setPrice('');
    } catch (error) {
      console.error(error);
      setMessage(`Erro ao criar propriedade: ${error.message}`);
    } finally {
      setLoading(false); // Finaliza o loading
    }
  };

  return (
    <div>
      <h2>Informe os dados da Propriedade</h2>
      <form onSubmit={createProperty}>
      <input
          type="text"
          placeholder="Nome da Propriedade"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tamanho M²"
          value={tamanho}
          onChange={(e) => setTamanho(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Localização"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
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
          {loading ? 'Anunciando...' : 'Anunciar Propriedade'}
        </button>
      </form>
      {message && <p>{message}</p>} {/* Exibe mensagens de feedback */}
    </div>
  );
};

export default CreateProperty;
