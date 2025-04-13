import React from "react";
import { Link } from "react-router-dom";
import categories from "../../styles/categories.css";

export const Categories = () => {
    return (
        <div className="text-center mt-5">
            <div className="container-flex">
                <div className="d-flex flex-wrap justify-content-center mt-4 gap-4">
                    <Link to="/category/Neotradicional" className="btn burdeo px-4 py-3 fs-5 bradius category-button">
                        Neotradicional
                    </Link>
                    <Link to="/category/Geeks" className="btn burdeo px-4 py-3 fs-5 bradius category-button">
                        Geeks
                    </Link>
                    <Link to="/category/Minimalista" className="btn burdeo px-4 py-3 fs-5 bradius category-button">
                        Minimalista
                    </Link>
                    <Link to="/category/Black-Out" className="btn burdeo px-4 py-3 fs-5 bradius category-button">
                        Black-Out
                    </Link>
                    <Link to="/category/Realismo" className="btn burdeo px-4 py-3 fs-5 bradius category-button">
                        Realismo
                    </Link>
                </div>
            </div>
        </div>
    );
};