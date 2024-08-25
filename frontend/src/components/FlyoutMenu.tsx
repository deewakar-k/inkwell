import React, { useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Avatar from "./Avatar";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Menu: React.FC = () => {
  return (
    <div className="flex justify-center">
      <FlyoutLink href="#" FlyoutContent={Content}>
        <Avatar />
      </FlyoutLink>
    </div>
  );
};

interface FlyoutLinkProps {
  children: ReactNode;
  href: string;
  FlyoutContent: React.FC;
}

const FlyoutLink: React.FC<FlyoutLinkProps> = ({
  children,
  href,
  FlyoutContent,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit"
    >
      <a href={href} className="relative text-white">
        {children}
      </a>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-white text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#111]" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Content: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-64 bg-[#111] p-6 shadow-xl text-[#D5CDC4]">
      <div className="mb-3 space-y-3">
        <a href="#" className="block text-sm hover:underline">
          profile
        </a>
        <a href="#" className="block text-sm hover:underline">
          bookmarks
        </a>
      </div>
      <div className="mb-6 space-y-3"></div>
      <Button
        label="sign out"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      />
    </div>
  );
};

export default Menu;
