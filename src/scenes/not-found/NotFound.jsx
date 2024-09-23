import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found.</p>
        <p className="text-gray-500 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <NavLink
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-1"
        >
          Go Back Home
        </NavLink>
      </div>
    </div>
  );
}

export default NotFound;
