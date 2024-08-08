import { useState } from "react";
import Modal from 'react-modal'
import { Inputbox } from "./inputbox";
import { Bottomwarning } from "./bottomwarning";
import { SignupInput } from "@repo/common";
import { Button } from "./button";
import axios from "axios";
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  initialFormType: 'signup' | 'signin';
}

export const AuthModal = ({ isOpen, onRequestClose, initialFormType }: AuthModalProps) => {

  const [formType, setFormType] = useState(initialFormType);
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: ""
  })

  const navigate = useNavigate();

  const sendRequest = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/${initialFormType === "signup" ? "signup" : "signin"}`, postInputs, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const jwt = res.data.token;
      localStorage.setItem("token", jwt)
      navigate("/blogs")
    } catch (e) {

    }
  }

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
      height: '60%',
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
      <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={modalStyles}>
        <div className="relative flex justify-between items-center mb-10 mt-7">
          <div className="flex-grow text-center font-['Ivar-reg'] font-reg text-3xl">
            {formType === 'signup' ? "Join inkwell." : "Welcome back!"}
          </div>
          <div className="absolute top-[-34px] right-[-11px]">
            <button onClick={onRequestClose} className="ml-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        {formType === 'signup' ? (
          <>
            <div className="flex flex-col items-center mb-8">
              <Inputbox label={"username"} placeholder={"your username"} onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value
                })
              }} />
              <Inputbox label={"email"} placeholder={"your email"} onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  username: e.target.value
                })
              }} />
              <Inputbox label={"password"} type="password" placeholder={"your password"} onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value
                })
              }} />
            </div>
            <div className="flex justify-center mb-8 font-['Ivar-reg'] text-white">
              <Button label={"sign up"} onClick={sendRequest} />
            </div>
            <div>
              <Bottomwarning label={"already have an account?"} buttonText={"sign in"} onClick={() => setFormType('signin')} />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <Inputbox label={"email"} placeholder={"your email"} onChange={
                (e) => {
                  setPostInputs({
                    ...postInputs,
                    username: e.target.value
                  })
                }
              } />
              <Inputbox type="password" label={"password"} placeholder={"your password"} onChange={
                (e) => {
                  setPostInputs({
                    ...postInputs,
                    password: e.target.value
                  })
                }
              } />
            </div>
            <div className="flex justify-center mt-8 mb-8 font-['Ivar-reg'] text-white">
              <Button label={"sign in"} onClick={sendRequest} />
            </div>
            <div>
              <Bottomwarning label={"no account?"} buttonText={"create one"} onClick={() => setFormType('signup')} />
            </div>
          </>
        )}
      </Modal>
    </div >
  );
};

