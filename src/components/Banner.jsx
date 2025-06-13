
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router";


const Banner = () => {
  const slides = [
    {
      title: "Luxurious Rooms",
      description: "Experience comfort and elegance like never before.",
      image: "https://i.ibb.co/Hfbz4kHX/1000-F-406678288-so-Uy6mmdi-Bdww-FDYBw-UNMd-NAp-Xq-Wj2t-S.jpg",
    },
    {
      title: "Relax and Unwind",
      description: "Enjoy your stay with premium amenities and views.",
      image: "https://i.ibb.co/WW77LF1B/1000-F-29034593-z9-NLKD9-H5-O77-DSiv-Rxc-GOn8r-I8y-Ifep-U.jpg",
    },
    {
      title: "Book Your Escape",
      description: "Find the perfect room for your vacation or business trip.",
      image: "https://i.ibb.co/7JwKqx5b/1000-F-29133877-bf-A2n7c-WV53fto2-Bomy-Z6py-Ruj-JTBwjd.jpg",
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
