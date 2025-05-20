import Link from "next/link"
import { IoMdArrowForward } from "react-icons/io";

const NavBtn = () => {
  return (
    <div className="flex">
       <Link href="https://wa.me/+918105459006" target="_blank">
      <div
        className={`
          relative z-0 flex items-center gap-2 overflow-hidden rounded-lg border-[1px] 
          border-white px-4 py-2 font-semibold
          uppercase text-white transition-all duration-500
          
          before:absolute before:inset-0
          before:-z-10 before:translate-x-[150%]
          before:translate-y-[150%] before:scale-[2.5]
          before:rounded-[100%] before:bg-[#5F14E0]
          before:transition-transform before:duration-1000
          before:content-[""]
  
          hover:scale-105 hover:border-[#5F14E0]
          hover:before:translate-x-[0%]
          hover:before:translate-y-[0%]
          active:scale-95`}
      >
        <span className="text-sm md:text-base">Get In Touch</span>
        <IoMdArrowForward className="text-xl md:text-2xl" />
      </div>
    </Link>
    </div>
  );
};

export default NavBtn;
