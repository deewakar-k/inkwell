import Description from "./Description";

interface MainDescProps {
  author: string;
  blogId: string;
  date: string;
}

export const MainDesc = ({ date, author, blogId }: MainDescProps) => {
  return (
    <>
      <div>
        <div className="text-sm font-extrabold font-['Inter']">
          <h5>{author}</h5>
        </div>
        <div className="mt-2">
          <Description date={date} blogId={blogId} />
        </div>
      </div>
    </>
  );
};
