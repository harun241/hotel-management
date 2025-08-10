import React from "react";
import Lottie from "lottie-react";
import hotelAnimation from "../assets/reception-eng.json";

const HotelAnimation = () => {
  return (
    <div style={{ width: 300, margin: "0 auto" }}>
      <Lottie animationData={hotelAnimation} loop={true} />
    </div>
  );
};

export default HotelAnimation;
