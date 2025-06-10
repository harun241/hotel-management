import { useContext } from 'react';
import { NavLink } from 'react-router'; 
import { AuthContext } from '../context/AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
          <motion.div
  initial={{ opacity: 0, y: 20 }}  // Starting state
  animate={{ opacity: 1, y: 0 }}   // Animate to this state
  exit={{ opacity: 0, y: 20 }}     // Animate when component unmounts
  transition={{ duration: 0.5 }}   // Animation duration and easing
>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
    
     
        <div className="flex items-center">
          <img
            src="https://i.ibb.co/3m5LJV4d/images.png"
            alt="Hotel Logo"
            className="h-16 w-16 rounded"
          />
          <span className="ml-2 text-xl font-bold text-gray-700">HotelEase</span>
        </div>

       
        <div className="space-x-6 hidden md:flex items-center">
          {['/', '/rooms', '/gallery', '/about', '/contact'].map((path, idx) => {
            const names = ['Home', 'Rooms', 'Gallery', 'About', 'Contact'];
            return (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-700 hover:text-blue-500'
                }
              >
                {names[idx]}
              </NavLink>
            );
          })}

          <NavLink
            to="/mybookings/:roomId"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold'
                : 'text-gray-700 hover:text-blue-500'
            }
          >
            My Bookings
          </NavLink>

          
          {user ? (
            <div className="flex items-center gap-3">
          
              <div className="relative group">
                <img
                  src={user.photoURL || 'https://i.ibb.co/2dR8D0j/avatar.png'}
                  alt="profile"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50 pointer-events-none">
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
 </motion.div>
    </nav>
  );
};

export default Navbar;
