import { Link } from "react-router-dom";

interface BlogCardProps {
  id: number,
  title: string,
  content: string,
  publishedDate: string
}

export const Blogcard = ({
  id,
  title,
  content,
  publishedDate
}: BlogCardProps) => {
  return (
    <>
      <Link to={`blog/${id}`}>
        <div className="mt-5 w-screen max-w-4xl">
          <div className="font-['Ivar-bold'] break-words text-3xl font-bold">
            {title}
          </div>
          <div className="font-['Ivar-reg'] text-lg text-zinc-600 mt-1">
            {content.length > 100 ? content.slice(0, 200) + "..." : content}
          </div>
          <div className="flex justify-start mt-4 mb-5 font-['Ivar-reg']">
            <div className="pr-4 flex space-x-2">
              <p>{publishedDate},</p>
              <p>{`${Math.ceil(content.length / 100)} min read`}</p>
            </div>
          </div>
          <div className="w-full border-b border-gray-300"></div>
        </div>
      </Link>
    </>
  );
};
