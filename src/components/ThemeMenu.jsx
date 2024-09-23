import { useState } from "react";
import {
  SunIcon,
  MoonIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

function ThemeMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("System");

  const handleSelect = (theme) => {
    setSelectedTheme(theme);
    document.documentElement.classList.remove("light", "dark", "system");
    if (theme === "Light") {
      document.documentElement.classList.add("light");
    } else if (theme === "Dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "System") {
      document.documentElement.classList.add("system");
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button onClick={() => setIsOpen(!isOpen)} className="py-2">
        {selectedTheme === "Light" && (
          <SunIcon className="w-6 h-6 text-yellow-500" />
        )}
        {selectedTheme === "Dark" && (
          <MoonIcon className="w-6 h-6 text-blue-800 " />
        )}
        {selectedTheme === "System" && (
          <DevicePhoneMobileIcon className="w-6 h-6 text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-300  dark:bg-gray-900  dark:border-gray-700 dark:text-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button
              onClick={() => handleSelect("Light")}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
            >
              <SunIcon className="w-5 h-5 mr-2 text-yellow-500 " />
              Light
            </button>
            <button
              onClick={() => handleSelect("Dark")}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
            >
              <MoonIcon className="w-5 h-5 mr-2 text-blue-800" />
              Dark
            </button>
            <button
              onClick={() => handleSelect("System")}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
            >
              <DevicePhoneMobileIcon className="w-5 h-5 mr-2 text-gray-500" />
              System
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ThemeMenu;
