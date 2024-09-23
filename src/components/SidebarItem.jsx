import { NavLink } from "react-router-dom";

function SidebarItem({ path, children }) {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `flex items-center gap-3 text-sm cursor-pointer py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
            isActive
              ? "bg-gray-100 text-black dark:bg-gray-800 dark:text-white font-bold"
              : "bg-white text-gray-500 dark:bg-gray-900 dark:text-gray-400 font-medium"
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );
}

export default SidebarItem;
