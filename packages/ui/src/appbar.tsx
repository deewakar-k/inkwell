import Avatar from "./avatar";

export const Appbar = () => {
  return (
    <>
      <div className="w-full px-52 py-4 flex justify-between items-center border-b border-gray-500">
        <div className="flex text-5xl font-['Ivar-reg']">inkwell</div>
        <div className="flex items-center font-['Ivar-reg'] text-l gap-10">
          <div>
            <button>write</button>
          </div>
          <Avatar name={"daksh"} />
        </div>
      </div>
    </>
  );
};
