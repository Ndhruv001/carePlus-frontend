function Container({ children }) {
  return (
    <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-800">
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4 dark:bg-gray-900 overflow-auto">
        {children}
      </div>
    </div>
  );
}

export default Container;
