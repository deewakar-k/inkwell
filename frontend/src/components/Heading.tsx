interface HeadProps {
  label: string;
}

function Heading({ label }: HeadProps) {
  return <h1 className="font-['Inter'] font-extrabold text-3xl">{label}</h1>;
}

export default Heading;
