import { HomeIcon } from "@heroicons/react/24/solid";
import { NavLink, useLocation } from "react-router-dom";

function SidebarLayout({ children }) {
  const location = useLocation();
  const parentPathName = location.pathname.split("/")[1];

  return (
    <div className="w-3/12 h-full bg-white text-black dark:bg-gray-900 dark:text-white p-6 flex flex-col rounded-tl-3xl font-sans">
      <div className="flex items-start justify-start mt-4 mb-4">
        <div className="flex gap-5 text-2xl font-bold text-center font-serif text-black dark:text-white">
          Dashboard
          <NavLink to={`/${parentPathName}`} className="mb-1">
            <HomeIcon width={25} />
          </NavLink>
        </div>
      </div>
      <div className="mt-3 w-full">
        <ul className="space-y-2">{children}</ul>
      </div>
    </div>
  );
}

export default SidebarLayout;
