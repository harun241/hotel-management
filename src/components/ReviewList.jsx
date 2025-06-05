import { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewList = ({ roomId }) => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/reviews?roomId=${roomId}`);
      setReviews(res.data);
    } catch (err) {
      console.error('Failed to load reviews', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [roomId]);

  return (
    <div>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      ) : (
        reviews.map((rev) => (
          <div key={rev._id} className="border p-3 rounded mb-2">
            <p className="font-bold">{rev.user} <span className="text-yellow-500">({rev.rating}★)</span></p>
            <p>{rev.comment}</p>
            <small className="text-gray-400">{new Date(rev.date).toLocaleDateString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
