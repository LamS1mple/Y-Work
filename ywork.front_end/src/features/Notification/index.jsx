import React from "react";
import "./index.css";

const Notification = ({ type, message, onClose }) => {
    const getBackgroundColor = () => {
        if (type === "success") return "#d4edda";
        if (type === "error") return "#f8d7da";
        return "#fff3cd";
    };

    const getTextColor = () => {
        if (type === "success") return "#155724";
        if (type === "error") return "#721c24";
        return "#856404";
    };

    return (
        <div
            className="notification"
            style={{
                backgroundColor: getBackgroundColor(),
                color: getTextColor(),
                border: `1px solid ${getTextColor()}`,
            }}
        >
            <span>{message}</span>
            <button style={{marginLeft:"10px"}} className="close-button" onClick={onClose}>
                ×
            </button>
        </div>
    );
};

export default Notification;
