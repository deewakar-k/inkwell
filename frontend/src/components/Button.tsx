interface ButtonProps {
  label: string;
}

function Button({ label }: ButtonProps) {
  return (
    <>
      <div className="cursor-pointer hover:underline font-['Inter'] text-sm">
        {label}
      </div>
    </>
  );
}

export default Button;
