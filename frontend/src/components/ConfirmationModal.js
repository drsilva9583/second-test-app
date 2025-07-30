import React, {useState} from 'react';

const ConfirmationModal = ({ 
    isOpen, 
    onConfirm, 
    onCancel,
    onClose, 
    title, 
    message, 
    confirmText = 'Confirm', 
    cancelText = 'Cancel',
    type = 'default'
}) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    const handleCancel = () => {
        onCancel();
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className={`modal-header ${type}`}>
                    <h3>{title}</h3>
                </div>

                <div className='modal-body'>
                    <p>{message}</p>
                </div>

                <div className='modal-actions'>
                    <button 
                        className={`btn ${type == 'danger' ? 'btn-danger' : type == 'warning' ? 'btn-warning' : 'btn-confirm'}`}
                        onClick={handleConfirm}
                    >
                        {confirmText}
                    </button>
                    <button className='btn btn-cancel' onClick={handleCancel}>{cancelText}</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal