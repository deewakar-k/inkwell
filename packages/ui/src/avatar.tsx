import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="flex ">
      <FlyoutLink href="#" FlyoutContent={UserContent}>
        <div className="flex justify-center items-center w-10 h-10 rounded-full border-[1px] border-black text-black capitalize">{name[0]}</div>
      </FlyoutLink>
    </div>
  );
};

//@ts-ignore
const FlyoutLink = ({ children, href, FlyoutContent }) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit"
    >
      <a href={href} className="relative text-white">
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full transition-transform duration-300 ease-out"
        />
      </a>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-[#EFEFEF] text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const UserContent = () => {
  return (
    <div className="w-64 bg-white p-6 shadow-xl">
      <div className="mb-6 space-y-3">
        <a href="#" className="block text-sm hover:underline">
          Profile
        </a>
        <a href="#" className="block text-sm hover:underline">
          Bookmarks
        </a>
        <a href="#" className="block text-sm hover:underline">
          Stories
        </a>
      </div>
      <button className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
        sign out
      </button>
    </div>
  );
};

export default Avatar;
