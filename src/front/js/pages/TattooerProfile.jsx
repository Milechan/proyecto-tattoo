import React, { useState } from "react";
import "../../styles/TattooerProfile.css";
import banner from "../../img/banner.webp";
import perfil from "../../img/perfil.webp";
import g1 from "../../img/g1.webp";
import g2 from "../../img/g2.webp";
import g3 from "../../img/g3.webp";
import g4 from "../../img/g4.webp";
import g5 from "../../img/g5.webp";
import g6 from "../../img/g6.webp";
import g7 from "../../img/g7.webp";

const TattooerProfile = () => {
  const [tattooer] = useState({
    name: "Juan Tattoo",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    profile_picture: "",
    email: "juan@example.com",
    username: "juantattoo",
    ranking: 5,
    created_at: "2025-03-30T22:51:14Z",
    social_media: {
      instagram: "@juantattoo"
    }
  });

  const galleryImages = [g1, g2, g3, g4, g5, g6, g7];
  const [likes, setLikes] = useState(Array(galleryImages.length).fill(false));

  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(null);

  const toggleLike = (index) => {
    const updatedLikes = [...likes];
    updatedLikes[index] = !updatedLikes[index];
    setLikes(updatedLikes);
  };

  const openModal = (index) => {
    setModalImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImageIndex(null);
  };

  return (
    <div className="profile-page">
      <div className="banner">
        <img src={banner} alt="Banner" className="banner-img" />
        <div className="profile-picture-container">
          <img src={perfil} alt="Tatuador" className="profile-picture" />
        </div>
      </div>

      <div className="profile-details">
        <div className="profile-left">
          <h2>{tattooer.name}</h2>
          <p className="bio">{tattooer.bio}</p>

          <div className="social-icons">
            <div className="icon facebook"></div>
            <div className="icon instagram"></div>
            <div className="icon twitter"></div>
          </div>
        </div>

        <div className="contact-section">
          <button className="contact-button">Contáctame aquí</button>
        </div>
      </div>


      <div className="gallery">
        {galleryImages.map((img, index) => (
          <div className="card tattoo-card" key={index}>
            <img
              src={img}
              className="card-img-top"
              alt={`tattoo${index + 1}`}
              onClick={() => openModal(index)}
              style={{ cursor: "pointer" }}
            />
            <div className="card-body">
              <button className="like-button" onClick={() => toggleLike(index)}>
                {likes[index] ? "❤️" : "🤍"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={closeModal}>
              ✖
            </span>
            <img
              src={galleryImages[modalImageIndex]}
              alt="Imagen ampliada"
              className="modal-image"
            />
            <button
              className="like-button modal-like"
              onClick={() => toggleLike(modalImageIndex)}
            >
              {likes[modalImageIndex] ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      )}

      <div className="extras">
        <div className="location">
          <h3>Ubicación</h3>
          <p>📍</p>
        </div>
        <div className="comments">
          <h3>Sección de comentarios</h3>
          <p>💬</p>
        </div>
      </div>
    </div>
  );
};

export default TattooerProfile;
