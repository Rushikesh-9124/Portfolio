import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/healper/axiosInstance";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AboutData = () => {
  const [summary, setSummary] = useState([]);
  const [summaryItem, setSummaryItem] = useState("");
  const [courses, setCourses] = useState([]);
  const [courseItem, setCourseItem] = useState("");
  const [problemSolving, setProblemSolving] = useState([]);
  const [problemSolvingItem, setProblemSolvingItem] = useState({
    platform: "",
    totalProblems: 0,
    link: "",
  });
  const [loading, setLoading] = useState(false);

  const [education, setEducation] = useState([]);
  const [id, setId] = useState(null);

  const [deleteSummaryValue, setDeleteSummaryValue] = useState("")
  const [deleteSummaryId, setDeleteSummryId] = useState("")
  const [deleteCourseValue, setDeleteCourseValue] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [openDialogCourse, setOpenDialogCourse] = useState(false)

  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/api/v1/details/get-about");
      if (res && res.data.success) {
        setUpdateProblemSolvingId(res.data.about[0]?._id)
        setId(res.data.about[0]?._id);
        setEducation(res.data.about[0]?.education);
        setSummary(res.data.about[0].summary);
        setCourses(res.data.about[0].courses);
        setProblemSolving(res.data.about[0].problemSolving);
        setDeleteSummryId({ id: res.data.about[0]._id });
      }
    } catch (error) {}
  };

  const addSummary = (summaryItem) => {
    if (summaryItem.length == 0) {
      toast.error("Add something!");
      return;
    }
    setSummary((prev) => [...prev, summaryItem]);
    setSummaryItem("");
  };
  const addCourse = (courseItem) => {
    if (courseItem.length == 0) {
      toast.error("Add something!");
      return;
    }
    setCourses((prev) => [...prev, courseItem]);
    setCourseItem("");
  };

  const addPlatform = (problemSolvingItem) => {
    if (problemSolvingItem.platform === "" || problemSolvingItem.link === "") {
      toast.error("Add something");
      return;
    }
    setProblemSolving((prev) => [...prev, problemSolvingItem]);
    setProblemSolvingItem({
      platform: "",
      totalProblems: 0,
      link: "",
    });
  };

  const handleUpload = async (id) => {
    try {
      const res = await axiosInstance.put(
        `/api/v1/details/update-about/${id}`,
        {
          summary,
          courses,
          problemSolving,
          education,
        }
      );
      if (res.data?.success) {
        toast.success("About info updated!");
      }
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };
  const deleteSummary = async(id) => {
    try {
      const res = await axiosInstance.put(`/api/v1/details/update-about-summary/${id.id}`, {value: deleteSummaryValue?.value})
      if(res.data?.success){
        toast.success("Summary Item removed")
      }
      fetchData()
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!")
    }
    setOpenDialog(false)
  }
  const deleteCourse = async(id) => {
    try {
      const res = await axiosInstance.put(`/api/v1/details/update-about-course/${id.id}`, {value: deleteCourseValue?.value})
      if(res.data?.success){
        toast.success("Course Item removed")
      }
      fetchData()
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!")
    }
    setOpenDialogCourse(false)
  }

  const [updateProblemSolving, setUpdateProblemSolving] = useState({
    platform: "",
    totalProblems: 0,
    link: ""
  })
  const [updateProblemSolvingId, setUpdateProblemSolvingId] = useState("")
  const [openUpdateProblemSolvingDialog, setOpenUpdateProblemSolvingDialog] = useState(false)
  const updateproblemSolving = async(id) => {
    console.log({platform: updateProblemSolving.platform,
      totalProblems: updateProblemSolving.problemSolving,
      link: updateProblemSolving.link})
    console.log(id)
    try {
      const res = await axiosInstance.put(`/api/v1/details/update-problem-solving/${id}`,
      {platform: updateProblemSolving.platform,
        totalProblems: updateProblemSolving.totalProblems,
        link: updateProblemSolving.link})

    if(res.data?.success){
      toast.success(res.data.message)
    }
    setOpenUpdateProblemSolvingDialog(false)
    fetchData()
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!")
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" text-white  w-full  h-full p-5 overflow-auto">
      <div className=" w-full">
        <h1 className="text-2xl font-medium">About Data</h1>
      </div>
      <div className="w-full max-w-[800px] flex  flex-col ">
        <div className="w-full  max-w-[600px]">
          <div className="p-2  flex flex-col gap-3">
            <h5 className="text-md">Summary: </h5>

            <div className="max-w-[600px] flex flex-wrap gap-3">
              {summary.map((item, idx) => (
                <div key={idx} className="relative group">
                  <p className="max-w-[250px] group-hover:mask-b-from-1.5 text-sm text-white/80 overflow-ellipsis truncate  border border-gray-300 p-2 rounded-lg  bg-gray-400/50">
                    {item}
                  </p>
                  <Trash
                    onClick={() => {
                      setDeleteSummaryValue({ value: item });
                      setOpenDialog(true)
                    }}
                    className="absolute hidden group-hover:block top-1.5 right-2 text-red-500 cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <div className="max-w-[600px] flex gap-2">
              <input
                onChange={(e) => setSummaryItem(e.target.value)}
                type="text"
                value={summaryItem}
                className="w-[80%] outline-0 border-2 rounded-md px-2 py-1 border-gray-400"
              />
              <Button
                variant={"outline"}
                onClick={() => addSummary(summaryItem)}
                className={"flex-1 cursor-pointer text-black"}
              >
                <IoMdAdd />
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full  max-w-[600px]">
          <div className="p-2  flex flex-col gap-3">
            <h5 className="text-md">Courses: </h5>

            <div className="max-w-[600px] flex flex-wrap gap-3">
              {courses.map((item, idx) => (
                <div key={idx} className="relative group">
                  <p
                  className="max-w-[200px] text-sm text-white/80 overflow-ellipsis truncate  border border-gray-300 p-2 rounded-lg  bg-gray-400/50"
                >
                  {item}
                </p>
                  <Trash
                    onClick={() => {
                      setDeleteCourseValue({ value: item });
                      setOpenDialogCourse(true)
                    }}
                    className="absolute hidden group-hover:block top-1.5 right-2 text-red-500 cursor-pointer"
                  />
                </div>
                
              ))}
            </div>
            <div className="max-w-[600px] flex gap-2">
              <input
                onChange={(e) => setCourseItem(e.target.value)}
                type="text"
                value={courseItem}
                className="w-[80%] outline-0 border-2 rounded-md px-2 py-1 border-gray-400"
              />
              <Button
                variant={"outline"}
                onClick={() => addCourse(courseItem)}
                className={"flex-1 cursor-pointer text-black"}
              >
                <IoMdAdd />
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[600px] flex flex-col items-center gap-4 mt-10 p-4 border rounded-lg">
          <h3 className="text-center text-lg font-medium">
            Add New Problem Solving Platform
          </h3>
          <div className="w-full flex gap-3 items-center">
            <h5 className="w-[30%]">Platform: </h5>
            <Input
              value={problemSolvingItem.platform}
              onChange={(e) =>
                setProblemSolvingItem((prev) => ({
                  ...prev,
                  platform: e.target.value,
                }))
              }
            />
          </div>
          <div className="w-full flex gap-3 items-center">
            <h5 className=" w-[30%]">Total Problems: </h5>
            <Input
              type={"Number"}
              value={problemSolvingItem.totalProblems}
              onChange={(e) =>
                setProblemSolvingItem((prev) => ({
                  ...prev,
                  totalProblems: e.target.value,
                }))
              }
            />
          </div>
          <div className="w-full flex gap-3 items-center">
            <h5 className="w-[30%]">Link: </h5>
            <Input
              value={problemSolvingItem.link}
              onChange={(e) =>
                setProblemSolvingItem((prev) => ({
                  ...prev,
                  link: e.target.value,
                }))
              }
            />
          </div>
          <Button
            onClick={() => addPlatform(problemSolvingItem)}
            className={"max-w-[300px] cursor-pointer text-black"}
            variant={"outline"}
          >
            Add Platform
          </Button>
        </div>
        <div className="max-w-[600px] flex justify-end w-full  mt-5">
          <Button
            variant={"outline"}
            className={"w-full max-w-[200px] text-black cursor-pointer"}
            onClick={() => handleUpload(id)}
          >
            {loading ? (
              <div className="w-[20px] group-hover:border-t-red-500 group-hover:border-black h-[20px] border-t-red-500 animate-spin rounded-full border-2"></div>
            ) : (
              "Update About Info"
            )}
          </Button>
        </div>
      </div>
      <div className="w-full mt-10 ">
      <div className="flex flex-col max-md:gap-10 gap-3 md:grid md:grid-cols-2  space-x-5">
        <div className=" bg-gray-400/6 border border-gray-500/50 shadow-xs shadow-gray-500  rounded-xl h-full p-3">
          <h5 className="text-lg font-medium mb-2 text-white">
            Problem Solving
          </h5>
          <div className="flex flex-col  gap-3 border border-white/10 rounded-lg">
            <div className="grid grid-cols-11 gap-2 items-start bg-white/60 drop-shadow-2xl px-2 py-3 rounded-t-lg">
              <p className="col-span-1">#</p>
              <p className="col-span-4">Platform Name</p>
              <p className="col-span-2 max-sm:w-[30px] overflow-ellipsis truncate">Problems</p>
              
              <p className="col-span-2">Update</p>
            </div>
            {problemSolving?.map((item, idx) => (
              <div key={idx} className="grid grid-cols-11 gap-2 items-center hover:text-white/80   px-3 py-1 rounded-t-lg text-gray-200/60">
                <p className="col-span-1 ">{idx + 1}</p>
                <p className="col-span-4 max-sm:w-[60px] overflow-ellipsis truncate">{item.platform}</p>
                <p className="col-span-2">{item.totalProblems}</p>
                <p className="col-span-2">
                  <Button onClick={()=>{
                    setUpdateProblemSolving({
                      platform:item.platform,
                      totalProblems: item.totalProblems,
                      link: item.link
                    })
                    setOpenUpdateProblemSolvingDialog(true)
                  }} variant={'outline'} className={'bg-transparent border-white/40 '}>
                    Edit
                  </Button>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              item and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            
            <Button onClick={()=>deleteSummary(deleteSummaryId)} type="submit">Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={openDialogCourse} onOpenChange={setOpenDialogCourse}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              item and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            
            <Button onClick={()=>deleteCourse(deleteSummaryId)} type="submit">Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={openUpdateProblemSolvingDialog} onOpenChange={setOpenUpdateProblemSolvingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update problem solving data.</DialogTitle>
            <DialogDescription>
              
            </DialogDescription>
            <div className="w-full flex gap-3 items-center">
            <h5 className="w-[30%]">Platform: </h5>
            <Input
              defaultValue={updateProblemSolving.platform}
              
            />
          </div>
          <div className="w-full flex gap-3 items-center">
            <h5 className=" w-[30%]">Total Problems: </h5>
            <Input
              type={"Number"}
              defaultValue={updateProblemSolving.totalProblems}
              onChange={(e) =>
                setUpdateProblemSolving((prev) => ({
                  ...prev,
                  totalProblems: e.target.value,
                }))
              }
            />
          </div>
          <div className="w-full flex gap-3 items-center">
            <h5 className="w-[30%]">Link: </h5>
            <Input
              value={updateProblemSolving.link}
              onChange={(e) =>
                setUpdateProblemSolving((prev) => ({
                  ...prev,
                  link: e.target.value,
                }))
              }
            />
          </div>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={()=>updateproblemSolving(updateProblemSolvingId)} type="submit">Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AboutData;
