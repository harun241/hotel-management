import React from 'react';

const Testimonials = () => {
  return (
    <section className="bg-gray-100 py-16 mt-12">
      <h2 className="text-center text-3xl font-semibold text-gray-800">
        What Our Guests Say
      </h2>

      <div className="flex flex-wrap justify-center gap-8 mt-8 px-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-72 text-gray-700 text-base">
          <p className="mb-4">
            “Amazing stay! The Deluxe King Suite was spacious and very clean.”
          </p>
          <strong className="block text-gray-900">- Sarah, New York</strong>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md w-72 text-gray-700 text-base">
          <p className="mb-4">
            “Friendly staff and top-notch service. Will definitely book again!”
          </p>
          <strong className="block text-gray-900">- Ahmed, Dubai</strong>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
