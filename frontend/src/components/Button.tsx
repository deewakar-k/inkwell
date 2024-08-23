interface ButtonProps {
  label: string;
  onClick: React.MouseEventHandler;
}

function Button({ label, onClick }: ButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        className="cursor-pointer hover:underline font-['Inter'] text-sm"
      >
        {label}
      </button>
    </>
  );
}

export default Button;
