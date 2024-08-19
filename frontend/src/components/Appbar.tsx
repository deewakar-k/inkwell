import Button from "./Button";
import Button2 from "./Button2";

function Appbar() {
  return (
    <>
      <div className="flex justify-between items-center ml-48 mr-48 mt-6">
        <div className="font-['Ogg'] text-3xl font-extrabold">inkwell</div>
        <div className="flex items-center gap-10">
          <Button label="write" />
          <Button label="sign in" />
          <Button2 label="get started" />
        </div>
      </div>
    </>
  );
}

export default Appbar;
