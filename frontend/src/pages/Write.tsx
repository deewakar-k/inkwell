import TextNavbar from "../components/TextNavbar";
import Tiptap from "../components/Titap";

export const Write = () => {
  return (
    <>
      <div className="border-b pb-6 border-[#D5CDC4]">
        <TextNavbar />
      </div>
      <div className="flex justify-center mt-8">
        <div className="w-full max-w-2xl">
          <Tiptap />
        </div>
      </div>
    </>
  );
};
