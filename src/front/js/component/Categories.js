import React from "react";
import { Link } from "react-router-dom";

export const Categories = () => {

    return (
        <div className="text-center mt-5">
            <div className="container-flex">
                <h1>categorias</h1>
                <div className="d-flex justify-content-center">
                    <Link to="/category/Neotradicional" className="btn burdeo mx-4">Neotradicional</Link>
                    <Link to="/category/Geeks" className="btn burdeo mx-4">Geeks</Link>
                    <Link to="/category/Minimalista" className="btn burdeo mx-4">Minimalista</Link>
                    <Link to="/category/Black-Out" className="btn burdeo mx-4">Black-Out</Link>
                    <Link to="/category/Realismo" className="btn burdeo mx-4">Realismo</Link>
                </div>

            </div>
        </div>
    )
};