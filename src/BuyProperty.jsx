import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import RealEstateContract from "../artifacts/RealEstateContract.json";
import NotificationModal from "./NotificationModal"; // Importando a modal

const BuyProperty = () => {
    const [properties, setProperties] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [amount, setAmount] = useState("");
    const [showModal, setShowModal] = useState(false); // Estado para controlar a modal
    const [modalMessage, setModalMessage] = useState(""); // Mensagem da modal

    useEffect(() => {
        const fetchProperties = async () => {
            if (typeof window.ethereum !== "undefined") {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    RealEstateContract.address,
                    RealEstateContract.abi,
                    signer
                );

                try {
                    const propertiesCount = await contract.propertiesCount();
                    const propertyList = [];

                    for (let i = 1; i <= propertiesCount; i++) {
                        const property = await contract.getProperty(i);
                        propertyList.push({
                            id: property.id.toString(),
                            name: property.name,
                            price: ethers.utils.formatEther(property.price), // Convertendo para ETH
                            owner: property.owner,
                            sold: property.sold,
                        });
                    }

                    setProperties(propertyList);
                } catch (error) {
                    console.error("Erro ao carregar propriedades:", error);
                }
            } else {
                console.error("Ethereum object doesn't exist!");
            }
        };

        fetchProperties();
    }, []);

    const buyProperty = async (propertyId) => {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                RealEstateContract.address,
                RealEstateContract.abi,
                signer
            );

            try {
                const tx = await contract.buyProperty(propertyId, { value: ethers.utils.parseEther(amount) });
                await tx.wait();
                setModalMessage("Propriedade comprada com sucesso!");
                setShowModal(true); // Exibir a modal
            } catch (error) {
                console.error("Erro ao comprar propriedade:", error);
                setModalMessage("Erro ao comprar a propriedade. Tente novamente.");
                setShowModal(true); // Exibir a modal
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false); // Fechar a modal
    };

    return (
        <div>
            <h2>Comprar Propriedade</h2>
            <ul>
                {properties.map((property) => (
                    <li key={property.id}>
                        {property.name} - {property.price} ETH
                        {property.sold ? (
                            <span> (Vendido)</span>
                        ) : (
                            <button onClick={() => {
                                setSelectedProperty(property.id);
                                setAmount(property.price); // Preenche automaticamente o valor
                                buyProperty(property.id);
                            }}>
                                Comprar
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            {/* Modal de notificação */}
            <NotificationModal
                show={showModal}
                handleClose={handleCloseModal}
                message={modalMessage}
            />
        </div>
    );
};

export default BuyProperty;
