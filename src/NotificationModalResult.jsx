import React from "react";
import "/src/css/NotificationModalResult.css";

const NotificationModalResult = ({ show, message, handleClose }) => {
    return (
        show && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h4>{message}</h4>
                    <div className="modal-actions">
                        <button onClick={handleClose} className="modal-button">Fechar</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default NotificationModalResult;