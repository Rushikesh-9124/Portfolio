import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Skills from "./pages/Skills/Skills";
import Projects from "./pages/Projects/Projects";
import Certificates from "./pages/certificates/Certificates";
import Login from "./pages/Login/Login";
import Edit from "./pages/Edit/Edit";
import PersonalDetails from "./pages/Edit/pages/PersonalDetails";
import AboutData from "./pages/Edit/pages/AboutData";
import SkillsData from "./pages/Edit/pages/SkillsData";
import ProjectsData from "./pages/Edit/pages/ProjectsData";
import CertificatesData from "./pages/Edit/pages/CertificatesData";
import { Toaster } from "@/components/ui/sonner";
import { Menu } from "lucide-react";
import { IoMdClose } from "react-icons/io";

const App = () => {
  const location = useLocation();
  const isLogin = location.pathname.startsWith("/login");
  const isEdit = location.pathname.startsWith("/edit");
  const token = !!localStorage.getItem("token");

  const [showNavbar, setShowNavbar] = useState(false);
  return (
    <div className="relative">
      <div className="w-full  h-screen bg-gradient-to-tr from-black from-70% via-black via-75% to-lime-900/95  px-8 py-10 flex items-center justify-center ">
      <Toaster />
      {showNavbar  && <div className="absolute transition-all duration-700 z-500 top-0 left-0 w-full  bg-black/40  h-full md:hidden">
        <div className="absolute min-w-[200px] bg-black h-full">
        <Navbar setShowNavbar={setShowNavbar} className='max-w-[200px]' />
        </div>
        </div>}
      {(!isEdit) && (!showNavbar ? (
        <Menu
          size={28}
          onClick={() => setShowNavbar((prev) => !prev)}
          className="text-white max-md:block hidden  absolute  top-15 right-15 z-1000"
        />
      ) : (
        <IoMdClose
          onClick={() => setShowNavbar((prev) => !prev)}
          className="text-white max-md:block hidden  absolute  top-15 right-15 z-1000"
          size={28}
        />
      ))}
      <div className="border border-gray-300/10  w-full h-full bg-gray-600/10 backdrop-blur-md  shadow-sm shadow-gray-700 rounded-xl flex  space-x-2 ">
        {!isLogin && !isEdit && (
          <div className="hidden md:block md:w-[18%]  h-full rounded-l-2xl shadow-sm shadow-gray-600">
            <Navbar />
          </div>
        )}

        <div className="flex-1 overflow-hidden  h-full max-md:w-[100%]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/login" element={token ? <Edit /> : <Login />} />
            <Route path="/edit" element={token ? <Edit /> : <Login />}>
              <Route index element={<PersonalDetails />} />
              <Route path="about" element={<AboutData />} />
              <Route path="skills" element={<SkillsData />} />
              <Route path="projects" element={<ProjectsData />} />
              <Route path="certificates" element={<CertificatesData />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
    </div>
  );
};

export default App;
