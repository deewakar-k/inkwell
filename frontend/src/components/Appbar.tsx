import { Link } from "react-router-dom";
import Button from "./Button";
import AuthModal from "./Modal";

function Appbar() {
  return (
    <>
      <div className="flex justify-between items-center ml-48 mr-48 mt-6">
        <Link to={"/"}>
          <div className="font-['Ogg'] text-3xl font-extrabold cursor-pointer">
            inkwell
          </div>
        </Link>
        <div className="flex items-center gap-10">
          <Link to={"/write"}>
            <Button label="write" />
          </Link>
          <AuthModal />
        </div>
      </div>
    </>
  );
}

export default Appbar;
