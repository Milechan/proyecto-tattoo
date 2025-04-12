import React, { useState, useEffect } from "react";
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
import { FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";


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

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    description: '',
    rating: 5
  });
  const [hoveredStar, setHoveredStar] = useState(null);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
      setNewBanner(URL.createObjectURL(file));
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


  const [showModal, setShowModal] = useState(false);
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");


  const handleSendEmail = async () => {
    if (!contactEmail || !contactMessage) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "milena.concha.m@gmail.com",
          subject: `Nuevo mensaje de ${contactEmail}`,
          message: contactMessage
        })
      });

      const data = await response.json();
      if (response.ok) {
        alert("¡Mensaje enviado con éxito!");
        setShowModal(false);
        setContactEmail("");
        setContactMessage("");
      } else {
        alert(`Error: ${data.msg || data.error}`);
      }
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      alert("Ocurrió un error al enviar el mensaje.");
    }
  };



  useEffect(() => {
    if (showModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [showModal]);


  // para cargar reviews 
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const tattooerId = window.location.pathname.split('/').pop();
        const response = await fetch(`http://localhost:3001/api/review/${tattooerId}?page=${currentPage}`);
        const data = await response.json();

        if (response.ok) {
          setReviews(data);
        } else {
          console.error('Error al cargar reviews:', data.msg);
        }
      } catch (error) {
        console.error('Error de conexión:', error);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [currentPage]);

  // para enviar nueva review
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setIsSubmittingReview(true);

    try {
      const tattooerId = window.location.pathname.split('/').pop();
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:3001/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          description: newReview.description,
          rating: newReview.rating,
          tattooer_id: tattooerId
        })
      });

      const data = await response.json();

      if (response.ok) {
        setReviews([data, ...reviews]);
        setNewReview({ description: '', rating: 5 });
        setShowSuccessModal(true);
      } else {
        alert(data.msg || 'Error al enviar la reseña');
      }
    } catch (error) {
      console.error('Error al enviar reseña:', error);
      alert('Error de conexión al enviar la reseña');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState("Descripción de la imagen o galería que quieras mostrar aquí."); // valor inicial
  const isTattooer = true; //temporal hasta que se conecte con back

  const styles = {
    reviewsContainer: {
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '1.5rem',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
      '@media (max-width: 768px)': {
        padding: '1rem'
      }
    },
    reviewFormCard: {
      backgroundColor: '#fafafa',
      border: '1px solid #eee',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '2rem',
      '@media (max-width: 768px)': {
        padding: '1rem'
      }
    },
    starRatingContainer: {
      display: 'flex',
      gap: '0.5rem',
      margin: '1rem 0',
      justifyContent: 'center'
    },
    star: {
      fontSize: '1.8rem',
      color: '#ddd',
      cursor: 'pointer',
      transition: 'transform 0.2s, color 0.2s',
      ':hover': {
        transform: 'scale(1.2)'
      }
    },
    filledStar: {
      color: '#ffc107',
      textShadow: '0 0 8px rgba(255, 193, 7, 0.5)'
    },
    reviewTextarea: {
      minHeight: '120px',
      width: '100%',
      borderRadius: '8px',
      border: '1px solid #e0e0e0',
      padding: '1rem',
      marginBottom: '1rem',
      resize: 'vertical'
    },
    reviewCard: {
      borderLeft: '4px solid #5c2d42',
      marginBottom: '1.5rem',
      transition: 'all 0.3s ease',
      ':hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
      }
    },
    reviewHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.5rem',
      '@media (max-width: 480px)': {
        flexDirection: 'column',
        alignItems: 'flex-start'
      }
    },
    reviewRating: {
      color: '#ffc107',
      letterSpacing: '2px',
      fontSize: '1.2rem'
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
            <button className="contact-button" onClick={() => setShowModal(true)}>
              Contáctame aquí
            </button>

            {showModal && (
              <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <div className="modal-dialog">
                  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                      <h5 className="modal-title">Enviar mensaje al tatuador</h5>
                      <button
                        type="button"
                        className="close btn-close"
                        onClick={() => setShowModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form>
                        <div className="mb-3">
                          <label htmlFor="contactEmail" className="form-label">
                            Tu correo
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="contactEmail"
                            placeholder="tucorreo@correo.com"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="contactMessage" className="form-label">
                            Tu mensaje
                          </label>
                          <textarea
                            className="form-control"
                            id="contactMessage"
                            rows="4"
                            placeholder="Escribe tu mensaje..."
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                          ></textarea>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button className="btn cancel" onClick={() => setShowModal(false)}>
                        Cancelar
                      </button>
                      <button className="btn send" onClick={handleSendEmail}>
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}



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
            {modalImageIndex > 0 && (
              <button
                className="modal-arrow left-arrow"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalImageIndex(modalImageIndex - 1);
                }}
              >
                &#10094;
              </button>
            )}

            {modalImageIndex < galleryImages.length - 1 && (
              <button
                className="modal-arrow right-arrow"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalImageIndex(modalImageIndex + 1);
                }}
              >
                &#10095;
              </button>
            )}
            <div className="custom-modal-container" onClick={(e) => e.stopPropagation()}>
              <div className="row g-0">

                <div className="col-md-5 modal-description-container p-4">
                  <h5 className="modal-tattooer-name">Juan Tattoo</h5>
                  {isEditingDescription ? (
                    <div className="description-editor">
                      <textarea
                        className="edit-textarea"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                      />
                      <button
                        className="save-description"
                        onClick={() => setIsEditingDescription(false)}
                      >
                        Guardar
                      </button>
                    </div>
                  ) : (
                    <p className="modal-description">{editedDescription}</p>
                  )}


                  <button
                    className="like-button modal-like"
                    onClick={() => toggleLike(modalImageIndex)}
                  >
                    {likes[modalImageIndex] ? "❤️" : "🤍"}
                  </button>
                </div>


                <div className="col-md-7 d-flex align-items-center justify-content-center modal-image-wrapper">
                  <img
                    src={galleryImages[modalImageIndex]}
                    alt="Imagen ampliada"
                    className="modal-image"
                  />
                </div>
              </div>

              <button className="close btn-close position-absolute top-0 end-0 m-3" onClick={closeModal}></button>
              {isTattooer && !isEditingDescription && (
                <FiEdit2
                  className="edit-description-icon"
                  title="Editar descripción"
                  onClick={() => setIsEditingDescription(true)}
                />
              )}


            </div>
          </div>
        )}



        <div className="extras">
          <div style={styles.reviewsContainer}>
            <h3 style={{
              textAlign: 'center',
              marginBottom: '2rem',
              color: '#5c2d42',
              fontSize: '1.8rem'
            }}>
              Reseñas
            </h3>

            {/* Formulario para nueva reseña */}
            {localStorage.getItem('token') ? (
              <div style={styles.reviewFormCard}>
                <h5 style={{ marginBottom: '1rem', color: '#333' }}>Deja tu reseña</h5>
                <form onSubmit={handleSubmitReview}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500'
                    }}>
                      Calificación
                    </label>
                    <div style={styles.starRatingContainer}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          style={{
                            ...styles.star,
                            ...(star <= (hoveredStar || newReview.rating) && styles.filledStar
                            )
                          }}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(null)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <textarea
                      style={styles.reviewTextarea}
                      rows="4"
                      placeholder="Describe tu experiencia (mínimo 20 caracteres)..."
                      value={newReview.description}
                      onChange={(e) => setNewReview({ ...newReview, description: e.target.value })}
                      required
                      minLength="20"
                      maxLength="500"
                    />
                    <div style={{
                      fontSize: '0.8rem',
                      color: '#666',
                      textAlign: 'right'
                    }}>
                      {newReview.description.length}/500 caracteres
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#8c3d5b',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.75rem 1.5rem',
                      color: 'white',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s',
                      opacity: isSubmittingReview || newReview.description.length < 20 ? 0.7 : 1,
                      ':hover': {
                        backgroundColor: '#5c2d42'
                      }
                    }}
                    disabled={isSubmittingReview || newReview.description.length < 20}
                  >
                    {isSubmittingReview ? (
                      <>
                        <span
                          style={{
                            display: 'inline-block',
                            width: '1rem',
                            height: '1rem',
                            border: '2px solid transparent',
                            borderTopColor: 'white',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            marginRight: '0.5rem'
                          }}
                        />
                        Enviando...
                      </>
                    ) : 'Enviar Reseña'}
                  </button>
                </form>
              </div>
            ) : (
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                <Link to="/login" style={{ color: '#8c3d5b', textDecoration: 'none' }}>
                  Inicia sesión
                </Link> para dejar una reseña
              </div>
            )}

            {/* Lista de reseñas */}
            {isLoadingReviews ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <div
                  style={{
                    display: 'inline-block',
                    width: '2rem',
                    height: '2rem',
                    border: '0.25rem solid #f3f3f3',
                    borderTop: '0.25rem solid #5c2d42',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}
                />
              </div>
            ) : reviews.length === 0 ? (
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '1.5rem',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                Este tatuador aún no tiene reseñas. ¡Sé el primero en opinar!
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} style={styles.reviewCard}>
                  <div style={{ padding: '1.5rem' }}>
                    <div style={styles.reviewHeader}>
                      <div>
                        <h6 style={{
                          margin: 0,
                          fontWeight: '600',
                          color: '#333'
                        }}>
                          {review.user?.name || 'Usuario anónimo'}
                        </h6>
                        <small style={{ color: '#777', fontSize: '0.85rem' }}>
                          {new Date(review.created_at).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </small>
                      </div>
                      <div style={styles.reviewRating}>
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </div>
                    </div>
                    <p style={{
                      margin: '1rem 0 0',
                      color: '#555',
                      lineHeight: '1.6'
                    }}>
                      {review.description}
                    </p>
                  </div>
                </div>
              ))
            )}

            {/* Paginación */}
            {reviews.length >= 5 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '2rem',
                gap: '0.5rem'
              }}>
                <button
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid #5c2d42',
                    backgroundColor: 'transparent',
                    color: '#5c2d42',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    ':disabled': {
                      opacity: 0.5,
                      cursor: 'not-allowed'
                    }
                  }}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
                <span style={{
                  padding: '0.5rem 1rem',
                  alignSelf: 'center'
                }}>
                  Página {currentPage}
                </span>
                <button
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid #5c2d42',
                    backgroundColor: 'transparent',
                    color: '#5c2d42',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    ':disabled': {
                      opacity: 0.5,
                      cursor: 'not-allowed'
                    }
                  }}
                  onClick={() => setCurrentPage(p => p + 1)}
                  disabled={reviews.length < 5}
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TattooerProfile;
