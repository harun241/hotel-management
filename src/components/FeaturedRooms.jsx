import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router'; // ✅ router-dom use korte hobe

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/hotels/top-rated')
      .then(res => res.json())
      .then(data => setRooms(data.slice(0, 6)))
      .catch(error => console.error('Error fetching rooms:', error));
  }, []);

  return (
    <div className="py-10 max-w-5xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-10">Featured Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div
              key={room._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer transform transition duration-300 hover:scale-105 flex flex-col"
            >
              <img
                src={room.image}
                alt={room.name}
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

                <Link
                  to={`/roomdetails/${room._id}`}
                  className="mt-auto"
                >
                  <button className="w-full btn btn-info text-white py-2 px-4 rounded-lg  transition duration-200">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">Loading rooms or no rooms found.</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedRooms;
