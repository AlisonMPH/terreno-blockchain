import React from "react";
import "/src/css/NotificationModalConfirm.css";

const NotificationModalConfirm = ({ show, handleClose, message, onConfirm, children }) => {
    // Se 'show' for falso, não renderiza o modal
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{message}</h3>
                {/* Exibe o campo de CPF ou qualquer conteúdo extra */}
                {children}

                <div className="modal-actions">
                    <button className="modal-button" onClick={onConfirm}>Confirmar</button>
                    <button className="modal-button" onClick={handleClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default NotificationModalConfirm;
