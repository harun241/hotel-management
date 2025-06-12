import { useContext, useState } from 'react';
import { NavLink } from 'react-router'; 
import { AuthContext } from '../context/AuthProvider';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/rooms', label: 'Rooms' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/mybookings/:id', label: 'My Bookings' }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://i.ibb.co/3m5LJV4d/images.png"
              alt="Hotel Logo"
              className="h-12 w-12 rounded"
            />
            <span className="ml-2 text-xl font-bold text-gray-700">HotelEase</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-700 hover:text-blue-500'
                }
              >
                {label}
              </NavLink>
            ))}

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

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white px-4 py-2 border-t space-y-2">
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? 'block text-blue-600 font-semibold'
                    : 'block text-gray-700 hover:text-blue-500'
                }
              >
                {label}
              </NavLink>
            ))}

            {user ? (
              <div className="mt-2">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={user.photoURL || 'https://i.ibb.co/2dR8D0j/avatar.png'}
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm text-gray-700">{user.displayName || user.email}</span>
                </div>
                <button
                  onClick={() => {
                    logOut();
                    closeMenu();
                  }}
                  className="bg-red-500 text-white px-4 py-1 rounded text-sm w-full hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                onClick={closeMenu}
                className="block bg-black text-white px-4 py-2 rounded mt-2 text-center hover:bg-gray-800 text-sm"
              >
                Login
              </NavLink>
            )}
          </div>
        )}
      </motion.div>
    </nav>
  );
};

export default Navbar;
