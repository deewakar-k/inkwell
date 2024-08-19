import Appbar from "../components/Appbar";
import Hero from "../components/Hero";

function Home() {
  return (
    <>
      <div className="border-b pb-6">
        <Appbar />
      </div>
      <div className="flex flex-col items-center justify-center overflow-hidden mt-52">
        <Hero />
      </div>
    </>
  );
}

export default Home;
