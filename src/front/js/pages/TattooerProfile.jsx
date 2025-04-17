import React, { useState, useEffect, useContext } from "react";
import "../../styles/TattooerProfile.css";
import perfil from "../../img/perfil.webp";
import g1 from "../../img/g1.webp";
import g2 from "../../img/g2.webp";
import g3 from "../../img/g3.webp";
import g4 from "../../img/g4.webp";
import g5 from "../../img/g5.webp";
import g6 from "../../img/g6.webp";
import g7 from "../../img/g7.webp";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { FaInstagram, FaFacebookF, FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";




const TattooerProfile = () => {
  const { id } = useParams()
  const { actions, store } = useContext(Context)
  const [isEditing, setIsEditing] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [newPostImage, setNewPostImage] = useState(null);
  const [newPostDescription, setNewPostDescription] = useState("");
  const [isSubmittingPost, setIsSubmittingPost] = useState(false);
  const [profileNotFound, setProfileNotFound] = useState(false);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });
  const [tempLat, setTempLat] = useState(null);
  const [tempLng, setTempLng] = useState(null);
  const [locationText, setLocationText] = useState(store.profile.location_text || "");
  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.status === "OK" && data.results.length > 0) {
        setLocationText(data.results[0].formatted_address);
      }
    } catch (error) {
      console.error("Error al obtener dirección desde coordenadas:", error);
    }
  };


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3001/api/profile/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }

        });

        const data = await response.json();

        if (response.ok) {
          if (data && data.id) {
            actions.changeProfile(data);
            setProfileNotFound(false);
          } else {
            setProfileNotFound(true);
          }
        } else {
          setProfileNotFound(true);
        }
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
        setProfileNotFound(true);
        Swal.fire({
          icon: "error",
          title: "Error de conexión",
          text: "No se pudo cargar el perfil. Intenta nuevamente más tarde.",
          confirmButtonColor: "#5c2d42"
        });
      }

    };

    fetchProfile();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);


  const handleAddPost = async () => {
    if (!newPostImage || !newPostDescription) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos del post.",
        confirmButtonColor: "#5c2d42"
      });
      return;
    }


    try {
      const file64 = await getBase64(newPostImage);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          image: file64,
          description: newPostDescription
        })
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Post creado!',
          text: 'Tu post se ha subido correctamente.',
          confirmButtonColor: '#5c2d42'
        });
        setShowCreatePostModal(false);
        setNewPostDescription("");
        setNewPostImage(null);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el post',
          text: data.msg || 'Ocurrió un problema al intentar crear el post.',
          confirmButtonColor: '#5c2d42'
        });
      }

    } catch (error) {
      console.error("Error al crear post:", error);
      Swal.fire({
        icon: "error",
        title: "Error inesperado",
        text: "Ocurrió un error al crear el post.",
        confirmButtonColor: "#5c2d42"
      });
    }

  };

  const handleDeletePost = async (postId) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el post permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#5c2d42",
      cancelButtonColor: "#999",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== postId));
        Swal.fire({
          icon: "success",
          title: "¡Post eliminado!",
          text: "El post fue eliminado correctamente.",
          confirmButtonColor: "#5c2d42"
        });
      } else {
        const data = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error al eliminar",
          text: data.msg || "Error al eliminar el post.",
          confirmButtonColor: "#5c2d42"
        });
      }
    } catch (error) {
      console.error("Error al eliminar post:", error);
      Swal.fire({
        icon: "error",
        title: "Error inesperado",
        text: "Ocurrió un error al eliminar el post.",
        confirmButtonColor: "#5c2d42"
      });
    }
  };





  const [tattooer, setTattooer] = useState({
    name: "Juan Tattoo",
    bio: store.profile.bio,
    profile_picture: "",
    email: "juan@example.com",
    username: "juantattoo",
    ranking: 5,
    created_at: "2025-03-30T22:51:14Z",
    social_media: {
      instagram: "@juantattoo",
      x: "",
      wsp: "",
      facebook: ""
    }
  });



  const [galleryImages, setGalleryImages] = useState([g1, g2, g3, g4, g5, g6, g7]);
  const [likes, setLikes] = useState({});


  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(null);

  const [newBanner, setNewBanner] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    description: '',
    rating: 5
  });
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(true);
  const [hoveredStar, setHoveredStar] = useState(null);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const toggleLike = async (index) => {
    const postId = posts[index]?.id;
    const token = localStorage.getItem("token");
    if (!postId || !token) return;

    try {
      const response = await fetch(`http://localhost:3001/api/posts/${postId}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        const updatedPosts = [...posts];
        updatedPosts[index].likes = data.likes;
        setPosts(updatedPosts);

        setLikes((prev) => ({
          ...prev,
          [postId]: !prev[postId]
        }));
      } else {
        console.error("Error al dar like/dislike:", data.msg);
        Swal.fire({
          icon: "error",
          title: "No se pudo registrar tu reacción",
          text: data.msg || "Ocurrió un error al intentar dar like/dislike.",
          confirmButtonColor: "#5c2d42"
        });
      }

    } catch (err) {
      console.error("Error al conectar con backend:", err);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor para registrar tu reacción.",
        confirmButtonColor: "#5c2d42"
      });
    }

  };


  useEffect(() => {
    const checkLikes = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const newLikes = {};
      await Promise.all(
        posts.map(async (post) => {
          try {
            const response = await fetch(`http://localhost:3001/api/posts/${post.id}/liked`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            newLikes[post.id] = data.liked;
          } catch (e) {
            console.error("Error verificando likes:", e);
            Swal.fire({
              icon: "error",
              title: "Error al verificar likes",
              text: "No se pudo obtener la información de likes para las publicaciones.",
              confirmButtonColor: "#5c2d42"
            });
          }

        })
      );
      setLikes(newLikes);
    };

    if (posts.length > 0) checkLikes();
  }, [posts]);




  const openModal = (index) => {
    setModalImageIndex(index);
    setModalOpen(true);
    setEditedDescription(posts[index]?.description || "");
    setIsEditingDescription(false);
  };


  const closeModal = () => {
    setModalOpen(false);
    setModalImageIndex(null);
  };

  const toggleEdit = async () => {
    if (isEditing) {
      await handleEditProfile(id)
    }
    setIsEditing(!isEditing);
  };
  const handleUpdateDescription = async () => {
    try {
      const token = localStorage.getItem("token");
      const postId = posts[modalImageIndex]?.id;

      const response = await fetch(`http://localhost:3001/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          image: posts[modalImageIndex]?.image,
          description: editedDescription
        })
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Descripción actualizada",
          text: "La descripción se guardó correctamente.",
          confirmButtonColor: "#5c2d42"
        });

        const updatedPosts = [...posts];
        updatedPosts[modalImageIndex].description = editedDescription;
        setPosts(updatedPosts);

        setIsEditingDescription(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al actualizar",
          text: data.msg || "No se pudo actualizar la descripción.",
          confirmButtonColor: "#5c2d42"
        });
      }

    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error inesperado",
        text: "Ocurrió un error al editar el post.",
        confirmButtonColor: "#5c2d42"
      });
    }

  };


  const handleContactClick = () => {
    if (!currentUserInfo) {
      Swal.fire({
        title: "🔐 Necesitas iniciar sesión",
        text: "Debes iniciar sesión o registrarte para contactar al tatuador.",
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
    } else {
      setShowModal(true);
    }
  };

  const handleBannerChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      const base64 = await getBase64(file);
      setNewBanner(preview);
      setNewBannerBase64(base64);
    }
  };


  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePic(URL.createObjectURL(file));
      const file64 = await getBase64(file)
      setTattooer({
        ...tattooer,
        profile_picture: file64
      })
    }
  };

  const [newBannerBase64, setNewBannerBase64] = useState("");




  const [editedName, setEditedName] = useState(tattooer.name);

  const [editedBio, setEditedBio] = useState(tattooer.bio);

  const [socialMedia, setSocialMedia] = useState({
    instagram: store.profile.social_media_insta || "",
    facebook: store.profile.social_media_facebook || "",
    whatsapp: store.profile.social_media_wsp || "",
    x: store.profile.social_media_x || ""
  });



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


  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleSendEmail = async () => {
    if (!contactEmail || !contactMessage) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos antes de enviar.",
        confirmButtonColor: "#5c2d42"
      });
      return;
    }

    if (!store.profile.email) {
      Swal.fire({
        icon: "error",
        title: "Sin correo destino",
        text: "El tatuador no tiene correo registrado.",
        confirmButtonColor: "#5c2d42"
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: store.profile.email,
          subject: `Nuevo mensaje de ${contactEmail}`,
          message: `
        ¡Hola!
        
        Has recibido un nuevo mensaje a través de MatchTattoo 📩
        
        🧑 Nombre de quien escribe: ${contactEmail}
        💬 Mensaje:
        ${contactMessage}
        
        Puedes responder directamente a este correo para ponerte en contacto con la persona interesada.
        
        —
        Este mensaje fue enviado automáticamente desde la plataforma MatchTattoo.
        `
        })

      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Mensaje enviado!",
          text: "Tu mensaje ha sido enviado con éxito al tatuador.",
          confirmButtonColor: "#5c2d42"
        });
        setShowModal(false);
        setContactEmail("");
        setContactMessage("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al enviar",
          text: data.msg || data.error || "Ocurrió un error al enviar el mensaje.",
          confirmButtonColor: "#5c2d42"
        });
      }

    } catch (error) {
      console.error("Error al enviar el correo:", error);
      Swal.fire({
        icon: "error",
        title: "Error inesperado",
        text: "Ocurrió un error al enviar el mensaje.",
        confirmButtonColor: "#5c2d42"
      });
    }
  };



  const handleEditProfile = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          bio: editedBio,
          social_media_insta: socialMedia.instagram,
          social_media_wsp: socialMedia.whatsapp,
          social_media_x: socialMedia.x,
          social_media_facebook: socialMedia.facebook,
          profile_picture: tattooer.profile_picture,
          banner: newBannerBase64,
          latitude: tempLat ?? null,
          longitude: tempLng ?? null,
          location_text: locationText?.trim() || null
        })

      });

      const data = await response.json();

      if (response.ok) {
        actions.changeProfile(data);
        setTempLat(parseFloat(data.latitude));
        setTempLng(parseFloat(data.longitude));
        setLocationText(data.location_text || "");

        Swal.fire({
          icon: "success",
          title: "Perfil actualizado",
          text: "Tu perfil fue actualizado correctamente.",
          confirmButtonColor: "#5c2d42"
        });

        await actions.getProfile(userId);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al guardar",
          text: data.msg || "No se pudo guardar el perfil.",
          confirmButtonColor: "#5c2d42"
        });
      }

    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      Swal.fire({
        icon: "error",
        title: "Error inesperado",
        text: "Ocurrió un error al actualizar el perfil.",
        confirmButtonColor: "#5c2d42"
      });
    }
  };



  const renderSocialIcons = () => {
    return (
      <div className="social-icons">
        {socialMedia.instagram && (
          <a
            href={socialMedia.instagram}
            className="social-link instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        )}
        {socialMedia.facebook && (
          <a
            href={socialMedia.facebook}
            className="social-link facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
        )}
        {socialMedia.x && (
          <a
            href={socialMedia.x}
            className="social-link x"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter />
          </a>
        )}
        {socialMedia.whatsapp && (
          <a
            href={socialMedia.whatsapp}
            className="social-link whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </a>
        )}
      </div>
    );
  };


  useEffect(() => {
    if (showModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    actions.getProfile(id)
  }, [showModal, id]);


  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          setIsLoadingUserInfo(true);
          const response = await fetch('http://localhost:3001/api/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();

          if (response.ok) {

            setCurrentUserInfo({
              id: data.user.id,
              userTypeId: data.user.user_type_id
            });
          }
        } catch (error) {
          console.error("Error al obtener información del usuario:", error);
          Swal.fire({
            icon: "error",
            title: "Error de autenticación",
            text: "No se pudo obtener la información del usuario.",
            confirmButtonColor: "#5c2d42"
          });
        }
        finally {
          setIsLoadingUserInfo(false);
        }
      } else {
        setIsLoadingUserInfo(false);
      }
    };

    fetchCurrentUser();
  }, []);


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
          Swal.fire({
            icon: "error",
            title: "Error al cargar reseñas",
            text: data.msg || "Hubo un problema al obtener las reseñas.",
            confirmButtonColor: "#5c2d42"
          });
        }
      } catch (error) {
        console.error('Error de conexión:', error);
        Swal.fire({
          icon: "error",
          title: "Error de conexión",
          text: "No se pudo conectar con el servidor para obtener las reseñas.",
          confirmButtonColor: "#5c2d42"
        });
      }
      finally {
        setIsLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [currentPage]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/posts`);
        const data = await response.json();
        if (response.ok) {
          const userPosts = data.filter(post => post.user_id == id);
          setPosts(userPosts);
        } else {
          console.error("Error al obtener posts:", data.msg);
          Swal.fire({
            icon: "error",
            title: "Error al obtener posts",
            text: data.msg || "No se pudieron cargar los posts del tatuador.",
            confirmButtonColor: "#5c2d42"
          });
        }
      } catch (error) {
        console.error("Error al conectar con el backend:", error);
        Swal.fire({
          icon: "error",
          title: "Error de conexión",
          text: "No se pudo conectar con el servidor para obtener los posts.",
          confirmButtonColor: "#5c2d42"
        });
      }

    };

    fetchPosts();
  }, [id, showCreatePostModal]);

  useEffect(() => {
    if (posts.length === 0) return;

    const fetchLikes = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const likesArray = await Promise.all(
          posts.map(async (post) => {
            const res = await fetch(`http://localhost:3001/api/posts/${post.id}/liked`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            return { postId: post.id, liked: data.liked };
          })
        );

        const newLikes = {};
        likesArray.forEach(({ postId, liked }) => {
          newLikes[postId] = liked;
        });

        setLikes(newLikes);
      } catch (error) {
        console.error("Error al cargar likes:", error);
        Swal.fire({
          icon: "error",
          title: "Error al cargar likes",
          text: "Ocurrió un problema al obtener los likes de los posts.",
          confirmButtonColor: "#5c2d42"
        });
      }

    };

    fetchLikes();
  }, [posts]);




  useEffect(() => {
    if (store.profile) {
      setSocialMedia({
        instagram: store.profile.social_media_insta || "",
        facebook: store.profile.social_media_facebook || "",
        whatsapp: store.profile.social_media_wsp || "",
        x: store.profile.social_media_x || ""
      });
    }
  }, [store.profile]);

  useEffect(() => {
    if (!isEditing) return;

    setEditedBio(store.profile.bio || "");
    setEditedName(store.profile.profile_name || "");
    setSocialMedia({
      instagram: store.profile.social_media_insta || "",
      facebook: store.profile.social_media_facebook || "",
      whatsapp: store.profile.social_media_wsp || "",
      x: store.profile.social_media_x || ""
    });
    setTempLat(store.profile.latitude ? parseFloat(store.profile.latitude) : null);
    setTempLng(store.profile.longitude ? parseFloat(store.profile.longitude) : null);
    setLocationText(store.profile.location_text || "");

  }, [isEditing]);



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
        Swal.fire({
          icon: "error",
          title: "Error al enviar la reseña",
          text: data.msg || "Ocurrió un problema al enviar la reseña.",
          confirmButtonColor: "#5c2d42"
        });
      }
    } catch (error) {
      console.error("Error al enviar reseña:", error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor para enviar la reseña.",
        confirmButtonColor: "#5c2d42"
      });
    }
    finally {
      setIsSubmittingReview(false);
    }
  };

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState("Descripción de la imagen o galería que quieras mostrar aquí.");


  const styles = {
    reviewsContainer: {
      width: '90%',
      margin: '2rem auto',
      padding: '1.5rem',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
      '@media (maxWidth: 768px)': {
        padding: '1rem'
      }
    },
    reviewFormCard: {
      backgroundColor: '#fafafa',
      border: '1px solid #eee',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '2rem',
      '@media (maxWidth: 768px)': {
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
      '@media (maxWidth: 480px)': {
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
        {profileNotFound ? (
          <>
            <h1 style={{ textAlign: "center", marginTop: "100px", color: "white" }}>
              ❌ Usuario no encontrado
            </h1>
            <p style={{ textAlign: "center", fontSize: "1.8rem", color: "red" }}>
              El tatuador que estás buscando no existe o ha sido eliminado.
            </p>
          </>
        ) : (
          <>
            <div className="banner">
              <img src={newBanner || store.profile.image || store.profile.category_banner} alt="Banner" className="banner-img" />

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
                <img src={store.profile.profile_picture != '' ? store.profile.profile_picture : perfil} alt="Tatuador" className="profile-picture" />
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
                  <h2>{store.profile.profile_name}</h2>
                )}

                {isEditing ? (
                  <textarea
                    className="edit-textarea"
                    value={editedBio}
                    onChange={(e) => setEditedBio(e.target.value)}
                  />
                ) : (
                  <p className="bio">{store.profile.bio}</p>
                )}

                {isEditing ? (
                  <div className="social-edit">
                    {Object.entries(socialMedia).map(([key, value]) => (
                      <div className="input-with-icon" key={key}>
                        {key === "instagram" && <FaInstagram className="input-icon" />}
                        {key === "facebook" && <FaFacebookF className="input-icon" />}
                        {key === "x" && <FaXTwitter className="input-icon" />}
                        {key === "whatsapp" && <FaWhatsapp className="input-icon" />}
                        <input
                          type="text"
                          placeholder={`URL de ${key}`}
                          value={value}
                          onChange={(e) => setSocialMedia({ ...socialMedia, [key]: e.target.value })}
                          className="edit-input"
                        />
                      </div>
                    ))}
                  </div>

                ) : (
                  renderSocialIcons()
                )}


              </div>


              <div className="contact-section">
                <button className="contact-button" onClick={handleContactClick}>
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



                {parseInt(currentUserInfo?.id) === parseInt(id) && (
                  <button className="edit-button" onClick={toggleEdit}>
                    {isEditing ? "Guardar Cambios" : "Editar perfil"}
                  </button>
                )}


                {isEditing && (
                  <button
                    className="create-post-button"
                    onClick={() => setShowCreatePostModal(true)}
                  >
                    Crear post
                  </button>
                )}

              </div>
            </div>


            <div className="gallery">
              {posts.map((post, index) => (
                <div className="card tattoo-card" key={post.id}>
                  <div className="image-wrapper">
                    <img
                      src={post.image}
                      className="card-img-top"
                      alt={`tattoo-${index}`}
                      onClick={() => openModal(index)}
                    />
                    {isEditing && (
                      <div className="delete-icon" onClick={() => handleDeletePost(post.id)}>
                        <FiTrash2 size={20} />
                      </div>
                    )}

                  </div>
                  <div className="card-body">
                    <div className="like-wrapper">
                      <span
                        className={`heart-icon ${likes[post.id] ? "liked" : ""}`}
                        onClick={() => toggleLike(index)}
                      >
                        {likes[post.id] ? "❤️" : "🤍"}
                      </span>

                      <span className="like-count">{post.likes}</span>
                    </div>


                  </div>

                </div>
              ))}



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
                      <h5 className="modal-tattooer-name">{store.profile.username}</h5>
                      {isEditingDescription ? (
                        <div className="description-editor">
                          <textarea
                            className="edit-textarea"
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                          />
                          <button
                            className="save-description"
                            onClick={handleUpdateDescription}
                          >
                            Guardar
                          </button>
                        </div>
                      ) : (
                        <p className="modal-description">
                          {posts[modalImageIndex]?.description || "Sin descripción disponible."}
                        </p>
                      )}



                      <div className="like-wrapper modal-like-wrapper">
                        <div className="like-section-modal">
                          <span
                            className={`heart-icon ${likes[posts[modalImageIndex]?.id] ? "liked" : ""}`}
                            onClick={() => toggleLike(modalImageIndex)}
                          >
                            {likes[posts[modalImageIndex]?.id] ? "❤️" : "🤍"}
                          </span>

                        </div>

                        <span className="like-count-modal">{posts[modalImageIndex]?.likes}</span>
                      </div>



                    </div>


                    <div className="col-md-7 d-flex align-items-center justify-content-center modal-image-wrapper">
                      <img
                        src={posts[modalImageIndex]?.image}
                        alt="Imagen ampliada"
                        className="modal-image"
                      />

                    </div>
                  </div>

                  <button className="close btn-close position-absolute top-0 end-0 m-3" onClick={closeModal}></button>
                  {modalImageIndex !== null &&
                    parseInt(currentUserInfo?.id) === parseInt(posts[modalImageIndex]?.user_id) &&
                    !isEditingDescription && (
                      <FiEdit2
                        className="edit-description-icon"
                        title="Editar descripción"
                        onClick={() => {
                          setEditedDescription(posts[modalImageIndex]?.description || "");
                          setIsEditingDescription(true);
                        }}
                      />
                    )}




                </div>
              </div>
            )}

            {(isEditing || (store.profile.latitude && store.profile.longitude)) && (
              localStorage.getItem("token") || isEditing ? (
                <div style={styles.reviewsContainer}>
                  <h4 style={{ textAlign: "center", marginBottom: "1rem", color: "#5c2d42" }}>
                    {isEditing ? "📍 Selecciona la ubicación del tatuador" : "📍 Ubicación del tatuador"}
                  </h4>

                  {isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={{ width: "100%", height: "300px", borderRadius: "12px" }}
                      center={{
                        lat: tempLat !== null
                          ? tempLat
                          : store.profile.latitude
                            ? parseFloat(store.profile.latitude)
                            : -33.4489,
                        lng: tempLng !== null
                          ? tempLng
                          : store.profile.longitude
                            ? parseFloat(store.profile.longitude)
                            : -70.6693
                      }}
                      zoom={
                        (tempLat && tempLng) || (store.profile.latitude && store.profile.longitude)
                          ? 14
                          : 4
                      }
                      onClick={(e) => {
                        if (!isEditing) return;
                        const lat = e.latLng.lat();
                        const lng = e.latLng.lng();
                        setTempLat(lat);
                        setTempLng(lng);
                        getAddressFromCoordinates(lat, lng);
                      }}
                    >
                      {(tempLat && tempLng) || (store.profile.latitude && store.profile.longitude) ? (
                        <Marker
                          position={{
                            lat: isEditing ? tempLat : parseFloat(store.profile.latitude),
                            lng: isEditing ? tempLng : parseFloat(store.profile.longitude)
                          }}
                          title="Ubicación del tatuador"
                          draggable={isEditing}
                          onDragEnd={(e) => {
                            if (!isEditing) return;
                            const lat = e.latLng.lat();
                            const lng = e.latLng.lng();
                            setTempLat(lat);
                            setTempLng(lng);
                            getAddressFromCoordinates(lat, lng);
                          }}
                        />
                      ) : null}
                    </GoogleMap>
                  ) : (
                    <p style={{ textAlign: "center", color: "#999" }}>Cargando mapa...</p>
                  )}

                  {(tempLat && tempLng && isEditing) || (!isEditing && store.profile.location_text) ? (
                    <div style={{ textAlign: "center", marginTop: "1rem", color: "#5c2d42" }}>
                      <p style={{ fontWeight: "bold" }}>
                        {isEditing
                          ? locationText || "Obteniendo dirección..."
                          : store.profile.location_text}
                      </p>
                    </div>
                  ) : null}

                  {isEditing && tempLat !== null && tempLng !== null && (
                    <div style={{ textAlign: "center", marginTop: "1rem" }}>
                      <button
                        className="btn"
                        onClick={() => {
                          setTempLat(null);
                          setTempLng(null);
                          setLocationText("");
                        }}
                        style={{
                          backgroundColor: "#dc3545",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          padding: "0.5rem 1rem",
                          cursor: "pointer"
                        }}
                      >
                        Eliminar ubicación
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div style={styles.reviewsContainer}>
                  <h4 style={{ textAlign: "center", marginBottom: "1rem", color: "#5c2d42" }}>
                    📍 Ubicación del tatuador
                  </h4>
                  <p style={{ textAlign: "center", color: "#666" }}>
                    Para ver la ubicación del tatuador debes{" "}
                    <Link to="/login" style={{ color: "#5c2d42", fontWeight: "bold" }}>iniciar sesión</Link> o{" "}
                    <Link to="/register" style={{ color: "#5c2d42", fontWeight: "bold" }}>registrarte</Link>.
                  </p>
                </div>
              )
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


                {isLoadingUserInfo ? (
                  <div style={{ textAlign: 'center', padding: '1rem' }}>
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Cargando...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    {localStorage.getItem('token') && currentUserInfo?.userTypeId !== 1 && currentUserInfo?.id !== parseInt(id) ? (
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
                        {!localStorage.getItem('token') ? (
                          <Link to="/login" style={{ color: '#8c3d5b', textDecoration: 'none' }}>
                            Inicia sesión para dejar una reseña
                          </Link>
                        ) : currentUserInfo?.userTypeId === 2 ? (
                          "🔒 Los tatuadores no pueden dejar reseñas"
                        ) : currentUserInfo?.id === parseInt(id) ? (
                          "🔒 No puedes dejar una reseña en tu propio perfil"
                        ) : (
                          "Debes ser un usuario registrado para dejar reseñas"
                        )}
                      </div>
                    )}
                  </>
                )}

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
            {showCreatePostModal && (
              <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <div className="modal-dialog">
                  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                      <h5 className="modal-title">Crear nuevo post</h5>
                      <button
                        type="button"
                        className="close btn-close"
                        onClick={() => setShowCreatePostModal(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label">Imagen del tatuaje</label>
                        <input
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={(e) => setNewPostImage(e.target.files[0])}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Descripción</label>
                        <textarea
                          className="form-control"
                          rows="4"
                          placeholder="Escribe una descripción para el post"
                          value={newPostDescription}
                          onChange={(e) => setNewPostDescription(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        className="btn cancel"
                        onClick={() => setShowCreatePostModal(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        className="btn send"
                        onClick={handleAddPost}
                        disabled={isSubmittingPost}
                      >
                        {isSubmittingPost ? "Guardando..." : "Guardar Post"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TattooerProfile;