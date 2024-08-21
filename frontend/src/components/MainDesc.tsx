import Description from "./Description";

interface MainDescProps {
  author: string;
}

export const MainDesc = ({ author }: MainDescProps) => {
  return (
    <>
      <div>
        <div className="text-sm font-extrabold font-['Inter']">
          <h5>{author}</h5>
        </div>
        <div className="mt-2">
          <Description date="Aug 20" likes="1.3k" comment={27} />
        </div>
      </div>
    </>
  );
};
