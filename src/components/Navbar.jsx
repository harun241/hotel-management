import { useContext, useState } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../context/AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/rooms', label: 'Rooms' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: `/mybookings/${user?.uid || ''}`, label: 'My Bookings' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://i.ibb.co/3m5LJV4d/images.png"
              alt="Hotel Logo"
              className="h-12 w-12 rounded"
            />
            <span className="ml-2 text-xl font-bold text-gray-700 dark:text-gray-200 hidden md:inline-block">
              HotelEase
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
                }
              >
                {label}
              </NavLink>
            ))}

            {user ? (
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL || 'https://i.ibb.co/2dR8D0j/avatar.png'}
                  alt="profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
                  {user.displayName || user.email}
                </span>
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

          {/* Mobile Profile/Login + Menu Toggle */}
          <div className="md:hidden flex items-center ml-5 gap-3">
            {user ? (
              <>
                <img
                  src={user.photoURL || 'https://i.ibb.co/2dR8D0j/avatar.png'}
                  alt="profile"
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={logOut}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm"
              >
                Login
              </NavLink>
            )}

            <button onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? (
                <X size={28} className="text-gray-700 dark:text-white" />
              ) : (
                <Menu size={28} className="text-gray-700 dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu - overlay, dark/light theme */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-[64px] left-0 right-0 bg-white dark:bg-gray-900 z-40 shadow-md border-t border-gray-200 dark:border-gray-700 px-4 py-4"
              style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}
            >
              {navLinks.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive
                      ? 'block text-blue-600 dark:text-blue-400 font-semibold py-2'
                      : 'block text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 py-2'
                  }
                >
                  {label}
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
};

export default Navbar;
