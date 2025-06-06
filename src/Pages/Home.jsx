import React from 'react';
import Banner from '../components/Banner'
import HotelMap from '../components/HotelMap';
import FeaturedRooms from '../components/FeaturedRooms';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';

const Home = () => {
    return (
        <div>
         
           <Banner/>
           <HotelMap/>
           <FeaturedRooms/>
           <WhyChooseUs/>
            <Testimonials/>
        </div>
    );
};

export default Home;