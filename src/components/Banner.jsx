
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router";


const Banner = () => {
  const slides = [
    {
      title: "Luxurious Rooms",
      description: "Experience comfort and elegance like never before.",
      image: "https://i.ibb.co/NnGWGQMD/46843072.jpg",
    },
    {
      title: "Relax and Unwind",
      description: "Enjoy your stay with premium amenities and views.",
      image: "https://i.ibb.co/Kx6KdJFt/premium-photo-1661929519129-7a76946c1d38.jpg",
    },
    {
      title: "Book Your Escape",
      description: "Find the perfect room for your vacation or business trip.",
      image: "https://i.ibb.co/DPS48J2X/photo-1618773928121-c32242e63f39.jpg",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0  bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
              <p className="text-base md:text-lg mb-6 max-w-2xl">{slide.description}</p>
              <Link to="/rooms">
                <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
                  View Rooms
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
