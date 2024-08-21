interface MainHeaderProps {
  label: string;
}

export const MainHeading = ({ label }: MainHeaderProps) => {
  return <h1 className="font-['Inter'] font-extrabold text-5xl">{label}</h1>;
};
