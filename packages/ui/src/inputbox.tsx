import { ChangeEvent } from "react";

interface InputBoxType {
  label: string,
  placeholder: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string
}

export const Inputbox = ({ label, placeholder, onChange, type }: InputBoxType) => {
  return (
    <div className="flex flex-col py-1">
      <div className="text-s font-['Ivar-reg'] text-left py-1">
        {label}
      </div>
      <div>
        <input onChange={onChange} type={type || "text"} placeholder={placeholder} className="text-s w-80 px-2 py-1 border rounded-sm border-slate-200 focus:outline-none font-['Ivar-it']" />
      </div>
    </div>
  );
};
