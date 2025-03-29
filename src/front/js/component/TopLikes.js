import React from "react";
import tatuaje from "../../img/tatuaje.webp";

export const TopLikes = () => {
  return (
    <div className="text-center mt-5">
      <div className="container">
        <h1>Top de Likes</h1>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <div className="card" style={{ width: "18rem" }}>
            <img src={tatuaje} className="card-img-top" alt="Tatuaje" />
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </p>
            </div>
          </div>

          <div className="card" style={{ width: "18rem" }}>
            <img src={tatuaje} className="card-img-top" alt="Tatuaje" />
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </p>
            </div>
          </div>

          <div className="card" style={{ width: "18rem" }}>
            <img src={tatuaje} className="card-img-top" alt="Tatuaje" />
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
