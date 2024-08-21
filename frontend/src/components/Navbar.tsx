import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import Button from "./Button";

function Navbar() {
  return (
    <>
      <div className="flex justify-between items-center ml-48 mr-48 mt-6">
        <Link to={"/"}>
          <div className="font-['Ogg'] text-3xl font-extrabold cursor-pointer">
            inkwell
          </div>
        </Link>
        <div className="flex items-center gap-10">
          <Button label="write" />
          <Button label="sign in" />
          <div className="cursor-pointer">
            <Avatar />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
