import React from "react";
import '/src/css/NotificationModal.css'; // Importar o CSS adequado

const NotificationModal = ({ show, handleClose, message, isConfirmation, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="tooltip-modal">
            <div className="tooltip-content">
                <p>{message}</p>
                {isConfirmation ? (
                    <div className="tooltip-buttons">
                        <button className="modal-button" onClick={onConfirm}>Confirmar</button>
                        <button className="modal-button cancel-button" onClick={handleClose}>Cancelar</button>
                    </div>
                ) : (
                    <button className="modal-button" onClick={handleClose}>Fechar</button>
                )}
            </div>
        </div>
    );
};

export default NotificationModal;
