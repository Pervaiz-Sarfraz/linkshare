import React from "react";
import { ValuesData } from "../constants/index";

const JobAbout = () => {
  return (
    <section className="value-section">
      <p className="value-title">
        The Value that hold us true and to account
      </p>
      <div className="value-grid">
        {ValuesData.slice(0, 3).map((ValuesData) => {
          let colorclass = null;
          let imgbgclass = null;

          if (ValuesData.id === 1) {
            colorclass = "hover-bg1";
            imgbgclass = "img-bg1";
          } else if (ValuesData.id === 2) {
            colorclass = "hover-bg2";
            imgbgclass = "img-bg2";
          } else {
            colorclass = "hover-bg3";
            imgbgclass = "img-bg3";
          }

          return (
            <div
              key={ValuesData.id}
              className={`value-card ${colorclass}`}
            >
              <div className="value-card-header">
                <div className={`value-card-icon ${imgbgclass}`}>
                  <img
                    src={ValuesData.logo}
                    width={25}
                    alt={ValuesData.title}
                  />
                </div>
                <span className="value-card-title">{ValuesData.title}</span>
              </div>
              <p className="value-card-desc">{ValuesData.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default JobAbout;