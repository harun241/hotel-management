import React, { useState, useEffect } from 'react';
import { Link } from 'react-router'; 
import { motion } from 'framer-motion';
import Loader from './Loader';

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    fetch('https://jp-server-blond.vercel.app/hotels/top-rated', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((data) => setRooms(data.slice(0, 6)))
      .catch((err) => {
        console.error('Failed to fetch rooms:', err);
        setError('Failed to load rooms. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }

  return (
    <div className="py-10 max-w-5xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-center mb-10">Top Rated Rooms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <div
                key={room._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer transform transition duration-300 hover:scale-105 flex flex-col"
              >
                <img
                  src={room.image || '/fallback-image.jpg'}
                  alt={room.name || 'Room image'}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-4 flex flex-col flex-grow h-full">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {room.name || 'No Name'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">
                    {room.description || 'No description available.'}
                  </p>

                  <div className="text-yellow-500 font-semibold mb-4">
                    Rating: {room.rating} ⭐
                  </div>

                  <Link to={`/roomdetails/${room._id}`} className="mt-auto">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">No rooms found.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturedRooms;
