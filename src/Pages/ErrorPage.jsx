import React from "react";
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <img
        src="https://i.ibb.co/39C96zXd/404-error-page-animation-download-in-lottie-json-gif-static-svg-file-formats-not-found-web-the-ultim.webp" 
        alt="404 Not Found"
        className="w-64 h-64 mb-6"
      />
      <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded shadow"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
