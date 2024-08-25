import Modal from "react-modal";
import Button from "./Button";
import { useState } from "react";
import { InputBox } from "./InputBox";
import Button2 from "./Button2";
import { BottomWarning } from "./BottomWarning";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthModal = () => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("signin");

  const [postInputs, setPostInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const sendRequest = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${modalType === "signin" ? "signin" : "signup"}`,
        postInputs,
      );

      const { jwt } = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      console.log(e);
      alert("error while signing up");
    }
  };

  const handleOpenModal = (type: string) => {
    setModalType(type);
    setOpen(true);
  };

  const handleSwitchModal = () => {
    const newType = modalType === "signin" ? "signup" : "signin";
    setModalType(newType);
  };

  return (
    <>
      <Button label="sign in" onClick={() => handleOpenModal("signin")} />
      <Button2 label="get started" onClick={() => handleOpenModal("signup")} />

      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        style={{
          content: {
            backgroundColor: "#111",
            padding: "20px",
            border: "none",
            borderRadius: "10px",
            maxWidth: "500px",
            width: "90%",
            height: "50%",
            margin: "auto",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            position: "relative",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(1px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <div className="flex flex-col items-center h-full relative">
          <button
            onClick={() => setOpen(false)}
            className="absolute -top-2 -right-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
            </svg>
          </button>
          {modalType === "signin" ? (
            <h1 className="font-medium font-['Inter'] text-2xl mt-14">
              Welcome Back!
            </h1>
          ) : (
            <h1 className="font-medium font-['Inter'] text-2xl mt-14">
              Join inkwell.
            </h1>
          )}
          <div className="flex flex-col mt-6">
            {modalType !== "signin" && (
              <div className="mt-6">
                <InputBox
                  label="name"
                  type="text"
                  placeholder="your name"
                  onChange={(e) => {
                    setPostInputs({
                      ...postInputs,
                      name: e.target.value,
                    });
                  }}
                />
              </div>
            )}
            <div className={modalType === "signin" ? "mt-6" : "mt-4"}>
              <InputBox
                label="email"
                type={"email"}
                placeholder="email"
                onChange={(e) =>
                  setPostInputs({
                    ...postInputs,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="mt-4">
              <InputBox
                label="password"
                type={"password"}
                placeholder="password"
                onChange={(e) =>
                  setPostInputs({
                    ...postInputs,
                    password: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className={modalType === "signin" ? "mt-10" : "mt-6"}>
            <Button2
              label={modalType === "signin" ? "sign in" : "sign up"}
              onClick={sendRequest}
            />
          </div>
          <div className="absolute bottom-0">
            <BottomWarning
              label={
                modalType === "signin"
                  ? "no account?"
                  : "already have an account?"
              }
              buttonText={modalType === "signin" ? "create one" : "sign in"}
              onClick={handleSwitchModal}
            />
          </div>{" "}
        </div>
      </Modal>
    </>
  );
};
export default AuthModal;
