import { Link } from "react-router"; 

const SpecialOfferModal = ({ onClose,  }) => {
  return (
    <div className="fixed inset-0  bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Special Offers & Promotions</h2>
        <img
          src="https://i.ibb.co/ZRPdrdhc/9bb6e7478bc26b8e99d462c7349bfa27.jpg"
          alt="Special Offer"
          className="rounded-md mb-4 w-full object-cover h-72"
        />
        <p className="text-center text-gray-700 mb-6">
          Enjoy up to <span className="font-bold text-red-600">25% OFF</span> on selected rooms. Book now and make your stay unforgettable!
        </p>
        <div className="text-center">
          <Link to={"/rooms"}>
            <button className="w-full btn btn-info text-white py-2 px-4 rounded-lg  transition duration-200">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpecialOfferModal;
