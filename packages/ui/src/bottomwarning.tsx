import { Link } from 'react-router-dom'
//@ts-ignore
export const Bottomwarning = ({ label, buttonText, to }) => {
  return (
    <div className="flex justify-center text-s font-['Ivar-reg']">
      <div className="text-zinc-500">
        {label}
      </div>
      <Link className="cursor-pointer underline pl-1 font-['Ivar-bold']" to={to}>
        {buttonText}
      </Link>
    </div>);
};
