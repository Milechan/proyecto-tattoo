import React from "react";
import { Link } from "react-router-dom";

export const Categories = () => {
    return (
        <div className="text-center mt-5">
            <div className="container-flex">
                <div className="d-flex flex-wrap justify-content-center mt-4 gap-3">
                    <Link
                        to="/category/Neotradicional"
                        className="btn burdeo px-4 py-3 fs-5"
                    >
                        Neotradicional
                    </Link>
                    <Link
                        to="/category/Geeks"
                        className="btn burdeo px-4 py-3 fs-5"
                    >
                        Geeks
                    </Link>
                    <Link
                        to="/category/Minimalista"
                        className="btn burdeo px-4 py-3 fs-5"
                    >
                        Minimalista
                    </Link>
                    <Link
                        to="/category/Black-Out"
                        className="btn burdeo px-4 py-3 fs-5"
                    >
                        Black-Out
                    </Link>
                    <Link
                        to="/category/Realismo"
                        className="btn burdeo px-4 py-3 fs-5"
                    >
                        Realismo
                    </Link>
                </div>
            </div>
        </div>
    );
};
