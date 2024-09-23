function Searchbar({ filter, setFilter }) {
  return (
    <div className="flex justify-end mb-4 ">
      <input
        type="text"
        value={filter}
        placeholder="Search..."
        onChange={(e) => setFilter(e.target.value)}
        className="p-2 px-3 border border-gray-300 dark:border-gray-400 dark:bg-gray-900 dark:text-white rounded-3xl outline-none focus:outline-none"
      />
    </div>
  );
}

export default Searchbar;
