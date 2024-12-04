import React, { useState } from 'react';
import { ethers } from 'ethers';
import RealEstateContract from '../artifacts/RealEstateContract.json';
import InputMask from 'react-input-mask';

const REAL_ESTATE_CONTRACT_ADDRESS = "0xSEU_CONTRATO_AQUI";

const CreateProperty = () => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [price, setPrice] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [local, setLocal] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const createProperty = async (e) => {
    e.preventDefault();

    if (typeof window.ethereum === 'undefined') {
      setMessage('Metamask não está instalado. Por favor, instale o Metamask.');
      return;
    }

    if (!name.trim()) {
      setMessage('O nome da propriedade é obrigatório.');
      return;
    }

    if (!cpf.trim()) {
      setMessage('O CPF do Proprietário é obrigatório.');
      return;
    }

    if (parseFloat(price) <= 0) {
      setMessage('O preço deve ser maior que zero.');
      return;
    }

    if (!local.trim()) {
      setMessage('A Localização da propriedade é obrigatória.');
      return;
    }

    if (parseFloat(tamanho) <= 0) {
      setMessage('O tamanho deve ser maior que zero.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      /*const provider = new ethers.providers.Web3Provider(window.ethereum);*/


      // Solicita permissão para conectar à carteira Metamask
      await provider.send("eth_requestAccounts", []); // Solicita ao usuário a conexão
      const signer = provider.getSigner();

      // Verifica a rede conectada no Metamask
      const network = await provider.getNetwork();
      if (network.chainId !== 11155111) {  // Sepolia testnet
        setMessage('Por favor, conecte-se à rede Sepolia.');
        return;
      }

      // Conectando ao contrato
      const contract = new ethers.Contract(REAL_ESTATE_CONTRACT_ADDRESS, RealEstateContract.abi, signer);

      // Chamando a função do contrato
      const tx = await contract.listProperty(
        name, 
        ethers.utils.parseEther(price), // Convertemos o preço para Wei
        local, 
        tamanho
      );

      setMessage('Transação enviada. Aguardando confirmação...');
      await tx.wait(); // Espera a transação ser minerada

      setMessage('Propriedade listada com sucesso!');
      setName('');
      setPrice('');
      setCpf('');
      setTamanho('');
      setLocal('');
    } catch (error) {
      console.error(error);
      setMessage(`Erro ao criar propriedade: ${error.message}`);
    } finally {
      setLoading(false);
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
        <InputMask
          mask="999.999.999-99"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="CPF do Proprietário"
          required
        >
          {(inputProps) => <input {...inputProps} type="text" />}
        </InputMask>
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Tamanho"
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
        <button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Criar Propriedade'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateProperty;