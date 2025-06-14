import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Map } from 'pigeon-maps'
import { osm } from 'pigeon-maps/providers'

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jp-server-blond.vercel.app/all-rooms')
      .then(res => res.json())
      .then(data => setRooms(data))

  }, []);

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
       <Map
    provider={osm}
    height={200}
    defaultCenter={[50.879, 4.6997]}
    defaultZoom={11}
  />
      <h2 className="text-4xl font-bold text-center mb-12">Featured Rooms</h2>

      <div className="flex flex-wrap justify-center gap-6">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div
              key={room._id}
              onClick={() => navigate(`/roomdetails/${room._id}`)}
              className="w-72 bg-white rounded-lg shadow-md cursor-pointer flex flex-col overflow-hidden transform transition duration-200 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-44 object-cover"
              />

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {room.name || 'No Name'}
                </h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow">
                  {room.description || 'No description available.'}
                </p>

                <div className="text-yellow-500 font-bold">
                  Rating: {room.rating} ⭐
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Loading rooms or no rooms found.</p>
        )}
      </div>
      
    </div>

    
  );
  
};

export default RoomsPage;
