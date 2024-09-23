function Button({ color, onClick, disabled = false, children }) {
  const colors = {
    blue: "bg-blue-500 hover:bg-blue-600",
    red: "bg-red-500 hover:bg-red-600",
    green: "bg-green-500 hover:bg-green-600",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
  };

  const colorClass = colors[color] || colors["blue"];

  const baseClasses = "text-white px-4 py-1 rounded mr-1 ";

  const disabledClasses = "bg-gray-400 cursor-not-allowed";

  const buttonClasses = `${baseClasses} ${
    disabled ? disabledClasses : colorClass
  }`;

  return (
    <button onClick={onClick} disabled={disabled} className={buttonClasses}>
      {children}
    </button>
  );
}

export default Button;
