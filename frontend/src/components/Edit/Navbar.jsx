import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const Navbar = ({setShowNavbar}) => {
    const navigate = useNavigate()
    const logout = async () => {
        localStorage.clear();
        navigate("/");
      };
      
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
    <div className="flex flex-col  justify-between h-[100%] items-center py-15">
      <div className="flex flex-col space-y-3 w-full pl-5 lg:pl-15 pr-2 text-center">
        <NavLink
        onClick={()=>setShowNavbar(false)}
          to={"/edit"}
          end
          className={({ isActive }) =>
            `${isActive ? btnActiveClass : btnClass}`
          }
        >
          Personal Details
        </NavLink>
        <NavLink
        onClick={()=>setShowNavbar(false)}
          to={"/edit/about"}
          className={({ isActive }) =>
            `${isActive ? btnActiveClass : btnClass}`
          }
        >
          About Data
        </NavLink>
        <NavLink
        onClick={()=>setShowNavbar(false)}
          to={"/edit/skills"}
          className={({ isActive }) =>
            `${isActive ? btnActiveClass : btnClass}`
          }
        > 
          Skills Data
        </NavLink>
        <NavLink
        onClick={()=>setShowNavbar(false)}
          to={"/edit/projects"}
          className={({ isActive }) =>
            `${isActive ? btnActiveClass : btnClass}`
          }
        >
          Projects Data
        </NavLink>
        <NavLink
        onClick={()=>setShowNavbar(false)}
          to={"/edit/certificates"}
          className={({ isActive }) =>
            `${isActive ? btnActiveClass : btnClass}`
          }
        >
          Certificates Data
        </NavLink>
        
      </div>
      <div className=" flex flex-col space-y-3 w-full pl-15 pr-2 text-center">
      <Button className={`${btnClass} cursor-pointer`} onClick={()=>{
        logout()
        setShowNavbar(false)
      }}>Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;
