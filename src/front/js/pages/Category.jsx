import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/category.css"


export const Category = () => {
    const { store, actions } = useContext(Context);
    const categoryObtained = {
        name: "Geek",
        description: " Un tatuaje geek es un diseño inspirado en la cultura geek, que incluye temas de ciencia, tecnología, videojuegos, dibujos animados, cómics, películas, y más.\n¿Qué es un geek? Geek es un término que se usa para describir a una persona apasionada por la tecnología, la informática, y temas relacionados.Los geeks suelen estar obsesionados con lo más nuevo, lo más cool, y lo más de moda en su tema de interés.",
        image: "",
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
                <div>{categoryObtained.image}</div>
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