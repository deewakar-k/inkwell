import Modal from "react-modal";
import Button from "./Button";
import { useState } from "react";

const ModalComp = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="sign in" onClick={() => setOpen(true)} />
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
        <div className="flex flex-col items-center justify-center h-full relative">
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

          <h1 className="font-medium font-['Inter'] text-2xl mb-4">
            Welcome Back!
          </h1>
        </div>
      </Modal>
    </>
  );
};
export default ModalComp;
