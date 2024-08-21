interface InputProps {
  type: string;
  placeholder: string;
}

export const InputBox = ({ type, placeholder }: InputProps) => {
  return (
    <>
      <input type={type} placeholder={placeholder} required />
    </>
  );
};
