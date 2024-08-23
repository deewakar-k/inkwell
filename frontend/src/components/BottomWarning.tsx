interface BottomProps {
  label: string;
  buttonText: string;
  onClick?: React.MouseEventHandler;
}

export const BottomWarning = ({ label, buttonText, onClick }: BottomProps) => {
  return (
    <>
      <div className="flex justify-center text-sm font-['Inter']">
        <div>{label}</div>
        <div onClick={onClick} className="underline cursor-pointer">
          {buttonText}
        </div>
      </div>
    </>
  );
};
