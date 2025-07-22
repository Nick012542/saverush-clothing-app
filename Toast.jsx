import React from "react";
import "../styles/toast.css"; 

const Toast = ({ message, show, color = "#10B981" }) => {
  if (!show) return null;

  return (
    <div
      className="toast"
      style={{
        backgroundColor: color,
        color: "#fff",
        position: "fixed",
        top: "130px",
        right: "30px",
        padding: "0.7rem 2rem",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        opacity: 1,
        pointerEvents: "auto",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        zIndex: 2000,
        transform: "translateY(0)",
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
