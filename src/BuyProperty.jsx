import React, { useState } from "react";
import NotificationModalConfirm from "./NotificationModalConfirm";
import NotificationModalResult from "./NotificationModalResult";
import InputMask from 'react-input-mask';
import "/src/css/BuyProperty.css"; 

const BuyProperty = () => {
    const [properties, setProperties] = useState([
        { id: 1, name: "Casa de Praia", price: "3.0", sold: false, imgUrl: "/src/assets/praia.jfif", size: "120 m²", location: "Praia do Leste" },
        { id: 2, name: "Apartamento no Centro", price: "2.5", sold: true, imgUrl: "/src/assets/apartamento.webp", size: "80 m²", location: "Centro" },
        { id: 3, name: "Chácara no Interior", price: "4.2", sold: false, imgUrl: "/src/assets/chacara.jfif", size: "300 m²", location: "Zona Rural" }
    ]);

    const [selectedProperty, setSelectedProperty] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [cpf, setCpf] = useState("");

    // Função para confirmar a compra e exibir a modal de CPF
    const confirmPurchase = (propertyId) => {
        const property = properties.find(p => p.id === propertyId);
        if (property) {
            setSelectedProperty(property);
            setModalMessage(`Você deseja comprar a propriedade ${property.name} por ${property.price} ETH?`);
            setShowConfirmModal(true);  
        }
    };

    // Função que processa a compra e exibe o resultado (sucesso ou erro)
    const buyProperty = () => {
        if (selectedProperty) {
            const cleanedCpf = cpf.replace(/\D/g, '');
            if (!cleanedCpf || cleanedCpf.length !== 11) {
                // Exibe a modal de erro, pois o CPF é inválido
                setModalMessage("CPF inválido, tente novamente.");
                setShowResultModal(true);  // Exibe a modal de falha
                setShowConfirmModal(false);  // Fecha a modal de confirmação
                return;
            }
            
            // Exibe a modal de sucesso com a compra
            setModalMessage(`Propriedade ${selectedProperty.name} comprada com sucesso! CPF: ${cpf}`);
            setShowResultModal(true);  // Exibe a modal de sucesso
            setShowConfirmModal(false);  // Fecha a modal de confirmação
            setSelectedProperty(null);   // Limpa a propriedade selecionada
            setCpf("");  // Limpa o CPF
        }
    };

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
    };

    const handleCloseResultModal = () => {
        setShowResultModal(false);
    };

    return (
        <>
            <div className="property-container">
                <h2 className="title">Propriedades à Venda</h2>
                <div className="property-list">
                    {properties.map((property) => (
                        <div key={property.id} className="property-card">
                            <img src={property.imgUrl} alt={property.name} className="property-image" />
                            <h3 className="property-name">{property.name}</h3>
                            <p className="property-price">{property.price} ETH</p>
                            <p className="property-size">Tamanho: {property.size}</p>
                            <p className="property-location">Localização: {property.location}</p>
                            {property.sold ? (
                                <span className="sold-badge">Vendido</span>
                            ) : (
                                <button onClick={() => confirmPurchase(property.id)}>Comprar</button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Modal de confirmação de compra */}
                {showConfirmModal && (
                    <div className="modal-overlay">
                        <NotificationModalConfirm
                            show={showConfirmModal}
                            handleClose={handleCloseConfirmModal}
                            message={modalMessage}
                            onConfirm={buyProperty}  // Passa a função de confirmação para o botão
                        >
                            <InputMask
                                mask="999.999.999-99" // Máscara de CPF
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                            >
                                {(inputProps) => (
                                    <input
                                        {...inputProps}
                                        type="text"
                                        className="modal-input"
                                        placeholder="Digite seu CPF"
                                    />
                                )}
                            </InputMask>
                        </NotificationModalConfirm>
                    </div>
                )}

                {/* Modal de resultado de compra */}
                {showResultModal && (
                    <div className="modal-overlay">
                        <NotificationModalResult
                            show={showResultModal}
                            handleClose={handleCloseResultModal}
                            message={modalMessage}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default BuyProperty;