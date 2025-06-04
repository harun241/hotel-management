import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/all-rooms')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched rooms:', data);
        setRooms(data);
      })
      .catch(error => console.error('Error fetching rooms:', error));
  }, []);

  return (
    <div>
      <div className='text-4xl font-bold flex justify-center my-15'>Featured Rooms</div>
      <div style={{ padding: '1rem', display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div
              key={room._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                width: '300px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#fff',
              }}
            >
              <img
                src={room.image}
                alt={room.name}
                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
              />

              <div style={{ padding: '15px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{room.name || 'No Name'}</h3>
                <p style={{ flexGrow: 1, fontSize: '14px', color: '#666', marginBottom: '10px' }}>
                  {room.description || 'No description available.'}
                </p>
                <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#222' }}>
                  Price: ${room.price}
                </div>
                <div style={{ marginBottom: '10px', color: '#f39c12', fontWeight: 'bold' }}>
                  Rating: {room.rating} ⭐
                </div>
                <div>
                  <strong>Amenities:</strong>
                  <ul style={{ paddingLeft: '20px', marginTop: '5px', marginBottom: 0, fontSize: '13px', color: '#555' }}>
                    {room.amenities && room.amenities.length > 0 ? (
                      room.amenities.map((amenity, idx) => (
                        <li key={idx}>{amenity}</li>
                      ))
                    ) : (
                      <li>No amenities listed</li>
                    )}
                  </ul>
                </div>

              
                <Link
                  to={`/roometails/${room._id}`}
                  style={{
                    marginTop: '15px',
                    textAlign: 'center',
                    backgroundColor: '#16a34a',
                    color: '#fff',
                    padding: '10px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    transition: 'background-color 0.3s',
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>Loading rooms or no rooms found.</p>
        )}
      </div>
    </div>
  );
};

export default RoomsPage;
