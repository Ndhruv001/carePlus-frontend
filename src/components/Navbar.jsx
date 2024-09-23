import { BellIcon } from "@heroicons/react/24/outline";
import { NavLink, useLocation } from "react-router-dom";
import CompanyLogo from "./CompanyLogo";
import ProfileMenu from "./ProfileMenu";
import ThemeMenu from "./ThemeMenu";

function Navbar() {
  const { pathname } = useLocation();
  const rootPath = pathname.split("/")[1];
  return (
    <div className="flex justify-between">
      <CompanyLogo />
      <div className="w-28 flex justify-between">
        <ThemeMenu />
        <NavLink
          to={`/${rootPath}/notifications`}
          className="flex justify-center items-center"
        >
          <BellIcon width={25} />
        </NavLink>
        <ProfileMenu />
      </div>
    </div>
  );
}

export default Navbar;
