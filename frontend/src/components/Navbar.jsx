import React from "react";
import { Button } from "./ui/button";
import { Link, NavLink } from "react-router-dom";
import { Download } from "lucide-react";

const Navbar = ({setShowNavbar}) => {
  const btnClass = `text-white/50 py-1.5 bg-gray-500/20 hover:bg-gray-500/50 `;
  const btnActiveClass = `text-white font-medium 
  bg-gradient-to-tr from-black from-50% via-black via-60% to-lime-800
  px-4 py-1.5 
  shadow-md shadow-green-900/50 
  border border-green-700 
  rounded-sm`;

  const editBtnClass = `text-white font-semibold 
  bg-gradient-to-tr from-black from-70% via-black via-75% to-lime-800
  px-4 py-2 
  shadow-lg shadow-lime-900/40 
  border border-lime-600 
  rounded-md 
  hover:scale-101
  transition duration-200 ease-in-out`;

  return (
    <div className="flex flex-col justify-between h-[100%] w-full items-center py-15">
      <div className="flex flex-col space-y-3 w-full pl-5 lg:pl-15 pr-2 text-center">
        <NavLink
        onClick={()=>setShowNavbar(false)}
          to={"/"}
          className={({ isActive }) =>
            `${isActive ? btnActiveClass : btnClass}`
          }
        >
          Home
        </NavLink>
        <NavLink
        onClick={()=>setShowNavbar(false)}
          to={"/about"}
          className={({ isActive }) =>
            `${isActive ? btnActiveClass : btnClass}`
          }
        >
          About
        </NavLink>
        <NavLink
        onClick={()=>setShowNavbar(false)}
          to={"/skills"}
          className={({ isActive }) =>
            `${isActive ? btnActiveClass : btnClass}`
          }
        >
          Skills
        </NavLink>
        <NavLink
        onClick={()=>setShowNavbar(false)}
          to={"/projects"}
          className={({ isActive }) =>
            `${isActive ? btnActiveClass : btnClass}`
          }
        >
          Projects
        </NavLink>
        <NavLink
        onClick={()=>setShowNavbar(false)}
          to={"/certificates"}
          className={({ isActive }) =>
            `${isActive ? btnActiveClass : btnClass}`
          }
        >
          Certificates
        </NavLink>
        <a
          href="../../public/RushikeshReddy_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnClass} flex items-center gap-3 justify-center`}
        >
          <Download size={16} /> Resume
        </a>
      </div>
      <div className=" flex flex-col space-y-3 w-full pl-15 pr-2 text-center">
        <NavLink
        onClick={()=>setShowNavbar(false)}
          to={"/edit"}
          className={({ isActive }) => `${
            isActive ? editBtnClass : btnClass
              } px-6 py-2 rounded-sm text-white font-medium 
      bg-gradient-to-r from-[#485563] to-[#29323c] 
      transition-all duration-300`}
            >
          Edit
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
