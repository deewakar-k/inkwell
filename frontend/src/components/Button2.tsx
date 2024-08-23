import { useState } from "react";

interface ButtonProps {
  label: string;
  onClick?: React.MouseEventHandler;
}

function Button2({ label, onClick }: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      className={`
        cursor-pointer font-['Inter'] text-sm rounded-full border px-4 py-2
        transition-all duration-200 ease-in-out
        ${isHovered ? "bg-[#D5CDC4] text-black" : "bg-transparent text-current"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </button>
  );
}

export default Button2;
