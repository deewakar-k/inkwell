import { RichTextContext } from "./RichTextContext";
import "../index.css";

interface MainBodyProps {
  body: string;
}

export const MainBody = ({ body }: MainBodyProps) => {
  return (
    <>
      <h3 className="font-['Inter']">
        <RichTextContext content={body} />
      </h3>
    </>
  );
};
