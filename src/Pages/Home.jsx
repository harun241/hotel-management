import React from 'react';
import Banner from '../components/Banner'
import HotelMap from '../components/HotelMap';
import FeaturedRooms from '../components/FeaturedRooms';
import WhyChooseUs from '../components/WhyChooseUs';
import Reviews from '../components/Reviews';
import HowItWorks from '../components/HowItWorks';

const Home = () => {
    return (
        <div>
         
           <Banner/>
           <HotelMap/>
           <FeaturedRooms/>
           <HowItWorks/>
           <WhyChooseUs/>

           <Reviews/>
        </div>
    );
};

export default Home;