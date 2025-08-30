import React, { useEffect, useState } from 'react'
import { data } from '../../../public/data'
import ProjectCard from '../../components/ProjectCard'
import axiosInstance from '@/healper/axiosInstance'
import { toast } from 'sonner'

const Projects = () => {
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
  useEffect(()=>{
    fetchData()
  }, [])
  return (
    <div className="w-full h-full py-5  px-5 md:px-10 flex flex-col gap-5 overflow-auto">
      <h1 className="text-white text-xl md:text-2xl ml-1.5 font-medium ">Projects</h1>
      <div className="grid grid-cols-1 max-sm:place-items-center space-y-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 space-y-6 space-x-5 mb-2 max-md:mt-5 mt-2">
        {
          data?.map((item, idx)=>(
              <ProjectCard key={idx} data={item}/>
          ))
        }
      </div>
    </div>
  )
}

export default Projects
