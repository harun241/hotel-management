import React from 'react';

const WhyChooseUs = () => {
  return (
    <div style={{ textAlign: 'center', margin: '50px 0', padding: '20px' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>Why Choose Our Rooms?</h2>
      <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '16px', color: '#555' }}>
        Experience unmatched comfort and convenience. Our rooms are rated for exceptional hospitality,
        top-class amenities, and great value.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '30px', flexWrap: 'wrap' }}>
        <div>
          <h4>✅ Verified Hotels</h4>
          <p style={{ color: '#777' }}>Each room is handpicked and verified by our team.</p>
        </div>
        <div>
          <h4>🌐 Free Amenities</h4>
          <p style={{ color: '#777' }}>WiFi, AC, breakfast & more included with every booking.</p>
        </div>
        <div>
          <h4>💬 24/7 Support</h4>
          <p style={{ color: '#777' }}>We’re here to assist you anytime during your stay.</p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
