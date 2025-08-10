import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AlignCenter, AlignCenterHorizontal } from "lucide-react";
import Loader from "./Loader";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    fetch("https://jp-server-blond.vercel.app/reviews", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((data) => setReviews(data))
      .catch((err) => {
        console.error("Failed to fetch reviews:", err);
        setReviews([]);
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
    centerMode: true,
    centerPadding: "0px",
    AlignCenterHorizontal // No side gap so it's perfectly centered
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-16">
      <Loader></Loader>
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
        💬 What Our Users Say
      </h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <Slider {...settings}>
          {reviews.map((review) => (
            <div
              key={review._id}
              className="flex justify-center items-center"
            >
              <div className="w-full max-w-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl text-center transform transition duration-300 hover:scale-[1.03]">
                <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-6">
                  “{review.comment}”
                </p>
                <div className="flex flex-col items-center gap-1">
                  <div className="text-yellow-500 font-semibold text-lg">
                    ⭐ {review.rating} / 5
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
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
