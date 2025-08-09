import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // localStorage theke token neya

    fetch("http://localhost:3000/reviews", {
      headers: {
        Authorization: `Bearer ${token}`,  // Authorization header add kora holo
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((data) => setReviews(data))
      .catch((err) => {
        console.error("Failed to fetch reviews:", err);
        setReviews([]); // Error hole empty array set kora jabe
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    adaptiveHeight: true,
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        💬 What Our Users Say
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review._id} className="flex justify-center items-center px-4">
              <div className="w-full max-w-md bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-xl flex flex-col justify-between items-center transition-transform duration-300 hover:scale-[1.02] text-center">
                <p className="text-lg italic text-gray-700 mb-4 line-clamp-5">
                  “{review.comment}”
                </p>
                <div className="flex flex-col items-center gap-1">
                  <div className="text-yellow-500 font-semibold">
                    ⭐ {review.rating} / 5
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {review.userName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(review.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Reviews;
