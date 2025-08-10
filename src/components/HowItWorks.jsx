const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Search",
      description: "Browse rooms by location, dates & preferences.",
      icon: "🔍",
    },
    {
      id: 2,
      title: "Book",
      description: "Securely book your preferred stay.",
      icon: "🏠",
    },
    {
      id: 3,
      title: "Enjoy",
      description: "Check-in and enjoy your stay!",
      icon: "🧳",
    },
  ];

  return (
    <section className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-10">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map(({ id, title, description, icon }) => (
            <div
              key={id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition duration-300"
            >
              <div className="text-5xl mb-4">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
