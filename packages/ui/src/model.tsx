import { useState } from "react";
import Modal from 'react-modal'
import { Inputbox } from "./inputbox";
import { Bottomwarning } from "./bottomwarning";

//@ts-ignore
export const Model = ({ label, heading }) => {

  const [open, setOpen] = useState(false);

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      zIndex: 999,
      backdropFilter: 'blur(2px)'
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: '500px',
      border: 'none',
      background: '#fff',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '6px',
      padding: '20px',
      overflow: 'hidden',
    }
  };

  return (
    <div>
      <button onClick={() => {
        setOpen(true)
      }}>{label}</button>
      <Modal isOpen={open} onRequestClose={() => { setOpen(false) }} style={modalStyles}>
        <div className="relative flex justify-between items-center mb-10 mt-7">
          <div className="flex-grow text-center font-['Ivar-reg'] font-bold text-3xl">
            {heading}
          </div>
          <div className="absolute top-[-34px] right-[-11px]">
            <button onClick={() => { setOpen(false) }} className="ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center mb-16">
          <Inputbox label={"username"} placeholder={"your username"} />
          <Inputbox label={"password"} placeholder={"your password"} />
        </div>
        <div>
          <Bottomwarning label={"no account?"} buttonText={"create one"} to={"/"} />
        </div>
      </Modal>
    </div >
  );
};
