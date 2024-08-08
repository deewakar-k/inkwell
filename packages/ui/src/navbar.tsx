import { useState } from 'react'
import { AuthModal } from './authmodal'
import './styles.css'

export const Navbar = () => {

  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isSigninOpen, setIsSigninOpen] = useState(false);

  return (
    <>
      <div className="w-full px-52 py-4 flex justify-between items-center border-b border-gray-500">
        <div className="flex text-5xl font-['Ivar-reg']">inkwell</div>
        <div className="flex items-center gap-10 font-['Ivar-reg'] text-l">
          <a href="">write</a>
          <button onClick={() => setIsSigninOpen(true)} className="">
            sign in
          </button>
          <button onClick={() => setIsSignupOpen(true)} className="border-[1px] rounded-full px-5 py-1 border-black">
            sign up
          </button>
        </div>
      </div>
      <AuthModal isOpen={isSignupOpen} onRequestClose={() => setIsSignupOpen(false)} initialFormType="signup" />
      <AuthModal isOpen={isSigninOpen} onRequestClose={() => setIsSigninOpen(false)} initialFormType="signin" />
    </>
  )
}
