import React from "react";

const Button = ({
  children,
  onClick,
  className = "",
  type = "button",
  bgColor = "primary",
  full = false,
  ...props
}) => {
  let bgClassName = "bg-primary";
  switch (bgColor) {
    case "primary":
      bgClassName = "bg-primary";
      break;
    case "secondary":
      bgClassName = "bg-secondary";
      break;
    default:
      break;
  }
  return (
    <button
      className={`py-3 px-6 rounded-lg text-white ${bgClassName} ${
        full ? "w-full" : ""
      } capitalize mt-auto ${className}`}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
