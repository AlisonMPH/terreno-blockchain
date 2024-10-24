import React, { useState } from "react";
import NotificationModal from "./NotificationModal"; // Importando a modal
import "/src/css/BuyProperty.css"; // Estilos externos

const BuyProperty = () => {
    // Propriedades fictícias para testes, incluindo tamanho e localização
    const [properties, setProperties] = useState([
        { id: 1, name: "Casa de Praia", price: "3.0", sold: false, imgUrl: "/src/assets/praia.jfif", size: "120 m²", location: "Praia do Leste" },
        { id: 2, name: "Apartamento no Centro", price: "2.5", sold: true, imgUrl: "/src/assets/apartamento.webp", size: "80 m²", location: "Centro" },
        { id: 3, name: "Chácara no Interior", price: "4.2", sold: false, imgUrl: "/src/assets/chacara.jfif", size: "300 m²", location: "Zona Rural" }
    ]);

    const [selectedProperty, setSelectedProperty] = useState(null);
    const [showModal, setShowModal] = useState(false); // Estado para controlar o modal de confirmação
    const [modalMessage, setModalMessage] = useState(""); // Mensagem da modal

    const confirmPurchase = (propertyId) => {
        const property = properties.find(p => p.id === propertyId);
        if (property) {
            setSelectedProperty(property); // Seleciona a propriedade para a confirmação
            setModalMessage(`Você deseja comprar a propriedade ${property.name} por ${property.price} ETH?`);
            setShowModal(true); // Exibe a modal para confirmação
        }
    };

    const buyProperty = () => {
        if (selectedProperty) {
            setModalMessage(`Propriedade ${selectedProperty.name} comprada com sucesso!`);
            setShowModal(true); // Exibe a mensagem de sucesso após a compra
            setSelectedProperty(null); // Limpa a propriedade selecionada
        }
    };

    const handleCloseModal = () => {
        setShowModal(false); // Fechar a modal
    };

    return (
        <div className="property-container">
            <h2 className="title">Propriedades à Venda</h2>
            <div className="property-list">
                {properties.map((property) => (
                    <div key={property.id} className="property-card">
                        <img src={property.imgUrl} alt={property.name} className="property-image" />
                        <h3 className="property-name">{property.name}</h3>
                        <p className="property-price">{property.price} ETH</p>
                        <p className="property-size">Tamanho: {property.size}</p> {/* Tamanho da propriedade */}
                        <p className="property-location">Localização: {property.location}</p> {/* Localização da propriedade */}
                        {property.sold ? (
                            <span className="sold-badge">Vendido</span>
                        ) : (
                            <button className="buy-button" onClick={() => confirmPurchase(property.id)}>
                                Comprar
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal de confirmação ou notificação */}
            <NotificationModal
                show={showModal}
                handleClose={handleCloseModal}
                message={modalMessage}
                isConfirmation={!!selectedProperty} // Se há propriedade selecionada, é um modal de confirmação
                onConfirm={buyProperty} // Ação ao confirmar a compra
            />
        </div>
    );
};

export default BuyProperty;
