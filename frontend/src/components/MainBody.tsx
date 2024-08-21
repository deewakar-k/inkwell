interface MainBodyProps {
  body: string;
}

export const MainBody = ({ body }: MainBodyProps) => {
  return (
    <>
      <h3 className="">{body}</h3>
    </>
  );
};
