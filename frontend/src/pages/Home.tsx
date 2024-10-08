import { Link } from "react-router-dom";
import Appbar from "../components/Appbar";
import Button2 from "../components/Button2";
import Hero from "../components/Hero";

function Home() {
  return (
    <>
      <div className="border-b pb-6">
        <Appbar />
      </div>
      <div className="flex flex-col items-center justify-center overflow-hidden mt-52">
        <Hero />
        <div className="pt-28">
          <Link to={"/blogs"}>
            <Button2 label="start reading" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
