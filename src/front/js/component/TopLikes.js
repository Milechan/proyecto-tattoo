import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import "../../styles/TopLikes.css";

export const TopLikes = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [likesState, setLikesState] = useState({
    1: { liked: false, likes: 1760 },
    2: { liked: false, likes: 3500 },
    3: { liked: false, likes: 4323 },
  });

  const navigate = useNavigate();

  const images = [
    "https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/minimalista/tatuador4/botanico+4.jpeg",
    "https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador4/Captura+de+pantalla+2025-04-11+190226.png",
    "https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/realismo/tatuador1/70f41ede5296246189fc7c711e04871c.jpg",
  ];

  const descriptions = [
    "Este tatuaje botánico minimalista es perfecto para quienes aman la naturaleza con un toque sutil y elegante.",
    "Inspirado en el mundo geek, este diseño destaca referencias icónicas de la gran serie anime 'Neon Genesis Evangelion' en una magnifica composición moderna.",
    "Realismo puro: cada detalle de este tatuaje parece cobrar vida gracias a una técnica impresionante.",
  ];

  const profileLinks = ["/tattooer/12", "/tattooer/8", "/tattooer/17"];

  const handleImageClick = (index) => {
    setSelectedImage(index);
    setShowModal(true);
  };

  const toggleLike = (index) => {
    setLikesState((prev) => ({
      ...prev,
      [index]: {
        liked: !prev[index].liked,
        likes: prev[index].liked ? prev[index].likes - 1 : prev[index].likes + 1,
      },
    }));
  };

  const handleProfileClick = () => {
    navigate(profileLinks[selectedImage - 1]);
  };

  return (
    <div className="top-likes-container">
      <h1 className="title"> ❣️Top Tatuajes con Más Likes❣️</h1>

      <div className="card-wrapper">
        <div className="card-grid">
          {[1, 2, 3].map((index) => (
            <div key={index} className="tattoo-card">
              <div className="image-container" onClick={() => handleImageClick(index)}>
                <img src={images[index - 1]} alt={`Tatuaje ${index}`} />
              </div>
              <div className="card-body">
                <p>Tatuaje #{index}</p>
                <button
                  className={`like-button ${likesState[index].liked ? "liked" : ""}`}
                  onClick={() => toggleLike(index)}
                >
                  <FaHeart /> {likesState[index].likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => setShowModal(false)}
              aria-label="Cerrar"
            >
              ×
            </button>

            <div className="modal-body">
              <img
                src={images[selectedImage - 1]}
                alt={`Tatuaje ${selectedImage}`}
                className="modal-image"
              />
              <div className="modal-details">
                <h2>Descripción del Tattoo {selectedImage}</h2>
                <p>{descriptions[selectedImage - 1]}</p>
                <div className="modal-actions">
                  <button
                    className={`like-button ${likesState[selectedImage].liked ? "liked" : ""}`}
                    onClick={() => toggleLike(selectedImage)}
                  >
                    <FaHeart /> {likesState[selectedImage].likes}
                  </button>
                  <button className="profile-button px-3 ps-3" onClick={handleProfileClick}>
                    Ver perfil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
