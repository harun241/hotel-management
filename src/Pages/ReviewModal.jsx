import React, { useEffect, useState } from 'react';
import Rating from 'react-rating';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ReviewModal = ({ isOpen, onClose, roomId, user }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    if (user) {
      setUserName(user.displayName || user.email || 'Anonymous');
      setUserEmail(user.email || '');
    }
  }, [user]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      toast.error('Rating must be between 1 and 5');
      return;
    }
    if (!comment.trim() || comment.length < 5) {
      toast.error('Comment must be at least 5 characters long');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.accessToken || ''}`, // Pass token if available
        },
        body: JSON.stringify({
          userName,
          userEmail,
          rating,
          comment,
          roomId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Review submitted successfully!');
        onClose();
        setComment('');
        setRating(5);
      } else {
        toast.error(data.message || 'Something went wrong!');
      }
    } catch (err) {
      toast.error('Server error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Submit Your Review</h2>
        <form onSubmit={handleSubmitReview}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={userName}
              readOnly
              className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={userEmail}
              readOnly
              className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
            <Rating
              initialRating={rating}
              onChange={(rate) => setRating(rate)}
              fullSymbol={<FaStar className="text-yellow-400 text-xl" />}
              emptySymbol={<FaRegStar className="text-gray-300 text-xl" />}
              fractions={1}
              readonly={loading}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full border rounded px-3 py-2"
              required
              minLength={5}
              disabled={loading}
              placeholder="Write your review here..."
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
