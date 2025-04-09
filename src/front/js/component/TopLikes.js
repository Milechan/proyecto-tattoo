import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import tatuaje3 from "../../img/tatuaje3.png";
import tatuaje4 from "../../img/tatuaje4.png";
import tatuaje5 from "../../img/tatuaje5.jpg";

export const TopLikes = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [likesState, setLikesState] = useState({
    1: { liked: false, likes: 1760 },
    2: { liked: false, likes: 3500 },
    3: { liked: false, likes: 4323 },
  });

  const images = [tatuaje3, tatuaje4, tatuaje5];

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
                src={images[index - 1]}
                className="card-img-top"
                alt={`Tatuaje ${index}`}
                onClick={() => handleImageClick(index)}
                style={{ cursor: "pointer" }}
              />
              <div className="card-body">
                <p className="card-text text-white">Descripción del tatuaje #{index}</p>
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

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content position-relative">
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
                    className={`btn ${likesState[selectedImage]?.liked ? "btn-danger" : "btn-outline-danger"} mt-3`}
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