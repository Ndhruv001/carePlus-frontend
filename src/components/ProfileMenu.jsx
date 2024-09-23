import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../lib/config/axiosInstance";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import ProfileImage from "@/assets/profile-image.jpeg";
import {
  ArrowRightEndOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

function ProfileMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("user/logout"),
    onSuccess: () => {
      toast.success("Logged out successfully.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    },
    onError: (error) => {
      console.error("🚀 ~ logout ~ error:", error);
      toast.error("Something went wrong! Please try again later.");
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  function handleLogout() {
    setIsSubmitting(true);
    logout();
  }

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div ref={dropdownRef} className="pt-1.5">
      <button
        onClick={toggleDropdown}
        className="flex items-center focus:outline-none"
      >
        <img
          src={ProfileImage}
          alt=""
          height={30}
          width={30}
          className="rounded-full border-gray-500 hover:border-2"
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded-md shadow-lg py-2 z-50">
          <NavLink
            to="#"
            className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-800 dark:text-white font-medium"
          >
            <UserIcon className="h-5 w-5 mr-2 text-blue-600 dark:text-white" />
            View Profile
          </NavLink>
          <button
            className="flex items-center w-full text-left px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 dark:bg-gray-900 dark:hover:bg-gray-800 font-medium rounded-b-md"
            onClick={handleLogout}
          >
            <ArrowRightEndOnRectangleIcon className="h-5 w-5 mr-2 text-red-500" />
            {isSubmitting ? "Submitting.." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
