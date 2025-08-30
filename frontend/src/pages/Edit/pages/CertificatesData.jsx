import React, { useEffect, useRef, useState } from "react";
import icon from "../../../../public/uploadimage.png";
import { Button } from "@/components/ui/button";
import axios from "axios";
import axiosInstance from "@/healper/axiosInstance";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import CertificateCard from "@/components/CertificateCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CertificatesData = () => {
  const imageRef = useRef(null);
  const handleImageInput = (e) => {
    e.preventDefault();
    imageRef.current.click();
  };

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [verify, setVerify] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(
        "/api/v1/details/get-all-certificates"
      );
      if (res?.data?.success) {
        setData(res.data.certificates);
      }
    } catch (error) {}
  };

  const handleUpload = async () => {
    setLoading(true);
    if (!file) {
      setLoading(false);
      toast.error("Upload certificate image");
      return;
    }
    if (!title) {
      setLoading(false);
      toast.error("Add certificate title");
      return;
    }
    if (!verify) {
      setLoading(false);
      toast.error("Add verification link");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("verify", verify);

    try {
      const res = await axiosInstance.post(
        "/api/v1/details/add-certificate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/from-data",
          },
        }
      );
      if (res && res.data.success) {
        toast.success("Certificate Added!");
      }
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }

    setFile(null);
    setTitle("");
    setVerify("");
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [id, setId] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const deleteCertificate = async(id) => {
    console.log(id)
    try {
      const res = await axiosInstance.delete(`/api/v1/details/delete-certificate/${id}`)
      if(res?.data?.success){
        toast.success(res.data.message)
      }
      fetchData()
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong!")
    }
    setShowDialog(false)
  }

  return (
    <div className=" text-white  w-full  h-full p-5 overflow-auto">
      <div className=" w-full">
        <h1 className="text-2xl font-medium">Add Certificate</h1>
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
            <h5 className="text-md">Certificate Title: </h5>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="max-w-full text-sm text-white/80 outline-0 border-2 rounded-md px-2 py-1 border-gray-400"
            />
          </div>
        </div>

        <div className="w-full max-w-[420px]">
          <div className="p-2  flex flex-col gap-2">
            <h5 className="text-md">Verification Link: </h5>
            <input
              type="text"
              onChange={(e) => setVerify(e.target.value)}
              value={verify}
              className="max-w-full text-sm text-white/80 outline-0 border-2 rounded-md px-2 py-1 border-gray-400"
            />
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
              "Add Certificate"
            )}
          </Button>
        </div>
      </div>

      <div className="w-full  border border-gray-400/20 mt-10 p-5 rounded-lg">
        <h3 className="text-3xl font-medium ">Manage Certificates</h3>
        <div className="w-full gap-4  p-3 grid max-sm:gap-5 max-sm:grid-cols-1 sm:grid-cols-2 space-y-4 lg:grid-cols-3 ">
          {data.map((item, idx) => (
            <div className="relative group" key={idx}>
              <CertificateCard key={idx} className="z-10" data={item} />
              <Button className="absolute hidden text-red-500 bottom-7 right-5 transition-all duration-500 cursor-pointer group-hover:block z-1000"
              onClick={() => {
                setId(item._id);
                setShowDialog(true)
              }}>
                <Trash
                  
                />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              certificate and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className={"cursor-pointer"}
              onClick={() => deleteCertificate(id)}
              type="submit"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CertificatesData;
