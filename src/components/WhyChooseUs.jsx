import React from "react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: "✅",
      title: "Verified Hotels",
      description: "Each room is handpicked and verified by our quality team.",
    },
    {
      icon: "🌐",
      title: "Free Amenities",
      description: "WiFi, AC, breakfast & more included with every booking.",
    },
    {
      icon: "💬",
      title: "24/7 Support",
      description: "Our dedicated team is available anytime during your stay.",
    },
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Why Choose Our Rooms?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience unmatched comfort and convenience. Our rooms are rated for
          exceptional hospitality, top-class amenities, and great value.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h4>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
