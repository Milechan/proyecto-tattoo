import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import "../../styles/TopLikes.css";
import Swal from 'sweetalert2';

export const TopLikes = () => {
  const [topPosts, setTopPosts] = useState([]);
  const [likesState, setLikesState] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTopPosts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/posts/top-likes");
        const data = await response.json();
        if (response.ok) {
          setTopPosts(data.slice(0, 3));

          if (token) {
            const likesData = {};
            await Promise.all(
              data.slice(0, 3).map(async (post) => {
                const res = await fetch(`http://localhost:3001/api/posts/${post.id}/liked`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                const likeRes = await res.json();
                likesData[post.id] = likeRes.liked;
              })
            );
            setLikesState(likesData);
          }
        }
      } catch (error) {
        console.error("Error al cargar posts:", error);
      }
    };

    fetchTopPosts();
  }, []);


  const toggleLike = async (postId) => {
    if (!token) {
      Swal.fire({
        title: "🔐 Inicia sesión",
        text: "Debes iniciar sesión o registrarte para dar like a este tatuaje.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Iniciar sesión",
        cancelButtonText: "Registrarse",
        confirmButtonColor: "#5c2d42",
        cancelButtonColor: "#8c3d5b",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          window.location.href = "/register";
        }
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/posts/${postId}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setTopPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, likes: data.likes } : post
          )
        );

        setLikesState((prev) => ({
          ...prev,
          [postId]: !prev[postId],
        }));
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al dar like",
          text: data.msg || "Ocurrió un problema al intentar dar like.",
          confirmButtonColor: "#5c2d42"
        });
      }
    } catch (err) {
      console.error("Error al conectar con backend:", err);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor.",
        confirmButtonColor: "#5c2d42"
      });
    }
  };


  const handleImageClick = (index) => {
    setSelectedImage(index);
    setShowModal(true);
  };

  const handleProfileClick = (postId) => {
    navigate(`/tattooer/${postId}`);
  };

  return (
    <div className="top-likes-container">
      <h1 className="title">❣️Top Tatuajes con Más Likes❣️</h1>

      <div className="card-wrapper">
        <div className="card-grid">
          {topPosts.map((post, index) => (
            <div key={post.id} className="tattoo-card">
              <div className="image-container" onClick={() => handleImageClick(index)}>
                <img src={post.image} alt={`Tatuaje ${index + 1}`} />
              </div>
              <div className="card-body">
                <p>Tatuaje #{index + 1}</p>
                <button
                  className={`like-button ${likesState[post.id] ? "liked" : ""}`}
                  onClick={() => toggleLike(post.id)}
                >
                  <FaHeart /> {post.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedImage !== null && (
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
                src={topPosts[selectedImage]?.image}
                alt={`Tatuaje ${selectedImage + 1}`}
                className="modal-image"
              />
              <div className="modal-details">
                <h2>Detalle del Tatuaje {selectedImage + 1}</h2>
                <p>{topPosts[selectedImage]?.description || "Sin descripción."}</p>
                <div className="modal-actions">
                  <button
                    className={`like-button ${likesState[topPosts[selectedImage]?.id] ? "liked" : ""}`}
                    onClick={() => toggleLike(topPosts[selectedImage]?.id)}
                  >
                    <FaHeart /> {topPosts[selectedImage]?.likes}
                  </button>
                  <button
                    className="profile-button px-3 ps-3"
                    onClick={() => handleProfileClick(topPosts[selectedImage]?.user_id)}
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
