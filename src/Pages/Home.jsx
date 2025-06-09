import React, { useState, useEffect } from 'react';  
import Banner from '../components/Banner';
import HotelMap from '../components/HotelMap';
import FeaturedRooms from '../components/FeaturedRooms';
import WhyChooseUs from '../components/WhyChooseUs';
import Reviews from '../components/Reviews';
import HowItWorks from '../components/HowItWorks';
import SpecialOfferModal from '../components/SpecialOfferModal';

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
 
    setShowModal(true);
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Banner />
      <HotelMap />
      <FeaturedRooms />
      <HowItWorks />
      <WhyChooseUs />
      {showModal && <SpecialOfferModal onClose={closeModal} />}
      <Reviews />
    </div>
  );
};

export default Home;
