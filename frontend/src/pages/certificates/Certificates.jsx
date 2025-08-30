import React, { useEffect, useState } from 'react'
import CertificateCard from '../../components/CertificateCard'
import axiosInstance from '@/healper/axiosInstance'

const Certificates = () => {
  const [data, setData] = useState([])
  const fetchData = async() => {
    try {
      const res = await axiosInstance.get('/api/v1/details/get-all-certificates')
      if(res.data?.success){
        setData(res.data.certificates)
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
      <h1 className="text-white text-xl md:text-2xl ml-1.5 font-medium ">Certificates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
        {
          data?.map((item, idx)=>(
            <CertificateCard key={idx} data={item} />
          ))
        }
      </div>
    </div>
  )
}

export default Certificates
