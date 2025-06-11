import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import ReviewModal from './ReviewModal';


const fetchUserBookings = async (email, accessToken) => {
  const res = await fetch(`http://localhost:3000/api/bookings?userEmail=${email}`, {
   
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch bookings');
  return await res.json();
};

const updateBookingDate = async (bookingId, newDate, roomId,accessToken) => {
  const res = await fetch(`http://localhost:3000/api/bookings/${bookingId}`, {

     headers: {

          'Content-Type': 'application/json' ,
              Authorization: `Bearer ${accessToken}`,
    },

    method: 'PATCH',

    body: JSON.stringify({ bookingDate: new Date(newDate).toISOString(), roomId }),
  });
  if (!res.ok) throw new Error('Failed to update booking date');
  return await res.json();
};

const cancelBooking = async (bookingId,accessToken) => {
  const res = await fetch(`http://localhost:3000/api/bookings/${bookingId}`, {
method: 'DELETE',
     headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    
  });
  if (!res.ok) {
    const errorText = await res.text();
    const err = new Error(errorText || 'Failed to cancel booking');
    err.status = res.status;
    throw err;
  }
  return await res.json();
};

const BookingCard = ({ booking, onUpdate, onCancel, onReview }) => {
  const { bookingDate, createdAt, room, _id, userName, userEmail, userImage } = booking;
  const [isUpdating, setIsUpdating] = useState(false);
  const [newDate, setNewDate] = useState(bookingDate ? bookingDate.slice(0, 10) : '');

  const today = new Date();
  const bookingDay = new Date(bookingDate);
  const diffInDays = (bookingDay - today) / (1000 * 60 * 60 * 24);
  const isCancellable = diffInDays >= 1;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-6 flex gap-6 items-start">
      <img
        src={userImage || room?.image || 'https://i.ibb.co/Sn6hGHJ/user.png'}
        alt={userName || room?.name || 'Booking Image'}
        className="w-16 h-16 rounded-full object-cover border"
      />
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{room?.name || 'Unnamed Room'}</h3>
        <p className="text-gray-600 mb-1"><strong>Price:</strong> ${room?.price ?? 'N/A'}</p>
        <p className="text-gray-600 mb-1"><strong>User:</strong> {userName}</p>
        <p className="text-gray-600 mb-1">
          <strong>Email:</strong>{' '}
          <a href={`mailto:${userEmail}`} className="text-blue-600 hover:underline">{userEmail}</a>
        </p>
        <p className="text-gray-600 mb-1">
          <strong>Booking Date:</strong>{' '}
          {isUpdating ? (
            <>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 mr-2"
                min={new Date().toISOString().slice(0, 10)}
              />
              <button
                onClick={async () => {
                  if (!newDate) {
                    alert('Please select a valid date.');
                    return;
                  }
                  try {
                    await onUpdate(_id, newDate, room._id);
                    setIsUpdating(false);
                    alert('Booking updated!');
                  } catch (err) {
                    alert('Failed to update booking');
                    console.error(err);
                  }
                }}
                className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsUpdating(false)}
                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            new Date(bookingDate).toLocaleDateString()
          )}
        </p>
        <p className="text-gray-500 text-sm">Booked on: {new Date(createdAt).toLocaleString()}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            disabled={!isCancellable}
            onClick={() => onCancel(_id)}
            className={`px-4 py-2 rounded text-white ${
              isCancellable ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isCancellable ? 'Cancel Booking' : 'Cannot Cancel'}
          </button>
          <button
            onClick={() => onReview(booking)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Review
          </button>
          {!isUpdating && (
            <button
              onClick={() => setIsUpdating(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Update Date
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const MyBookings = () => {
  const { user } = useContext(AuthContext);
 
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    if (!user?.email || !user?.accessToken) return;

    setLoading(true);
    fetchUserBookings(user.email, user.accessToken)
    
      .then(setBookings)
      .then(() => console.log('token in context', user.accessToken))

      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [user?.email, user?.accessToken]);

  const handleUpdateBookingDate = async (bookingId, newDate, roomId) => {
    await updateBookingDate(bookingId, newDate, roomId);
    setBookings(prev =>
      prev.map(b => (b._id === bookingId ? { ...b, bookingDate: new Date(newDate).toISOString() } : b))
    );
  };

  const handleSubmitReview = async ({ userName, rating, comment, roomId }) => {
    try {
      const res = await fetch('http://localhost:3000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify({
          userName,
          rating,
          comment,
          roomId,
          timestamp: new Date().toISOString(),
          userEmail: user.email,
        }),
      });
      if (!res.ok) throw new Error('Failed to submit review');
      alert('Review submitted!');
      setIsReviewModalOpen(false);
    } catch (error) {
      alert('Failed to submit review');
      console.error(error);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      setBookings(prev => prev.filter(b => b._id !== bookingId));
      alert('Booking canceled successfully!');
    } catch (err) {
      if (err.status === 403) {
        alert('Cannot cancel this booking. You can only cancel at least 1 day in advance.');
      } else {
        alert('Failed to cancel booking.');
      }
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-700">Loading bookings...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Error: {error}</p>;
  if (bookings.length === 0) return <p className="text-center mt-10 text-gray-500">No bookings found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">My Bookings</h2>
      {bookings.map(booking => (
        <BookingCard
          key={booking._id}
          booking={booking}
          onUpdate={handleUpdateBookingDate}
          onCancel={handleCancelBooking}
          onReview={(booking) => {
            setSelectedBooking(booking);
            setIsReviewModalOpen(true);
          }}
        />
      ))}

      {selectedBooking && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          onSubmit={handleSubmitReview}
          user={user}
          roomId={selectedBooking.room._id}
        />
      )}
    </div>
  );
};

export default MyBookings;
