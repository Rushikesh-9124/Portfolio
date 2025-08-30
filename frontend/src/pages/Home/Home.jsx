import React, { useEffect, useState } from "react";
import { MdAttachEmail } from "react-icons/md";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axiosInstance from "@/healper/axiosInstance";
import { toast } from "sonner";

const icons = { FaLinkedin, MdAttachEmail, FaGithub, FaXTwitter };

const Home = () => {
  const [data, setData] = useState([]);
  const [typedAbout, setTypedAbout] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/details/get-personal-details");
      if (res.data?.success) {
        setData(res.data.details[0]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!data?.about) return;
    let i = 0;
    setTypedAbout("");
    setTypingDone(false);

    const interval = setInterval(() => {
      setTypedAbout((prev) => prev + data.about[i]);
      i++;
      if (i === data.about.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [data?.about]);

  return (
    <div className="w-full h-full py-17 gap-5 px-5 md:px-15 flex flex-col overflow-auto ">
      <div className="flex max-md:flex-col items-center justify-evenly h-[50%] gap-10 md:gap-20 mt-10">
      
        <div className="w-[25%] flex items-center justify-start max-md:justify-center">
          <img
            draggable="false"
            className="w-full min-w-[200px] h-auto rounded-full shadow-xl animate-fade-in"
            src={data?.profileImg}
            alt=""
          />
        </div>

        <div className="flex-1 text-center space-y-2 animate-slide-up  mb-5">
          <h1
            className="
              text-4xl lg:text-5xl xl:text-7xl font-extrabold 
              relative inline-block
              bg-gradient-to-r from-white/60 via-[#d1d1d1] to-[#bcb9b9]
              bg-clip-text text-transparent 
              overflow-hidden
            "
          >
            <span className="mr-2">{data?.firstName}</span>
            <span>{data?.lastName}</span>


            <span className="absolute inset-0 animate-shine bg-gradient-to-tr from-transparent via-white/60 to-transparent"></span>
          </h1>

          <p className="text-gray-400 text-md mb-4 ">{data?.tagLine}</p>

          {/* Passionate In */}
          <div className="flex flex-wrap gap-3 justify-center ">
            {data?.passionateIn?.map((item, idx) => (
              <p
                key={idx}
                className="bg-gray-200/60 py-1 px-1 md:px-2 lg:py-2 rounded-md transition-all duration-300 hover:scale-105"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/1 max-md:mt-5 max-md:text-sm leading-7 text-white/60 px-5 py-15 rounded-md text-center animate-fade-in">
        {typedAbout}
        {!typingDone && <span className="animate-pulse">|</span>}
      </div>

      <div className="w-full h-auto flex items-center justify-center gap-3">
        {data?.contact?.map((item, idx) => {
          const Icon = icons[item.icon];
          return (
            <a
              key={idx}
              className="p-3.5 rounded-full flex items-center justify-center bg-gray-400/50 
              transition-all duration-300 hover:scale-110 hover:bg-gray-400/70"
              href={item.link}
              target="_blank"
            >
              <Icon className="text-lg md:text-3xl text-white/90" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
