import { Button } from './button'
import './styles.css'

export const Navbar = () => {
  return (
    <>
      <div className="w-full px-52 py-4 flex justify-between items-center border-b border-black">
        <div className="flex text-6xl font-['cardinalfruit-med']">inkwell</div>
        <div className="flex items-center gap-10 font-['cardinalfruit-med'] text-xl">
          <a href="">write</a>
          <a href="">sign in</a>
          <Button label={"get started"} />
        </div>
      </div>
    </>
  )
}
