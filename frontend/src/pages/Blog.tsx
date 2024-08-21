import { MainBody } from "../components/MainBody";
import { MainDesc } from "../components/MainDesc";
import { MainHeading } from "../components/MainHeading";
import Navbar from "../components/Navbar";
import Subheading from "../components/Subheading";

export const Blog = () => {
  return (
    <>
      <div className="border-b border-[#D5CDC4] pb-6">
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-center mt-14">
        <div className="w-full max-w-2xl">
          <MainHeading label="Designers: you need to read science fiction" />
          <div className="mt-4 font-medium">
            <Subheading label="To anticipate the needs of users of the future, you need to imagine the future." />
          </div>
          <div className="mt-8 text-left text-sm">
            <MainBody body="Science fiction has long been the inspiration behind new leaps in scientific achievement. As I mentioned in a previous article about Star Trek predicting the future of user experience, Nebula Award-winning sci-fi writer Pamela Sargent called the genre, “the literature of ideas.” And we should treat it as such. This is why I think that more people in tech, especially UX professionals, need to embrace their inner nerd and get into science fiction. The genre has the capacity to open and expand your mind, permitting readers to speculate on, if not outright predict, the future." />
          </div>
          <div className="mt-14 border-b border-[#D5CDC4] border-opacity-20 pb-6">
            <MainDesc author="Anonymous" />
          </div>
        </div>
      </div>
    </>
  );
};
