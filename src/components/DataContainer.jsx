function DataContainer({ children, ...props }) {
  return (
    <div
      key={props}
      className="bg-gray-100 p-4 rounded-lg shadow-sm dark:bg-gray-800"
    >
      {children}
    </div>
  );
}

export default DataContainer;
