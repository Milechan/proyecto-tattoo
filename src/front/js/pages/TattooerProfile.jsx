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
  const [isEditing, setIsEditing] = useState(false);

  const [tattooer, setTattooer] = useState({
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

  const [galleryImages, setGalleryImages] = useState([g1, g2, g3, g4, g5, g6, g7]);
  const [likes, setLikes] = useState(Array(galleryImages.length).fill(false));

  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(null);

  const [newBanner, setNewBanner] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState(null);


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

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBanner(URL.createObjectURL(file)); // Vista previa local
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePic(URL.createObjectURL(file));
    }
  };

  const [editedName, setEditedName] = useState(tattooer.name);

  const [editedBio, setEditedBio] = useState(tattooer.bio);

  const [socialMedia, setSocialMedia] = useState({
    instagram: tattooer.social_media.instagram || "",
    x: "",
    whatsapp: "",
    facebook: ""
  });

  const handleDeleteImage = (index) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta imagen?");
    if (confirmDelete) {
      const updatedImages = [...galleryImages];
      updatedImages.splice(index, 1);
      setGalleryImages(updatedImages);
    }
  };

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageURL = URL.createObjectURL(file);
      setGalleryImages([...galleryImages, newImageURL]);
    }
  };



  return (
    <div className="profile-page">
      <div className="container-central">
        <div className="banner">
          <img src={newBanner || banner} alt="Banner" className="banner-img" />
          {isEditing && (
            <>
              <div className="banner-overlay" onClick={() => document.getElementById("bannerInput").click()}>
                <span>Cambiar banner</span>
              </div>
              <input
                type="file"
                id="bannerInput"
                accept="image/*"
                onChange={handleBannerChange}
                style={{ display: "none" }}
              />
            </>
          )}
          <div className="profile-picture-container">
            <img src={newProfilePic || perfil} alt="Tatuador" className="profile-picture" />
            {isEditing && (
              <>
                <div className="profile-picture-overlay" onClick={() => document.getElementById("profileInput").click()}>
                  <span>Cambiar foto de perfil</span>
                </div>
                <input
                  type="file"
                  id="profileInput"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  style={{ display: "none" }}
                />
              </>
            )}
          </div>
        </div>



        <div className="profile-details">
          <div className="profile-left">
            {isEditing ? (
              <input
                type="text"
                className="edit-input"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            ) : (
              <h2>{editedName}</h2>
            )}

            {isEditing ? (
              <textarea
                className="edit-textarea"
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
              />
            ) : (
              <p className="bio">{editedBio}</p>
            )}

            {isEditing ? (
              <div className="social-edit">
                {Object.entries(socialMedia).map(([key, value]) => (
                  <input
                    key={key}
                    type="text"
                    placeholder={`@${key}`}
                    value={value}
                    onChange={(e) =>
                      setSocialMedia({ ...socialMedia, [key]: e.target.value })
                    }
                    className="edit-input"
                  />
                ))}
              </div>
            ) : (
              <div className="social-icons">
                {Object.entries(socialMedia).map(([key, value]) => (
                  value && (
                    <div key={key} className={`icon ${key}`} title={`${key}: ${value}`}></div>
                  )
                ))}
              </div>
            )}

          </div>


          <div className="contact-section">
            <button className="contact-button">Contáctame aquí</button>
            <button className="edit-button" onClick={toggleEdit}>
              {isEditing ? "Guardar Cambios" : "Editar perfil"}
            </button>
          </div>
        </div>


        <div className="gallery">
          {galleryImages.map((img, index) => (
            <div className="card tattoo-card" key={index}>
              <div className="image-wrapper">
                <img
                  src={img}
                  className="card-img-top"
                  alt={`tattoo${index + 1}`}
                  onClick={() => openModal(index)}
                />
                {isEditing && (
                  <div className="delete-icon" onClick={() => handleDeleteImage(index)}>x</div>
                )}
              </div>
              <div className="card-body">
                <button className="like-button" onClick={() => toggleLike(index)}>
                  {likes[index] ? "❤️" : "🤍"}
                </button>
              </div>
            </div>
          ))}

          {isEditing && (
            <div className="card tattoo-card add-card">
              <label htmlFor="add-image" className="add-image-label">+</label>
              <input
                type="file"
                id="add-image"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAddImage}
              />
            </div>
          )}
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
          <div className="reviews-section container mt-5">
            <h3 className="text-center mb-4">Reseñas</h3>

            {[...Array(3)].map((_, i) => (
              <div className="card mb-3 shadow-sm" key={i}>
                <div className="card-body d-flex">
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="mb-0">Usuario {i + 1}</h6>
                      <small className="text-muted">Hace 2 días</small>
                    </div>
                    <div className="stars mb-2">
                      {"⭐".repeat(4)}{"☆".repeat(1)}
                    </div>
                    <p className="mb-0">
                      Genial experiencia con este tatuador.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default TattooerProfile;
