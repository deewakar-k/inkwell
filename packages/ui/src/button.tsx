//@ts-ignore
export const Button = ({ label, onClick }) => {
  return (
    <button onClick={onClick} className="border-[1px] rounded-full px-5 py-1 border-black bg-black">{label}</button>
  );
};
