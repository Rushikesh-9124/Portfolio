import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import axiosInstance from "@/healper/axiosInstance";
import { toast } from "sonner";

const About = () => {
  const [data, setData] = useState([]);
  const [mounted, setMounted] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/details/get-about");
      if (res.data?.success) {
        setData(res.data.about[0]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchData();
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-full py-5 px-5 md:px-10 flex flex-col gap-6 overflow-auto">
      <h1 className="text-white text-xl md:text-3xl ml-1.5 font-medium animate-fade-in">
        About
      </h1>

      <div className="flex flex-col max-md:gap-10 gap-4 md:grid md:grid-cols-2 space-x-5">
        <div
          className={`bg-gray-400/6 border border-gray-500/50 h-full rounded-xl p-3
          transition-all duration-700 ease-out
          ${mounted ? "animate-card" : "opacity-0"}
          `}
        >
          <h5 className="text-lg font-medium mb-2 text-white">Summary</h5>
          <ul className="list-disc flex flex-col space-y-2 overflow-auto">
            {data?.summary?.map((item, idx) => (
              <li
                key={idx}
                className="list-item text-sm ml-7 text-gray-300 animate-stagger"
                style={{ animationDelay: `${idx * 120}ms` }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`bg-gray-400/6 border border-gray-500/50 rounded-xl h-full p-3
          transition-all duration-700 ease-out delay-150
          ${mounted ? "animate-card" : "opacity-0"}
          `}
        >
          <h5 className="text-lg font-medium mb-2 text-white">
            Problem Solving
          </h5>
          <div className="flex flex-col gap-3 border border-white/10 rounded-lg overflow-hidden">
            <div className="grid grid-cols-9 gap-2 items-start bg-white/60 px-2 py-3 rounded-t-lg text-black">
              <p className="col-span-1">#</p>
              <p className="col-span-4">Platform Name</p>
              <p className="col-span-2 max-md:w-[40px] overflow-ellipsis truncate">Problems</p>
              <p className="col-span-2">Link</p>
            </div>
            {data?.problemSolving?.map((item, idx) => (
              <div
                key={idx}
                className="grid text-wrap grid-cols-9 gap-2 items-center px-3 py-1 text-gray-200/70 hover:text-white transition duration-300 hover:bg-white/5 rounded-lg animate-stagger"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <p className="col-span-1">{idx + 1}</p>
                <p className="max-sm:col-span-3 col-span-4 text-wrap xs:w-[30px] overflow-ellipsis truncate">{item.platform}</p>
                <p className="col-span-2">{item.totalProblems}</p>
                <p className="col-span-2">
                  <Button
                    variant={"outline"}
                    className={
                      "bg-transparent border-white/40 hover:border-white/80"
                    }
                  >
                    <a href={item.link}>Link</a>
                  </Button>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`p-4 border border-gray-500/50 bg-gray-400/6 rounded-lg flex flex-col gap-2
        transition-all duration-700 ease-out delay-200
        ${mounted ? "animate-card" : "opacity-0"}
        `}
      >
        <h1 className="text-white text-xl font-medium">Education</h1>
        <div className="h-auto grid grid-cols-1 md:grid-cols-2 gap-5 rounded-lg">
          {data?.education?.map((item, idx) => (
            <div
              key={idx}
              className="text-white border border-white/30 rounded-lg px-3 py-2 flex flex-col gap-1 hover:shadow-lg hover:shadow-white/10 transition duration-500 animate-stagger"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <h5 className="text-xl">{item.degree}</h5>
              <p className="text-s text-gray-300/80">{item.course}</p>
              <p className="text-sm font-medium text-gray-300/80">
                {item.college}
              </p>
              <p className="text-sm text-gray-300/80">
                <span>{item.from}</span>{" "}
                <span className="text-white">to</span> <span>{item.to}</span>
              </p>
              {item.grade ? (
                <p className="text-sm">
                  <b>CGPA/Marks: </b>
                  {item.grade}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`bg-gray-400/6 rounded-lg border border-gray-500/50 px-2.5 py-2
        transition-all duration-700 ease-out delay-300
        ${mounted ? "animate-card" : "opacity-0"}
        `}
      >
        <h1 className="text-white font-medium text-xl p-3">Courses</h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {data?.courses?.map((item, idx) => (
            <p
              key={idx}
              className="px-2 py-1 bg-gray-400/20 text-white/70 rounded-lg flex items-center justify-center mx-3 my-1 hover:bg-white/10 transition duration-300 animate-stagger"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
