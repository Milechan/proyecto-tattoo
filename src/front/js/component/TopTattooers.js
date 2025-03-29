import React from "react";
import tatuaje2 from "../../img/tatuaje2.webp";

export const TopTattooers = () => {
  return (
    <div className="text-center mt-5">
      <div className="container">
        <h1>Top de tatuadores</h1>
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={tatuaje2} className="d-block w-100" alt="Tatuaje" />
            </div>
            <div className="carousel-item">
              <img src={tatuaje2} className="d-block w-100" alt="Tatuaje" />
            </div>
            <div className="carousel-item">
              <img src={tatuaje2} className="d-block w-100" alt="Tatuaje" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};
