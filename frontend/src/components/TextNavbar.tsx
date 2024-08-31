import { Link } from "react-router-dom";
import Menu from "./FlyoutMenu";

function TextNavbar() {
  return (
    <>
      <div className="flex justify-between items-center ml-48 mr-48 mt-6">
        <Link to={"/blogs"}>
          <div className="font-['Ogg'] text-3xl font-extrabold cursor-pointer">
            inkwell
          </div>
        </Link>
        <div className="flex items-center gap-10">
          <div className="cursor-pointer">
            <Menu />
          </div>
        </div>
      </div>
    </>
  );
}

export default TextNavbar;
