import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/category.css"


export const Category = () => {
    const { store, actions } = useContext(Context);
    const categoryObtained = {
        name: "Geek",
        description: " Un tatuaje geek es un diseño inspirado en la cultura geek, que incluye temas de ciencia, tecnología, videojuegos, dibujos animados, cómics, películas, y más.\n¿Qué es un geek? Geek es un término que se usa para describir a una persona apasionada por la tecnología, la informática, y temas relacionados.Los geeks suelen estar obsesionados con lo más nuevo, lo más cool, y lo más de moda en su tema de interés.",
        image: "",
        carousel: "",
        profiles: [
            {
                name: "Deadmermaid.tattoo"
            },
            {
                name: "conejogalactico"
            },
            {
                name: "lissssalme"
            },
            {
                name: "aleink"
            },
            {
                name: "boomwizard.tattoo"
            }
        ]

    }
    return (
        <div className="container-category">
            <div className="container-category-name">
                <div>{categoryObtained.name}</div>
            </div>

            <div className="container-category-description">
                <div>{categoryObtained.description}</div>
            </div>
            <div className="container-category-image">
                <div className="category-image"><div>{categoryObtained.image}</div></div>
            </div>
            <div className="container-category-carousel">
                <div className="container-carousel">
                    <div id="carouselExampleIndicators" class="carousel slide">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="..." className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="..." className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="..." className="d-block w-100" alt="..." />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="container-category-profiles">
                {categoryObtained.profiles.map((profile) => {
                    return (
                        <div className="container-profile">
                            <div>{profile.name}</div>
                        </div>

                    )
                })}

            </div>

        </div>
    )

}