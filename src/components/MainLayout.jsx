import convertPathToHeaderName from "@/lib/helpers/convertPathToHeaderName";
import { Outlet, useLocation } from "react-router-dom";

function MainLayout() {
  const { pathname } = useLocation();
  const header = convertPathToHeaderName(pathname);

  return (
    <div className="bg-white p-10 text-black dark:bg-gray-900 dark:text-white w-9/12  flex flex-col">
      <header className="font-bold text-2xl font-serif ">{header}</header>
      <main className="mt-5 border-gray-200 dark:border-gray-700 border-b-2 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
export default MainLayout;
