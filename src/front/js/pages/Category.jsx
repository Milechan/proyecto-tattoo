import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/category.css"


export const Category = () => {
    const { store, actions } = useContext(Context);
    return (
        <div className="contenedor-categorias">
            <div>GEEKS</div>
            <div>
                <h3>
                    Un tatuaje geek es un diseño inspirado en la cultura geek, que incluye temas de ciencia, tecnología, videojuegos, dibujos animados, cómics, películas, y más.
                </h3>
                <h1>¿Qué es un geek?</h1>

                <p>Geek es un término que se usa para describir a una persona apasionada por la tecnología, la informática, y temas relacionados.
                    Los geeks suelen estar obsesionados con lo más nuevo, lo más cool, y lo más de moda en su tema de interés.
                    Los geeks pueden pasar horas en la computadora y se obsesionan cuando un tema les interesa demasiado.
                    Los geeks disfrutan de aspectos de la cultura pop, como la ciencia ficción y la música tecno.
                </p>

            </div>
        </div>
    )

}