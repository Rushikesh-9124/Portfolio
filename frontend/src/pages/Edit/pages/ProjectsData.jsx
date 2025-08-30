import { Trash } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import icon from "../../../../public/uploadimage.png";
import { IoMdAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axiosInstance from "@/healper/axiosInstance";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProjectCard from "@/components/ProjectCard";

const ProjectsData = () => {
  const imageRef = useRef(null);
  const handleImageInput = (e) => {
    e.preventDefault();
    imageRef.current.click();
  };
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [github, setGithub] = useState("");
  const [liveDemo, setLiveDemo] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [technology, setTechnology] = useState("");
  const [loading, setLoading] = useState(false);

  const [id, setId] = useState(null);
  const [showDialog, setShowDialog] = useState(false)

  const [data, setData] = useState([])
  const fetchData = async() => {
    try {
      const res = await axiosInstance.get('/api/v1/details/get-all-projects')
      if(res.data?.success){
        setData(res.data.projects)
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  const addTechnologies = (technology) => {
    if (technology.length == 0) {
      toast.error("Add something");
      return;
    }
    setTechnologies((prev) => [...prev, technology]);
    setTechnology("");
  };

  const handleUpload = async () => {
    setLoading(true);
    if(!file){
      setLoading(false)
      toast.error("Add Project Image!")
      return
    }
    if (!title) {
      setLoading(false);
      toast.error("Add project title!");
      return;
    }
    if (!github) {
      setLoading(false);
      toast.error("Add github link!");
      return;
    }
    if (!liveDemo) {
      setLoading(false);
      toast.error("Add live demo link!");
      return;
    }
    if (technologies.length == 0) {
      setLoading(false);
      toast.error("Add atleast 1 technology used!");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("github", github);
    formData.append("liveDemo", liveDemo);
    technologies.forEach((item) => {
      formData.append("technologies[]", item);
    });
    try {
      const res = await axiosInstance.post(
        "/api/v1/details/add-project",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res && res.data.success) {
        toast.success("Project added successfully!");
      }
      fetchData()
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setTitle("");
    setFile(null);
    setTechnologies([]);
    setGithub("");
    setLiveDemo("");
    setLoading(false);
  };
  console.log(id)
  const deleteProject = async(id) => {
    
    try {
      const res = await axiosInstance.delete(`/api/v1/details/delete-project/${id}`)
      if(res.data?.success){
        toast.success("Project Deleted!")
      }
      fetchData()
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
    setShowDialog(false)
  }

  useEffect(()=>{
    fetchData()
  }, [])
  return (
    <div className=" text-white  w-full  h-full p-5 overflow-auto">
      <div className=" w-full">
        <h1 className="text-2xl font-medium">Add Project</h1>
      </div>
      <div className="w-full max-w-[500px] flex  flex-col ">
        <div className="max-w-[250px] overflow-hidden h-[150px] rounded-full  flex gap-4 items-center p-4 relative">
          {file ? (
            <img
              onClick={handleImageInput}
              className="cursor-pointer overflow-hidden w-full max-w-[200px] h-full rounded-full"
              src={file instanceof File ? URL.createObjectURL(file) : file}
              alt=""
            />
          ) : (
            <img
              onClick={handleImageInput}
              src={icon}
              className="cursor-pointer overflow-hidden w-full max-w-[200px] h-full invert rounded-full"
              alt=""
            />
          )}
          {file && (
            <div className="absolute right-23  bottom-5">
              <Trash
                size={40}
                onClick={() => setFile(null)}
                className="text-red-500"
              />
            </div>
          )}
          <input
            ref={imageRef}
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
            hidden
            id=""
          />
          <h5 className="">Upload Image</h5>
        </div>

        <div className="w-full max-w-[420px]">
          <div className="p-2  flex flex-col gap-2">
            <h5 className="text-md">Project Title: </h5>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="max-w-full text-sm text-white/80 outline-0 border-2 rounded-md px-2 py-1 border-gray-400"
            />
          </div>
        </div>

        <div className="w-full max-w-[420px] flex max-sm:flex-col gap-3 ">
          <div className="p-2 max-w-[240px]  flex flex-col gap-2">
            <h5 className="text-md">GitHub Link: </h5>
            <input
              type="text"
              onChange={(e) => setGithub(e.target.value)}
              value={github}
              className="max-w-full text-sm text-white/80 outline-0 border-2 rounded-md px-2 py-1 border-gray-400"
            />
          </div>
          <div className="p-2 max-w-[240px]  flex flex-col gap-2">
            <h5 className="text-md">Live Demo Link: </h5>
            <input
              type="text"
              value={liveDemo}
              onChange={(e) => setLiveDemo(e.target.value)}
              className="max-w-full text-sm text-white/80 outline-0 border-2 rounded-md px-2 py-1 border-gray-400"
            />
          </div>
        </div>
        <div className="w-full  max-w-[420px]">
          <div className="p-2  flex flex-col gap-1.5">
            <h5 className="text-md">Technologies: </h5>

            <div className="max-w-[425px] flex flex-wrap gap-3">
              {technologies.map((item, idx) => (
                <p
                  key={idx}
                  className="max-w-[200px] text-sm text-white/80 overflow-ellipsis truncate  border border-gray-300 p-2 rounded-lg  bg-gray-400/50"
                >
                  {item}
                </p>
              ))}
            </div>
            <div className="max-w-[425px] flex gap-2">
              <input
                onChange={(e) => setTechnology(e.target.value)}
                type="text"
                value={technology}
                className="w-[80%] outline-0 border-2 rounded-md px-2 py-1 border-gray-400"
              />
              <Button
                variant={"outline"}
                onClick={() => addTechnologies(technology)}
                className={"flex-1 cursor-pointer text-black"}
              >
                <IoMdAdd />
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-[420px] w-full p-2">
          <Button
            variant={"outline"}
            className={"w-full text-black cursor-pointer"}
            onClick={handleUpload}
          >
            {loading ? (
              <div className="w-[20px] group-hover:border-t-red-500 group-hover:border-black h-[20px] border-t-red-500 animate-spin rounded-full border-2"></div>
            ) : (
              "Add Project"
            )}
          </Button>
        </div>
      </div>
      <div className="w-full  border border-gray-400/20 mt-10 p-5 rounded-lg">
        <h3 className="text-3xl font-medium ">Manage Skills</h3>
        <div className="w-full max-sm:mx-auto p-3 grid max-sm:gap-5 max-sm:grid-cols-1 sm:grid-cols-2 space-y-4 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((item, idx) => (
            <div key={idx} className="relative group transition-all duration-300">
                <ProjectCard
                data={item}
              />
              <div className=" absolute cursor-pointer top-8 left-13 md:top-17 md:left-27 w-full hidden group-hover:block z-500">
              <Trash onClick={()=>{
                setId(item._id)
                setShowDialog(true)
              }} className="text-red-500"/>
              </div>
            </div>
          ))}
          <div className="">
            {true && (
              <Dialog className='bg-black'  open={showDialog} onOpenChange={setShowDialog} >
                <DialogContent>
                  <DialogHeader >
                    <DialogTitle >Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      the skill and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button className={'cursor-pointer'} onClick={()=>deleteProject(id)} type="submit">Delete</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsData;
