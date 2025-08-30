import React, { useEffect, useRef, useState } from "react";
import icon from "../../../../public/uploadicon.png";
import { Button } from "@/components/ui/button";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import axiosInstance from "@/healper/axiosInstance";
import { Trash } from "lucide-react";
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PersonalDetails = () => {
  const [file, setFile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [about, setAbout] = useState("");
  const [passionateIn, setPassionateIn] = useState([]);
  const [passionate, setPassionate] = useState("");
  const [loading, setLoading] = useState(false);

  const [deletePassionateItemId, setDeletePassionateItemId] = useState("")
  const [deletePassionateItemValue, setDeletePassionateItemValue] = useState("")
  const [showDialog, setShowDialog] = useState(false)


  const fetchData = async (e) => {
    try {
      const res = await axiosInstance.get(
        "/api/v1/details/get-personal-details"
      );
      if (res && res.data.success) {
        setDeletePassionateItemId(res.data.details[0]._id)
        setFile(res.data.details[0].profileImg);
        setFirstName(res.data.details[0].firstName);
        setLastName(res.data.details[0].lastName);
        setPassionateIn(res.data.details[0].passionateIn)

        setTagLine(res.data.details[0].tagLine);
        setAbout(res.data.details[0].about);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  };

  const imageRef = useRef(null);
  const handleImageInput = (e) => {
    e.preventDefault();
    imageRef.current.click();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addPossionate = (passionate) => {
    if(passionate.length == 0){
        toast.error("Enter something!")
        return;
    }
    setPassionateIn((prev) => [...prev, passionate]);
    setPassionate("")
  };

  const handleUpdateData = async() => {
    setLoading(true);
    if(!firstName){
        toast.error("Please enter the first name!")
        return
    }
    if(!lastName){
        toast.error("Please enter the last name!")
        return
    }
    if(!tagLine){
        toast.error("Please enter the tag line!")
        return
    }
    if(passionateIn.length == 0){
        toast.error("Please enter atleast one skill(passionate)!")
        return
    }
    if(!about){
        toast.error("Please enter about yourself!")
        return
    }

    const formData = new FormData()
    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("tagLine", tagLine)
    formData.append("about", about)
    passionateIn.forEach((item) => {
        formData.append("passionateIn[]", item);
      });      
    formData.append('image', file)

    try {
        const res = await axiosInstance.put('/api/v1/details/update', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        if(res.data.success){
            toast.success("Personal Details Scueessfully Updated!");
        }
        setPassionate("");
        fetchData() 
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
    setLoading(false);
    
  }

  const deletePassionateItem = async(id) => {
    console.log(id)
    console.log(deletePassionateItemValue)
    try {
      const res = await axiosInstance.put(`/api/v1/details/update-details-passionate/${id}`, {value: deletePassionateItemValue?.value})
      if(res.data?.success){
        toast.success("Passionate Item removed")
      }
      fetchData()
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!")
    }
    setShowDialog(false)
  }

  return (
    <div className=" text-white  w-full  h-full p-5 overflow-auto">
      <div className=" w-full">
        <h1 className="text-2xl font-medium">Personal Details</h1>
      </div>
      <div className="w-full h-full ">
        <div className="w-[150px] h-[150px] rounded-full  flex gap-4 items-center p-4 relative">
          {file ? (
            <img
              onClick={handleImageInput}
              className="cursor-pointer w-full h-full rounded-full"
              src={file instanceof File ? URL.createObjectURL(file) : file}
              alt=""
            />
          ) : (
            <img
              onClick={handleImageInput}
              src={icon}
              className="cursor-pointer w-full h-full invert rounded-full"
              alt=""
            />
          )}
          <div className="absolute right-5  bottom-5">
            <Trash onClick={()=>setFile(null)} className="text-red-500" />
          </div>
          <input
            ref={imageRef}
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
            hidden
            id=""
          />
          <h5>Upload Profile</h5>
        </div>
        <div className="w-full flex max-sm:flex-col gap-3 ">
          <div className="p-2  flex flex-col gap-2">
            <h5 className="text-md">First Name: </h5>
            <input
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className="max-w-[200px] text-sm text-white/80 outline-0 border-2 rounded-md px-2 py-1 border-gray-400"
            />
          </div>
          <div className="p-2  flex flex-col gap-2">
            <h5 className="text-md">Last Name: </h5>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="max-w-[200px] text-sm text-white/80 outline-0 border-2 rounded-md px-2 py-1 border-gray-400"
            />
          </div>
        </div>
        <div className="w-full  ">
          <div className="p-2  flex flex-col gap-3">
            <h5 className="text-md">Passionate In: </h5>

            <div className="max-w-[425px] flex flex-wrap gap-3">
              {passionateIn.map((item, idx) => (
                <div key={idx} className="relative group">
                  <p
                  key={idx}
                  className="max-w-[200px] text-sm text-white/80 overflow-ellipsis truncate  border border-gray-300 p-2 rounded-lg  bg-gray-400/50"
                >
                  {item}
                </p>
                <Trash
                    onClick={() => {
                      setDeletePassionateItemValue({ value: item });
                      setShowDialog(true)
                    }}
                    className="absolute hidden group-hover:block top-1.5 right-2 text-red-500 cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <div className="max-w-[425px] flex gap-2">
              <input
                onChange={(e) => setPassionate(e.target.value)}
                value={passionate}
                type="text"
                className="w-[80%] outline-0 border-2 rounded-md px-2 py-1 border-gray-400"
              />
              <Button
                onClick={() => addPossionate(passionate)}
                className={"flex-1 cursor-pointer"}
              >
                <IoMdAdd />
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full  ">
          <div className="p-2  flex flex-col gap-2">
            <h5 className="text-md">Tag Line: </h5>
            <input
              value={tagLine}
              onChange={(e) => setTagLine(e.target.value)}
              type="text"
              className="max-w-[425px] text-sm text-white/80 outline-0 border-2 rounded-md px-2 py-1 border-gray-400"
            />
          </div>
        </div>
        <div className="w-full  ">
          <div className="p-2  flex flex-col gap-2">
            <h5 className="text-md">About: </h5>

            <textarea
              cols="30"
              rows="7"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              type="text"
              className="max-w-[425px] text-sm text-white/80 outline-0 border-2 rounded-md px-2 py-1 border-gray-400"
            />
          </div>
        </div>
        <div className="w-full p-3">
        <Button onClick={handleUpdateData} variant={'outline'} className={'w-full group bg-transparent border-gray-400 transition-all duration-400 cursor-pointer max-w-[420px]'}>
            {
                loading ? <div className="w-[20px] group-hover:border-t-red-500 group-hover:border-black h-[20px] border-t-red-500 animate-spin rounded-full border-2">

                </div> : "Update"
            }
        </Button>
        </div>
      </div>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              item and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            
            <Button onClick={()=>deletePassionateItem(deletePassionateItemId)} type="submit">Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PersonalDetails;
