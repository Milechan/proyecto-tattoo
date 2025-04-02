import React, { useState } from "react";
import tatuaje2 from "../../img/tatuaje2.webp";

export const TopTattooers = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = () => {
    setSelectedImage(tatuaje2);
    setShowModal(true);
  };

  return (
    <div className="text-center mt-5">
      <div className="container">
        <h1>Top de tatuadores</h1>
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide mx-auto"
          data-bs-ride="carousel"
          style={{ maxWidth: "500px" }} // 👈 Reduce el tamaño del carrusel
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={tatuaje2} className="d-block w-100" alt="Tatuaje" onClick={handleImageClick} style={{ cursor: "pointer" }} />
            </div>
            <div className="carousel-item">
              <img src={tatuaje2} className="d-block w-100" alt="Tatuaje" onClick={handleImageClick} style={{ cursor: "pointer" }} />
            </div>
            <div className="carousel-item">
              <img src={tatuaje2} className="d-block w-100" alt="Tatuaje" onClick={handleImageClick} style={{ cursor: "pointer" }} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content position-relative">
              {/* Botón para cerrar el modal */}
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
                <h5 className="modal-title">Información del Tatuador</h5>
              </div>

              <div className="modal-body d-flex">
                <img src={selectedImage} alt="Tatuaje" className="img-fluid w-50" />
                <div className="ms-3">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum.
                  </p>
                  {/* Botón "Ver perfil" */}
                  <button className="btn btn-primary mt-3">Ver perfil</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
