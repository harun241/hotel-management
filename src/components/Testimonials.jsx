import React from 'react';

const Testimonials = () => {
  const testimonialStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '300px',
    fontSize: '15px',
    color: '#444',
    margin: '10px'
  };

  return (
    <div style={{ backgroundColor: '#f9f9f9', padding: '40px 20px', marginTop: '50px' }}>
      <h2 style={{ textAlign: 'center', fontSize: '26px' }}>What Our Guests Say</h2>
      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '30px' }}>
        <div style={testimonialStyle}>
          <p>“Amazing stay! The Deluxe King Suite was spacious and very clean.”</p>
          <strong>- Sarah, New York</strong>
        </div>
        <div style={testimonialStyle}>
          <p>“Friendly staff and top-notch service. Will definitely book again!”</p>
          <strong>- Ahmed, Dubai</strong>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
