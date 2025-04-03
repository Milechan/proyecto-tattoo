import React, { useState } from "react";
import { FaHeart } from "react-icons/fa"; // Ícono de corazón
import tatuaje from "../../img/tatuaje.webp";

export const TopLikes = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [likesState, setLikesState] = useState({
    1: { liked: false, likes: 1760 },  // Imagen 1 con 1760 likes iniciales
    2: { liked: false, likes: 3500 },  // Imagen 2 con 3500 likes iniciales
    3: { liked: false, likes: 4323 },  // Imagen 3 con 4323 likes iniciales
  });

  const handleImageClick = (index) => {
    setSelectedImage(index);
    setShowModal(true);
  };

  const toggleLike = (index) => {
    setLikesState((prevLikes) => ({
      ...prevLikes,
      [index]: {
        liked: !prevLikes[index]?.liked,
        likes: prevLikes[index]?.liked ? prevLikes[index].likes - 1 : (prevLikes[index]?.likes || 0) + 1,
      },
    }));
  };

  return (
    <div className="text-center mt-5">
      <div className="container">
        <h1>Top de Likes</h1>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {[1, 2, 3].map((index) => (
            <div key={index} className="card" style={{ width: "18rem" }}>
              <img
                src={tatuaje}
                className="card-img-top"
                alt="Tatuaje"
                onClick={() => handleImageClick(index)}
                style={{ cursor: "pointer" }}
              />
              <div className="card-body">
                <p className="card-text">Descripción del tatuaje #{index}</p>
                {/* Botón de Like en la card */}
                <button
                  className={`btn ${likesState[index]?.liked ? "btn-danger" : "btn-outline-danger"}`}
                  onClick={() => toggleLike(index)}
                >
                  <FaHeart /> {likesState[index]?.likes || 0}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Bootstrap */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content position-relative">
              {/* Botón de cierre en la esquina superior derecha DEL MODAL */}
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  zIndex: 10,
                }}
              ></button>

              <div className="modal-header">
                <h5 className="modal-title">Detalle del Tatuaje</h5>
              </div>

              <div className="modal-body d-flex">
                <img src={tatuaje} alt="Tatuaje" className="img-fluid w-50" />
                <div className="ms-3">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum.
                  </p>
                  {/* Botón de Like dentro del modal */}
                  <button
                    className={`btn ${likesState[selectedImage]?.liked ? "btn-danger" : "btn-outline-danger"}`}
                    onClick={() => toggleLike(selectedImage)}
                  >
                    <FaHeart /> {likesState[selectedImage]?.likes || 0}
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
