function Label({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-gray-800 dark:text-gray-400 text-sm font-medium mb-1"
    >
      {children}
    </label>
  );
}

export default Label;
