import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';

const fetchUserBookings = async (email) => {
  const res = await fetch(`http://localhost:3000/api/bookings?userEmail=${email}`);
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return await res.json();
};

const updateBookingDate = async (bookingId, newDate) => {
  const res = await fetch(`http://localhost:3000/api/bookings/${bookingId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bookingDate: newDate }),
  });
  if (!res.ok) throw new Error('Failed to update booking date');
  return await res.json();
};

const cancelBooking = async (bookingId) => {
  const res = await fetch(`http://localhost:3000/api/bookings/${bookingId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to cancel booking');
  return await res.json();
};

const BookingCard = ({ booking, onUpdate, onCancel }) => {
  const { bookingDate, createdAt, room, _id, userName, userEmail, userImage } = booking;
  const [isUpdating, setIsUpdating] = useState(false);
  const [newDate, setNewDate] = useState(bookingDate?.slice(0, 10) || '');

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-6 flex gap-6 items-start">
     <img
  src={userImage || room?.image || 'https://i.ibb.co/Sn6hGHJ/user.png'}
  alt={userName || room?.name || 'Booking Image'}
  className="w-16 h-16 rounded-full object-cover border"
/>

      <div className="flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{room?.name || 'Unnamed Room'}</h3>
        <p className="text-gray-600 mb-1"><strong>Price:</strong> ${room?.price || 'N/A'}</p>
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
              />
              <button
                onClick={async () => {
                  try {
                    await onUpdate(_id, newDate);
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
            onClick={() => onCancel(_id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel Booking
          </button>
          <button
            onClick={() => alert('Review feature coming soon!')}
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

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    fetchUserBookings(user.email)
      .then(setBookings)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [user?.email]);

  const handleUpdateBookingDate = async (bookingId, newDate) => {
    await updateBookingDate(bookingId, newDate);
    setBookings(prev =>
      prev.map(b => (b._id === bookingId ? { ...b, bookingDate: newDate } : b))
    );
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      setBookings(prev => prev.filter(b => b._id !== bookingId));
      alert('Booking canceled successfully!');
    } catch (err) {
      alert('Failed to cancel booking.');
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
        />
      ))}
    </div>
  );
};

export default MyBookings;
