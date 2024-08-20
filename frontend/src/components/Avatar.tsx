function Avatar() {
  return (
    <>
      <div className="relative w-8 h-8 overflow-hidden rounded-full border-[1px]">
        <svg
          className="absolute w-10 h-10 text-[#D5CDC4] -left-[5px]"
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
}

export default Avatar;
