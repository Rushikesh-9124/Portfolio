import Navbar from "@/components/Edit/Navbar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import PersonalDetails from "./pages/PersonalDetails";
import AboutData from "./pages/AboutData";
import SkillsData from "./pages/SkillsData";
import ProjectsData from "./pages/ProjectsData";
import CertificatesData from "./pages/CertificatesData";
import { Menu } from "lucide-react";
import { IoMdClose } from "react-icons/io";

const Edit = () => {
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(false);
  return (
    <div className="relative w-full h-full">
      {showNavbar  && <div className="absolute transition-all duration-700 z-900 top-0 left-0 w-full  bg-black/40 max-md:block  hidden h-full">
        <div className="absolute min-w-[200px] bg-black h-full">
        <Navbar setShowNavbar={setShowNavbar} className='max-w-[200px]' />
        </div>
        </div>}
      { (!showNavbar ? (
        <Menu
          size={28}
          onClick={() => setShowNavbar((prev) => !prev)}
          className="text-white max-md:block hidden  absolute  top-6 right-6 z-1000"
        />
      ) : (
        <IoMdClose
          onClick={() => setShowNavbar((prev) => !prev)}
          className="text-white max-md:block hidden  absolute  top-6 right-6 z-1000"
          size={28}
        />
      ))}
      <div className="border border-gray-300/10  w-full h-full backdrop-blur-md  shadow-sm shadow-gray-700 rounded-xl flex  space-x-2 ">
        <div className="hidden md:block md:w-[18%]  h-full rounded-l-2xl shadow-sm shadow-gray-600">
          <Navbar />
        </div>
        <div className="flex-1  overflow-hidden text-white h-full max-md:w-[100%]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Edit;
