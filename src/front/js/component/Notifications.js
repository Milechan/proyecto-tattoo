import React, { useState, useEffect, useContext } from "react";
import {
  FaCheckCircle,
  FaPaintBrush,
  FaUserEdit,
  FaStar,
  FaBell,
  FaHeart,
} from "react-icons/fa";
import { Context } from "../store/appContext";

const getNotificationIcon = (type) => {
  const iconStyle = { color: "#ccd5dc", fontSize: "1.5rem", marginRight: "0.75rem" };
  switch (type) {
    case "solicitud": return <FaPaintBrush style={iconStyle} />;
    case "actualizacion": return <FaUserEdit style={iconStyle} />;
    case "valoracion": return <FaStar style={iconStyle} />;
    case "like": return <FaHeart style={iconStyle} />;
    default: return <FaBell style={iconStyle} />;
  }
};

export const Notifications = () => {
  const { store, actions } = useContext(Context);
  const [notifications, setNotifications] = useState([]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  useEffect(() => {
    if (store.user && store.user.notifications) {
      setNotifications(store.user.notifications);
    }
  }, [store.user, store.notifications]);

  return (
    <div className="container mt-4" style={{
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "#f5f4f2",
      padding: "20px",
      borderRadius: "20px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
    }}>
      <h2 className="mb-4" style={{ color: "#6c282f" }}>
        🔔 Notificaciones
      </h2>
      {notifications.length === 0 ? (
        <p style={{ color: "#20292f" }}>No tienes notificaciones.</p>
      ) : (
        <ul className="list-group">
          {notifications.map(notification => (
            <li
              key={notification.id}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{
                backgroundColor: notification.is_read ? "#f5f4f2" : "#9a5762",
                color: notification.is_read ? "#20292f" : "white",
                border: "none",
                marginBottom: "10px",
                borderRadius: "10px",
                padding: "15px"
              }}
            >
              <div className="d-flex align-items-center">
                {getNotificationIcon(notification.type)}
                <div>
                  <p className="mb-1">{notification.message}</p>
                  {notification.sender && (
                    <small>
                      Enviado por: <strong>{notification.sender.username}</strong>
                    </small>
                  )}
                  <br />
                  <small>{formatDate(notification.date)}</small>
                </div>
              </div>
              {!notification.is_read && (
                <button
                  className="btn btn-sm btn-light"
                  onClick={() => actions.markNotificationAsRead(notification.id)}
                >
                  <FaCheckCircle className="me-1" /> Marcar como leída
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};