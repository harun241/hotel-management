import { useParams } from 'react-router';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../context/AuthProvider';
import ReviewModal from './ReviewModal';
import HotelMap from '../components/HotelMap';
import { toast } from "react-toastify";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState(null);
  const [userBooking, setUserBooking] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`https://jp-server-blond.vercel.app/api/rooms/${id}`);
        setRoom(res.data);
      } catch (err) {
        console.error('Failed to fetch room data', err);
        toast.error('Failed to load room details.');
      }
    };

    fetchRoom();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`https://jp-server-blond.vercel.app/api/reviews?roomId=${id}`);
        setReviews(res.data);
      } catch (err) {
        console.error('Failed to fetch reviews', err);
        toast.error('Failed to load reviews.');
      }
    };

    fetchReviews();
  }, [id]);

  useEffect(() => {
    const fetchUserBooking = async () => {
      if (user?.email && id && user.accessToken) {
        try {
          const res = await axios.get(
            `https://jp-server-blond.vercel.app/api/bookings?userEmail=${user.email}&roomId=${id}`,
            {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
              },
            }
          );
          if (res.data?.length > 0) {
            setUserBooking(res.data[0]);
          } else {
            setUserBooking(null);
          }
        } catch (error) {
          console.error('Error fetching user booking:', error);
          toast.error('Failed to load your bookings.');
        }
      }
    };

    fetchUserBooking();
  }, [user, id]);

  const handleBookingConfirm = async () => {
    if (!bookingDate) {
      toast.error('Please select a booking date');
      return;
    }

    if (!user) {
      toast.error('You must be logged in to book a room');
      return;
    }

    const bookingData = {
      roomId: id,
      userEmail: user.email,
      userName: user.displayName || 'Anonymous',
      bookingDate: bookingDate.toISOString(),
    };

    try {
      const res = await axios.post(
        'https://jp-server-blond.vercel.app/api/bookings',
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(`Room booked successfully for ${bookingDate.toLocaleDateString()}`);
        setBookingModalOpen(false);
        setBookingDate(null);
        setUserBooking(res.data.booking || bookingData); // fallback to bookingData if backend doesn't return booking object
      } else {
        toast.error('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      if (error.response?.status === 409) {
        toast.error('Room already booked on this date.');
      } else {
        toast.error('Booking failed. Please try again.');
      }
    }
  };

  if (!room) {
    return <div className="p-6 text-center">Loading room details...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Helmet>
        <title>{room.name} | Hotelify</title>
        <meta name="description" content={room.description?.slice(0, 150)} />
        <meta property="og:title" content={room.name} />
        <meta property="og:description" content={room.description?.slice(0, 150)} />
        <meta property="og:image" content={room.image} />
        <link rel="canonical" href={`https://jp-server-blond.vercel.app/room/${id}`} />
      </Helmet>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-auto object-cover rounded-xl shadow-md"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2">{room.name}</h2>
          <p className="text-gray-600 mb-4">{room.description}</p>
          <p className="mb-2 text-lg"><strong>Price:</strong> ${room.price} per night</p>
          <p className="mb-2 text-lg"><strong>Rating:</strong> {room.rating} ⭐</p>
          <div className="mb-4">
            <strong>Amenities:</strong>
            <ul className="list-disc list-inside">
              {room.amenities?.map((amenity, idx) => (
                <li key={idx}>{amenity}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {room.latitude && room.longitude && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">Location</h2>
          <HotelMap latitude={room.latitude} longitude={room.longitude} name={room.name} />
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">User Reviews</h3>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review, idx) => (
              <div key={idx} className="border p-4 rounded-lg shadow-sm">
                <p className="text-gray-800 italic">"{review.comment}"</p>
                <p className="text-sm text-gray-500 mt-1">
                  — {review.userName || 'Anonymous'}, Rating: {review.rating}⭐
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet for this room.</p>
        )}

        <div className="mt-6 space-y-3">
          <button
            onClick={() => setBookingModalOpen(true)}
            className="btn btn-info w-full"
            disabled={room.available === false}
          >
            Book Now
          </button>

          {userBooking && (
            <button
              onClick={() => setReviewModalOpen(true)}
              className="btn btn-success w-full"
            >
              Give Review
            </button>
          )}
        </div>
      </div>

      {bookingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
            <p><strong>Room:</strong> {room.name}</p>
            <p><strong>Description:</strong> {room.description}</p>
            <p><strong>Price:</strong> ${room.price}</p>

            <label className="block mt-4 mb-2">Select Booking Date:</label>
            <DatePicker
              selected={bookingDate}
              onChange={setBookingDate}
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              className="border p-2 rounded w-full"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setBookingModalOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleBookingConfirm}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {reviewModalOpen && (
        <ReviewModal
          isOpen={reviewModalOpen}
          onClose={() => setReviewModalOpen(false)}
          user={user}
          roomId={id}
          bookingId={userBooking?._id}
        />
      )}
    </div>
  );
};

export default RoomDetails;
