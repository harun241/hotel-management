import { useContext } from 'react';
import { NavLink } from 'react-router'; 
import { AuthContext } from '../context/AuthProvider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
       
        <div className="flex items-center">
          <img
            src='https://i.ibb.co/kkx8Cq2/360-F-96601262-r2d-O5-G9-WRN2-Mdva-Qjg-MFEKa6fz-OZh5-OO.jpg'
            alt="Hotel Logo"
            className="h-10 w-10 rounded"
          />
          <span className="ml-2 text-xl font-bold text-gray-700">HotelEase</span>
        </div>


        <div className="space-x-6 hidden md:flex items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/rooms"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-500"
            }
          >
            Rooms
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-500"
            }
          >
            Gallery
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-500"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-500"
            }
          >
            Contact
          </NavLink>
          <NavLink
            to= 'mybookings/:roomId'
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-500"
            }
          >
            My-Bookings
          </NavLink>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="relative group">
                <img
                  src={user.photoURL || 'https://i.ibb.co/2dR8D0j/avatar.png'}
                  alt="profile"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                <div className="absolute left-1/2 -translate-x-1/2 top-10 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {user.displayName || user.email}
                </div>
              </div>
              <button
                onClick={logOut}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
