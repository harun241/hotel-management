import React, { useState } from 'react';

const ReviewModal = ({ isOpen, onClose, user, roomId, bookingId }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const ratingNumber = Number(rating);

    if (!rating || ratingNumber < 1 || ratingNumber > 5) {
      alert('Please provide a rating between 1 and 5');
      return;
    }

    if (!bookingId) {
      alert('You can only review rooms you have booked.');
      return;
    }

    const reviewData = {
      bookingId,
      roomId,
      userEmail: user.email,
      userName: user.displayName || 'Anonymous',
      rating: ratingNumber,
      comment,
    };

    try {
      const response = await fetch(`/api/reviews/${roomId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit review');
      }

      alert('Review submitted successfully!');
      setRating('');
      setComment('');
      onClose();
    } catch (error) {
      alert('Error submitting review: ' + error.message);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={(e) => {
        if (e.target.classList.contains('bg-opacity-50')) {
          onClose();
        }
      }}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Give Review</h2>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Username</label>
          <input
            type="text"
            value={user?.displayName || 'Anonymous'}
            disabled
            className="w-full px-3 py-2 border rounded bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter rating 1 to 5"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Comment</label>
          <textarea
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Write your review here..."
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-400 px-4 py-2 rounded text-white hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
