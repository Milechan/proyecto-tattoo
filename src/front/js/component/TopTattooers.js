import React, { useState } from "react";
import "../../styles/toptattooers.css";

export const TopTattooers = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    "https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/black-out/tatuador4/DALL%C2%B7E+2025-04-12+20.30.29+-+Solid+black+blackout+tattoo+design+on+uncommon+body+parts+like+the+side+of+the+neck%2C+back+of+the+hand%2C+upper+thighs%2C+lower+calves%2C+abdomen%2C+or+shoulde.webp",
    "https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/perfiles+de+tatuadores/geeks/tatuador1/Captura+de+pantalla+2025-04-11+185746.png",
    "https://matchtattoo.s3.us-east-2.amazonaws.com/imagenes-estaticas/home/top+likes/topLikes3.png",
  ];

  const handleImageClick = (image) => {
    setSelectedImage(images.indexOf(image));
    setShowModal(true);
  };

  return (
    <div className="top-tattooers-container">
      <h1 className="tattooers-title">Tatuadores mejor calificados</h1>

      <div id="carouselExample" className="carousel slide tattoo-carousel" data-bs-ride="carousel">
        <div className="carousel-inner">
          {images.map((image, idx) => (
            <div
              key={idx}
              className={`carousel-item ${idx === 0 ? "active" : ""}`}
            >
              <img
                src={image}
                alt={`Tatuaje ${idx + 1}`}
                className="carousel-image"
                onClick={() => handleImageClick(image)}
              />
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      {showModal && (
        <div className="custom-modal-backdrop">
          <div className="custom-modal">
            <button className="btn-close custom-close" onClick={() => setShowModal(false)}></button>

            <div className="custom-modal-body">
              <img
                src={images[selectedImage]}
                alt={`Tatuaje ${selectedImage + 1}`}
                className="custom-modal-img"
              />
              <div className="custom-modal-description">
                <h5>Detalle del Tatuador</h5>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum.
                </p>
                <button className="btn btn-danger mt-3">Ver perfil</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
