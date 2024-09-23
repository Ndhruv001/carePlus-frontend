import { forwardRef } from "react";

const Input = forwardRef(
  (
    { id = "", type = "text", placeholder = "", autoComplete, ...props },
    ref
  ) => {
    return (
      <input
        ref={ref}
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...props}
        className="w-full p-2 border border-gray-300 dark:border-gray-400 focus:outline-none pl-4 bg-gray-100 dark:bg-gray-900 rounded-md  text-black dark:text-white  dark:placeholder-gray-400 dark:appearance-none"
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
