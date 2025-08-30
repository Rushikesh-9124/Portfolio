import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { MdAttachEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axiosInstance from "@/healper/axiosInstance";
import { toast } from "sonner";

const icons = {
  FaLinkedin,
  MdAttachEmail,
  FaGithub,
  FaXTwitter,
};

const Home = () => {
  const [data, setData] = useState([]);
  const [typedAbout, setTypedAbout] = useState("");

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

  // Typing effect for "about"
  useEffect(() => {
    if (!data?.about) return;
    let i = 0;
    setTypedAbout(""); // reset when about changes
    const interval = setInterval(() => {
      setTypedAbout((prev) => prev + data.about[i]);
      i++;
      if (i === data.about.length) clearInterval(interval);
    }, 40); // speed

    return () => clearInterval(interval);
  }, [data?.about]);

  return (
    <div className="w-full h-full py-17 gap-5 px-5 md:px-15 flex flex-col overflow-auto ">
      <div className="flex max-md:flex-col items-center justify-evenly h-[50%] gap-10 md:gap-20 mt-10">
        <div className="w-[25%] flex items-center justify-start max-md:justify-center">
          <img
            draggable="false"
            className="w-full min-w-[200px] h-auto rounded-full"
            src={data?.profileImg}
            alt=""
          />
        </div>
        <div className="flex-1 text-center space-y-2 max-md:mb-3">
          <h1
            className="
              text-4xl
              lg:text-5xl
              xl:text-7xl font-extrabold 
              bg-gradient-to-r from-white/60 via-[#d1d1d1] to-[#bcb9b9]
              bg-clip-text text-transparent 
              text-wrap
              md:space-x-3
              max-md:flex 
              bg-[length:200%_200%] animate-shimmer
            "
          >
            <span className="mr-2">{data?.firstName}</span>
            <span>{data?.lastName}</span>
          </h1>

          <p className="text-gray-400 text-md mb-4 ">{data?.tagLine}</p>
          <div className="flex flex-wrap gap-3 justify-center ">
            {data?.passionateIn?.map((item, idx) => (
              <p
                key={idx}
                className="bg-gray-200/60 py-1 px-1 md:px-2 lg:py-2 rounded-md "
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white/1 max-md:mt-20 max-md:text-sm leading-7 text-white/60 px-5 pt-15 rounded-md text-center">
        {typedAbout}
        <span className="animate-pulse">|</span> 
      </div>

      <div className="w-full h-auto flex items-center justify-center gap-3">
        {data?.contact?.map((item, idx) => {
          const Icon = icons[item.icon];
          return (
            <a
              key={idx}
              className="p-3.5 rounded-full flex items-center justify-center bg-gray-400/50"
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
