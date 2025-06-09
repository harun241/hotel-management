import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/reviews")
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error("Failed to fetch reviews:", err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">What Our Users Say</h2>

      {reviews.length === 0 ? (
        <p className="text-center">No reviews found.</p>
      ) : (
        <Slider {...settings}>
          {reviews.map((review) => (
            <div key={review._id} className="border rounded-lg p-6 shadow-md bg-white text-center mx-4">
              <p className="text-lg text-gray-800 italic mb-4">"{review.comment}"</p>
              <div className="text-yellow-500 font-semibold mb-1">Rating: {review.rating}⭐</div>
              <h3 className="text-lg font-bold text-gray-700">{review.userName}</h3>
              <p className="text-sm text-gray-500">
                {new Date(review.timestamp).toLocaleDateString()}
              </p>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Reviews;
