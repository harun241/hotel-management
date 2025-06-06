import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/hotels/top-rated')
      .then(res => res.json())
      .then(data => {
        
        setRooms(data);
      })
      .catch(error => console.error('Error fetching rooms:', error));
  }, []);

  return (
    <div>
      <div className="text-4xl font-bold flex justify-center my-15">Featured Rooms</div>
      <div
        style={{
          padding: '1rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div
              key={room._id}
              onClick={() => navigate(`/roomdetails/${room._id}`)}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                width: '300px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#fff',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
              }}
            >
              <img
                src={room.image}
                alt={room.name}
                style={{ width: '100%', height: '180px', objectFit: 'cover' }}
              />

              <div
                style={{
                  padding: '15px',
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                  {room.name || 'No Name'}
                </h3>
                <p
                  style={{
                    flexGrow: 1,
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '10px',
                  }}
                >
                  {room.description || 'No description available.'}
                </p>

                <div
                  style={{ marginBottom: '10px', color: '#f39c12', fontWeight: 'bold' }}
                >
                  Rating: {room.rating} ⭐
                </div>

                
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

export default FeaturedRooms;
