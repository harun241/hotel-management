import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router'; 
import { toast } from 'react-toastify';
import HotelAnimation from '../components/HotelAnimation';
import Loader from '../components/Loader';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jp-server-blond.vercel.app/api/all-rooms')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch rooms');
        return res.json();
      })
      .then(data => {
        setRooms(data);
        setIsLoading(false);
      })
      .catch(() => {
        setRooms([]);
        setIsLoading(false);
        toast.error('Failed to load rooms');
      });
  }, []);

  if (isLoading) {
    return <Loader />; // show loader while loading
  }

  return (
    <div className="py-10 px-4 mx-auto min-h-[60vh]">
      <HotelAnimation />
      <h2 className="text-4xl font-bold text-center mb-12">Featured Rooms</h2>

      {rooms.length === 0 ? (
        <p className="text-center text-gray-600">No rooms found.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {rooms.map((room) => (
            <div
              key={room._id}
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/roomdetails/${room._id}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') navigate(`/roomdetails/${room._id}`);
              }}
              className="w-72 bg-white rounded-lg shadow-md cursor-pointer flex flex-col overflow-hidden transform transition duration-200 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={room.image ?? 'https://via.placeholder.com/288x176?text=No+Image'}
                alt={room.name ?? 'Room image'}
                className="w-full h-44 object-cover"
              />

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {room.name ?? 'No Name'}
                </h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow">
                  {room.description ?? 'No description available.'}
                </p>

                <div className="text-yellow-500 font-bold">
                  Rating: {room.rating ?? 'N/A'} ⭐
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomsPage;
