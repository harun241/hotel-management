import { useState } from 'react';
import axios from 'axios';

const ReviewModal = ({ roomId, onClose, onSubmitSuccess }) => {
  const [user, setUser] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const review = { roomId, user, comment, rating: parseInt(rating) };

    try {
      await axios.post('http://localhost:3000/api/reviews', review);
      onSubmitSuccess(); 
    } catch (err) {
      console.error('Error submitting review', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Write a Review</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Your Name"
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your Review"
            required
            className="w-full p-2 border rounded"
          />
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Star</option>)}
          </select>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="text-gray-600">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
