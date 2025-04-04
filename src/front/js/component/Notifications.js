import React, { useState } from "react";
import {
  FaCheckCircle,
  FaCalendarAlt,
  FaUserCheck,
  FaStar,
  FaBell,
} from "react-icons/fa";

export const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Tienes una nueva solicitud de tatuaje.",
      date: "2025-04-04T12:00:00Z",
      is_read: false,
      type: "appointment_request",
    },
    {
      id: 2,
      message: "Tu cita ha sido confirmada.",
      date: "2025-04-03T15:30:00Z",
      is_read: true,
      type: "appointment_confirmed",
    },
    {
      id: 3,
      message: "Has recibido una nueva valoración.",
      date: "2025-04-01T10:00:00Z",
      is_read: false,
      type: "review_received",
    },
    {
      id: 4,
      message: "Tu perfil fue actualizado correctamente.",
      date: "2025-03-30T17:45:00Z",
      is_read: true,
      type: "profile_updated",
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  const getIcon = (type) => {
    switch (type) {
      case "appointment_request":
        return <FaCalendarAlt className="text-warning me-2" />;
      case "appointment_confirmed":
        return <FaUserCheck className="text-success me-2" />;
      case "review_received":
        return <FaStar className="text-info me-2" />;
      case "profile_updated":
        return <FaBell className="text-primary me-2" />;
      default:
        return <FaBell className="me-2" />;
    }
  };

  return (
    <div className="container mt-4">
      <h2>🔔 Notificaciones</h2>
      {notifications.length === 0 ? (
        <p>No tienes notificaciones.</p>
      ) : (
        <ul className="list-group mt-3">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                notification.is_read ? "text-muted bg-light" : ""
              }`}
            >
              <div className="d-flex align-items-start">
                {getIcon(notification.type)}
                <div>
                  <p className="mb-1">{notification.message}</p>
                  <small>{formatDate(notification.date)}</small>
                </div>
              </div>
              {!notification.is_read && (
                <button
                  className="btn btn-sm btn-outline-success"
                  onClick={() => markAsRead(notification.id)}
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
