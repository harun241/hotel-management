import { NavLink } from 'react-router';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src='https://i.ibb.co/kkx8Cq2/360-F-96601262-r2d-O5-G9-WRN2-Mdva-Qjg-MFEKa6fz-OZh5-OO.jpg'
            alt="Hotel Logo"
            className="h-10 w-10 rounded "
          />
          <span className="ml-2 text-xl font-bold text-gray-700">HotelEase</span>
        </div>

        {/* Links */}
        <div className="space-x-6 hidden md:flex">
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
             className='bg-black text-white btn btn-ghost'
            
            
        
          >
            <button>Login</button>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
