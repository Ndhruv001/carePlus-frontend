import Navbar from "./Navbar";

function AppLayout({ children }) {
  return (
    <div className="bg-gray-100 p-3 w-full h-screen overflow-hidden dark:bg-gray-800 dark:text-white">
      <Navbar />
      <div className="w-full h-full pl-12 pt-7 bg-gray-100 flex gap-1 dark:bg-gray-800 dark:text-white ">
        {children}
      </div>
    </div>
  );
}

export default AppLayout;
