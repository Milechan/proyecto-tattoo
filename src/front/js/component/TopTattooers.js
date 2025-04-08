import React, { useState } from "react";
import g2 from "../../img/g2.webp";
import g3 from "../../img/g3.webp";
import g6 from "../../img/g6.webp";
import "../../styles/TopTattooers.css";

export const TopTattooers = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [g2, g3, g6];

  const handleImageClick = (image) => {
    setSelectedImage(images.indexOf(image) + 1);
    setShowModal(true);
  };

  return (
    <div className="top-tattooers-container text-center">
      <h1>Top de tatuadores</h1>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide mx-auto tattoo-carousel-container"
        data-bs-ride="carousel"
        style={{
          maxWidth: "700px",
          height: "500px",
        }}
      >
        <div className="carousel-inner" style={{ height: "100%" }}>
          <div className="carousel-item active" style={{ height: "100%" }}>
            <img
              src={g2}
              className="d-block w-100 carousel-image"
              alt="Tatuaje g2"
              onClick={() => handleImageClick(g2)}
              style={{ height: "100%", objectFit: "cover" }} 
            />
          </div>
          <div className="carousel-item" style={{ height: "100%" }}>
            <img
              src={g3}
              className="d-block w-100 carousel-image"
              alt="Tatuaje g3"
              onClick={() => handleImageClick(g3)}
              style={{ height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="carousel-item" style={{ height: "100%" }}>
            <img
              src={g6}
              className="d-block w-100 carousel-image"
              alt="Tatuaje g6"
              onClick={() => handleImageClick(g6)}
              style={{ height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
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
                <h5 className="modal-title text-white">Detalle del Tatuaje</h5>
              </div>

              <div className="modal-body d-flex">
                <img
                  src={images[selectedImage - 1]}
                  alt={`Tatuaje ${selectedImage}`}
                  className="img-fluid w-100"
                  style={{ maxHeight: "70vh", objectFit: "contain" }}
                />
                <div className="ms-3">
                  <p className="text-white">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum.
                  </p>
                  <button
                    className="btn btn-danger mt-3"
                  >
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
