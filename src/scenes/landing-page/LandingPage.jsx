import { NavLink } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-black mb-2">
          Welcome to CarePlus
        </h1>
        <p className="text-lg text-gray-600">Choose your path to continue</p>
      </div>

      {/* Buttons Section */}
      <div className="flex space-x-4">
        <NavLink
          to="/patient-registration"
          className="px-6 py-3 bg-white text-black rounded-md shadow-md hover:bg-gray-200"
        >
          Patient
        </NavLink>
        <NavLink
          to="/doctor-registration"
          className="px-6 py-3 bg-black text-white rounded-md shadow-md hover:bg-gray-900"
        >
          Doctor
        </NavLink>
      </div>

      {/* Footer Links */}
      <div className="mt-12 text-center">
        <p className="text-gray-500">
          <NavLink
            to="/about-us"
            className="text-blue-700 hover:underline mx-2 "
          >
            About Us
          </NavLink>{" "}
          |
          <NavLink
            to="/contact-us"
            className="text-blue-700 hover:underline mx-2"
          >
            Contact Us
          </NavLink>{" "}
          |
          <NavLink to="/login" className="text-blue-700 hover:underline mx-2">
            Login
          </NavLink>
        </p>
        <p className="text-gray-400 mt-4">
          &copy; 2024 CarePlus. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
