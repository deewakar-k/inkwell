//@ts-ignore
export const Inputbox = ({ label, placeholder }) => {
  return (
    <div className="flex flex-col py-2">
      <div className="text-s font-['Ivar-reg'] text-left py-1">
        {label}
      </div>
      <div>
        <input placeholder={placeholder} className="text-s w-80 px-2 py-1 border rounded-sm border-slate-200 focus:outline-none font-['Ivar-it']" />
      </div>
    </div>
  );
};
