import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import RealEstateContract from '../artifacts/RealEstateContract.json'; // Ajuste o caminho conforme necessário

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(REAL_ESTATE_CONTRACT_ADDRESS, RealEstateContract.abi, provider);

    const propertyCount = await contract.propertyCount();
    const propertyArray = [];

    for (let i = 1; i <= propertyCount; i++) {
      const property = await contract.getProperty(i);
      propertyArray.push(property);
    }

    setProperties(propertyArray);
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
            {property.location} - {ethers.utils.formatEther(property.price)} ETH
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;
