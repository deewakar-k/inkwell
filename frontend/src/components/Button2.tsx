import { useState } from "react";

interface ButtonProps {
  label: string;
}

function Button2({ label }: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        cursor-pointer font-['Inter'] text-sm rounded-full border px-4 py-2
        transition-all duration-200 ease-in-out
        ${isHovered ? "bg-[#D5CDC4] text-black" : "bg-transparent text-current"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </div>
  );
}

export default Button2;
