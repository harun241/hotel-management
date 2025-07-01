import React from "react";

const About = () => {
  return (
    <div className="bg-white py-10 px-4 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          About Our Hotel
        </h1>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Text Section */}
          <div>
            <p className="text-gray-700 mb-6">
              Welcome to <span className="font-semibold text-blue-600">Royal Haven Hotel</span>, your perfect destination for luxury, comfort, and convenience. Located in the heart of the city, our hotel offers world-class services, elegant rooms, and exceptional hospitality to make your stay truly memorable.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              To provide outstanding service and luxurious experiences to all our guests through professionalism, comfort, and warmth.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Vision</h2>
            <p className="text-gray-600">
              To be recognized as the leading hospitality brand, setting benchmarks in customer satisfaction and hotel management excellence.
            </p>
          </div>

          {/* Image Section */}
         
        </div>
      </div>
    </div>
  );
};

export default About;
