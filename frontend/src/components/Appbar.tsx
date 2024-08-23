import { Link } from "react-router-dom";
import Button from "./Button";
import Button2 from "./Button2";
import ModalComp from "./Modal";

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
          <Button label="write" />
          <ModalComp />
        </div>
      </div>
    </>
  );
}

export default Appbar;
