import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Certifique-se de instalar o axios
import propertyImage from './assets/imagem.png'; // Importando a imagem

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      // Altere a URL para apontar para sua API
      const response = await axios.get('http://localhost:5000/propriedades');
      setProperties(response.data);
    } catch (error) {
      console.error("Erro ao buscar propriedades:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div>
      <h2>Lista de Propriedades</h2>
      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            <img src={propertyImage} alt={property.name} style={{ width: '100px', height: 'auto' }} />
            <div>
              <strong>{property.name}</strong> - {property.price} ETH <br />
              (Transação: {property.transactionHash})
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;
