import React from "react";

export const Categories = () => {
    return (
        <div className="text-center mt-5">
			<div className="container-flex">
				<h1>categorias</h1>
				<div className="d-flex justify-content-center">
                    <button type="button" className="btn burdeo mx-4">Neotradicional</button>
                    <button type="button" className="btn burdeo mx-4">Geecks</button>
                    <button type="button" className="btn burdeo mx-4">Minimalista</button>
                    <button type="button" className="btn burdeo mx-4">Black-Out</button>
                    <button type="button" className="btn burdeo mx-4">Realismo</button>
                    <button type="button" className="btn burdeo mx-4">Full-Color</button>
                </div>

			</div>
        </div>
    )
};