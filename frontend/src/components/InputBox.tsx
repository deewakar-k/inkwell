interface InputProps {
  label: string;
  type: string;
  placeholder: string;
}

export const InputBox = ({ label, type, placeholder }: InputProps) => {
  return (
    <>
      <div className="text-xs font-['Inter'] text-left py-1">{label}</div>
      <input
        type={type}
        placeholder={placeholder}
        required
        className="text-xs text-[#D5CDC4] w-full px-2 py-1 border rounded-md border-zinc-700 bg-[#111] focus:outline-none focus:border-white font-['Inter']"
      />
    </>
  );
};
