interface SubheadProps {
  label: string;
}

function Subheading({ label }: SubheadProps) {
  return <h3 className="font-['Inter'] opacity-80">{label}</h3>;
}

export default Subheading;
