import React from "react";
import "./MacBookMockup.css";

const MacBookMockup = ({ image, alt }) => {
  return (
    <div className="macbook">
      <div className="macbook__lid">
        <div className="macbook__bezel">
          <div className="macbook__notch">
            <span className="macbook__camera" />
          </div>
          <div className="macbook__screen">
            <img className="macbook__screenshot" src={image} alt={alt} />
            <div className="macbook__glass-reflection" />
          </div>
        </div>
      </div>

      <div className="macbook__chin" />
    </div>
  );
};

export default MacBookMockup;