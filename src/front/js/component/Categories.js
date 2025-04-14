import React from "react";
import { Link } from "react-router-dom";
import "../../styles/categories.css";

export const Categories = () => {
    const tattooCategories = [
        "Neotradicional",
        "Geeks",
        "Minimalista",
        "Black-Out",
        "Realismo",
    ];

    return (
        <section className="categories-section">
            <h2 className="categories-title">Explora por Estilo</h2>
            <div className="categories-container">
                {tattooCategories.map((category) => (
                    <Link
                        key={category}
                        to={`/category/${category}`}
                        className="category-button"
                    >
                        {category}
                    </Link>
                ))}
            </div>
        </section>
    );
};
