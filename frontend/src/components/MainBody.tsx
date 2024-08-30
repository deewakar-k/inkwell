interface MainBodyProps {
  body: string;
}

export const MainBody = ({ body }: MainBodyProps) => {
  return (
    <>
      <h3 className="font-['Inter']">{body}</h3>
    </>
  );
};
