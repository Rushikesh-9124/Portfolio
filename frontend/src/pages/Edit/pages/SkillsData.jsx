import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axiosInstance from "@/healper/axiosInstance";
import SkillCard from "@/components/SkillCard";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";

const SkillsData = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const [showDialog, setShowDialog] = useState(false);

  const handleUpload = async () => {
    setLoading(true);
    if (!image) {
      setLoading(false);
      toast.error("Please add image link from cdn.jsdelivr.net");
      return;
    }
    if (!title) {
      setLoading(false);
      toast.error("Please add title");
      return;
    }
    if (!progress) {
      setLoading(false);
      toast.error("Please select progress");
      return;
    }
    if (!category) {
      setLoading(false);
      toast.error("Please select category");
      return;
    }

    try {
      const res = await axiosInstance.post("/api/v1/details/add-skill", {
        skillImg: image,
        title,
        progress,
        category,
      });
      if (res && res.data.success) {
        toast.success("Skill added successfully!");
      }
      fetchData()
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setImage("");
    setTitle("");
    setCategory("");
    setProgress("");
    setLoading(false);
  };

  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/details/get-all-skills");
      
      if (res && res.data.success) {
        setData(res.data.skills);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const [id, setId] = useState(null);
  const deleteSkill = async(id) => {
    if(!id){
      toast.error("Something went wrong!")
    }
    try {
      const res = await axiosInstance.delete(`/api/v1/details/delete-skill/${id}`)
      console.log(res)
      if(res?.data?.success){
        toast.success("Skill deleted!")
      }
      fetchData();
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message)
    }
    setShowDialog(false)
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className=" text-white  w-full  h-full p-5 overflow-auto">
      <div className=" w-full">
        <h1 className="text-2xl font-medium">Add Skill</h1>
      </div>
      <div className="flex flex-col   max-w-[600px]">
        <div className="p-2 w-full  flex flex-col gap-2">
          <h5 className="text-md">Skill Image: </h5>
          <Input
            type="text"
            value={image}
            placeholder="Link ex:https://cdn.jsdelivr.net"
            onChange={(e) => setImage(e.target.value)}
            className="max-w-[250px] text-sm text-white/80 outline-0 border-2 rounded-md px-2 py-1 border-gray-400"
          />
        </div>
        <div className="p-2 w-full flex flex-col gap-2">
          <h5 className="text-md">Skill Title: </h5>
          <Input
            type="text"
            value={title}
            placeholder="Enter skill title"
            onChange={(e) => setTitle(e.target.value)}
            className="max-w-[250px] text-sm text-white/80 outline-0 border-2 rounded-md px-2 py-1 border-gray-400"
          />
        </div>
        <div className="p-2 w-full relative flex gap-2 h-full items-center pt-10">
          <h5 className="text-md">Progress: </h5>
          <div className="max-w-[255px]   rounded-md border-1 px-2 py-1">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {progress ? progress : "Select"}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Select Progress</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={(e) => setProgress("Beginner")}>
                  Beginner
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => setProgress("Intermediate")}>
                  Intermediate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => setProgress("Advanced")}>
                  Advanced{" "}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => setProgress("Expert")}>
                  Expert
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="p-2 w-full relative flex gap-2 h-full items-center pt-10">
          <h5 className="text-md">Category: </h5>
          <div className="max-w-[255px]   rounded-md border-1 px-2 py-1">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {category ? category : "Select"}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Select Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setCategory("Language")}>
                  Language
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategory("Technology")}>
                  Technology
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategory("Developer Tool")}>
                  Developer Tool
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setCategory("Development Practice")}
                >
                  Development Practice
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className=" mt-5 w-full max-w-[300px]">
        <Button
          onClick={handleUpload}
          variant={"outline"}
          className={"w-full text-black cursor-pointer"}
        >
          {loading ? (
            <div className="w-[20px] group-hover:border-t-red-500 group-hover:border-black h-[20px] border-t-red-500 animate-spin rounded-full border-2"></div>
          ) : (
            "Add Skill"
          )}
        </Button>
      </div>

      <div className="w-full  border border-gray-400/20 mt-10 p-5 rounded-lg">
        <h3 className="text-3xl font-medium ">Manage Skills</h3>
        <div className="w-full  p-3 grid max-sm:gap-5 max-sm:grid-cols-2 sm:grid-cols-3 space-y-4 lg:grid-cols-4 xl:grid-cols-5">
          {data.map((item, idx) => (
            <div key={idx} className="relative group transition-all duration-300">
                <SkillCard
                image={item.skillImg}
                skillName={item.title}
                progress={item.progress}
                category={item.category}
              />
              <div className=" absolute cursor-pointer top-15 left-13 md:top-20 md:left-17 w-full hidden group-hover:block z-500">
              <Trash onClick={()=>{
                setId(item._id)
                setShowDialog(true)
              }} className="text-red-500"/>
              </div>
            </div>
          ))}
          <div className="">
            {true && (
              <Dialog open={showDialog} onOpenChange={setShowDialog} >
                <DialogContent>
                  <DialogHeader >
                    <DialogTitle >Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      the skill and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button className={'cursor-pointer'} onClick={()=>deleteSkill(id)} type="submit">Delete</Button>
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

export default SkillsData;
