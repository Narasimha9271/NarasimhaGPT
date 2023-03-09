import React from "react";

const Button = ({ name }) => {
  return (
    <div>
      <button className="rounded-lg bg-[#f5f5f5] font-semibold hover:bg-[#eaeaea] text-black mr-[12px] height-[32px]  whitespace-nowrap flex  align-middle justify-center px-[12px] py-[8px] text-[13px] text-center">
        {name}
      </button>
    </div>
  );
};

export default Button;
