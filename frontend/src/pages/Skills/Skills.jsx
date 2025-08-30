import React, { useEffect, useState } from "react";
import SkillCard from "../../components/SkillCard";
import axiosInstance from "@/healper/axiosInstance";

const Skills = () => {
  const categories = [
    "All",
    "Language",
    "Technology",
    "Developer Tool",
    "Development Practice",
  ];
  const [activeIndex, setActiveIndex] = useState("All");

  const [data, setData] = useState([]);
  const [mounted, setMounted] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/details/get-all-skills");
      if (res.data?.success) {
        setData(res.data.skills);
      }
    } catch (error) {}
  };

  const fetchSpecificSkillCategory = async (item) => {
    try {
      const res = await axiosInstance.get(
        "/api/v1/details/get-specific-skill-category",
        { params: { category: item } }
      );
      if (res.data?.success) {
        setData(res.data.skills);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-full py-5 px-5 md:px-10 flex flex-col gap-5 overflow-auto">
      <h1 className="text-white text-xl md:text-3xl ml-1.5 font-medium animate-fade-in">
        Skills
      </h1>

      <div className="w-full flex gap-3 flex-wrap items-center">
        {categories.map((item, idx) => (
          <li
            key={idx}
            onClick={() => {
              setActiveIndex(item);
              fetchSpecificSkillCategory(item);
            }}
            className={`cursor-pointer list-none px-3 py-1 text-white/35 border border-gray-500/50 rounded-xl transition duration-300 
              ${
                activeIndex === item
                  ? "bg-gradient-to-tr from-lime-900/30 via-lime-900/70 to-lime-900/95 text-white scale-105 shadow-lg"
                  : "bg-gray-400/6 hover:bg-white/10 hover:text-white"
              } animate-stagger`}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {item}
          </li>
        ))}
      </div>

      <div className="grid max-sm:grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:grid-cols-6">
        {data?.map((item, idx) => (
          <div
            key={idx}
            className="animate-stagger "
            style={{ animationDelay: `${idx * 120}ms` }}
          >
            <SkillCard
              image={item.skillImg}
              skillName={item.title}
              progress={item.progress}
              category={item.category}
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default Skills;
