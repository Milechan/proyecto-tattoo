import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/category.css"
import { useNavigate, useParams } from "react-router-dom";


export const Category = () => {
    const { store, actions } = useContext(Context);
    const { categoryName } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        try {
            const category = actions.getCategory(categoryName)
            console.warn(category);

        } catch (error) {
            console.warn("No se encontro la categoria con ese nombre")
        }

    }, [categoryName])

    return (
        <div className="container-category">
            <div className="container-category-image">
                <div className="category-image">
                    <img src={store.category.image} alt="" />
                </div>
            </div>
            <div className="container-category-name">
                <div>{store.category.name}</div>
            </div>

            <div className="container-category-description">
                <div>{store.category.description}</div>
            </div>
            <div className="container-category-carousel">
                <div className="container-carousel">
                    <div id="carouselExampleIndicators" className="carousel slide">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={store.category.carousel[0]} className="d-block " alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src={store.category.carousel[1]} className="d-block " alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src={store.category.carousel[2]} className="d-block " alt="..." />
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
                {store.category.profiles.map((profile) => {
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