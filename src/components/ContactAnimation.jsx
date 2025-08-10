import React from 'react';
import Contactlottie from "../assets/Contact Us.json";
import Lottie from "lottie-react";
const ContactAnimation = () => {
    return (
        <div style={{ width: 300, margin: "0 auto" }}>
      <Lottie animationData={Contactlottie} loop={true} />
    </div>
    );
};

export default ContactAnimation;