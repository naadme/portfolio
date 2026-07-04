import React from "react";
import "./PhoneMockup.css";

const PhoneMockup = ({ image, alt }) => {
  return (
    <div className="phone">
      <div className="phone__side-button phone__side-button--action" />
      <div className="phone__side-button phone__side-button--volume-up" />
      <div className="phone__side-button phone__side-button--volume-down" />
      <div className="phone__side-button phone__side-button--power" />

      <div className="phone__frame">
        <div className="phone__screen">
          <img className="phone__screenshot" src={image} alt={alt} />

          <div className="phone__dynamic-island">
            <span className="phone__camera-dot" />
          </div>

          <div className="phone__glass-reflection" />
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
