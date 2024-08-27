export const CommentAvatar = () => {
  return (
    <>
      <div className=" flex w-5 h-5 overflow-hidden rounded-full border-[1px]">
        <svg
          className="w-5 h-5 text-[#D5CDC4] -left-[5px]"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
    </>
  );
};
