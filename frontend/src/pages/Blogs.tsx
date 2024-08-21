import Description from "../components/Description";
import Heading from "../components/Heading";
import Navbar from "../components/Navbar";
import Subheading from "../components/Subheading";

function Blogs() {
  return (
    <>
      <div className="border-b pb-6">
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-center mt-6">
        <div className="w-full max-w-2xl">
          <Heading label="Designers: you need to read science fiction" />
          <div className="mt-2 text-left">
            <Subheading label="To anticipate the needs of users of the future, you need to imagine the future." />
          </div>
          <div className="mt-6">
            <Description date="Aug 20" likes="1.3k" comment={27} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Blogs;
