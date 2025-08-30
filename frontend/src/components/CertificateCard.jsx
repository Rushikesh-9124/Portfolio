import React from 'react'
import { Button } from './ui/button'

const CertificateCard = ({data}) => {
  return (
    <div className='max-w-[330px] max-h-[250px] bg-white rounded-xl group hover:scale-105 relative z-100 overflow-visible transition-all duration-300 cursor-pointer'>
      <div className="relative w-full h-full overflow-hidden rounded-xl group">
        <img src={data?.certificateImg} className='group-hover:brightness-50 group-active:brightness-50 transition-all duration-300 ' alt="" />
      </div>
      <div className="opacity-0 group-hover:opacity-100 group-active:opacity-100 translate-y-10 transition-all duration-500 absolute left-5 -bottom-0 group-active:-translate-y-7  group-hover:-translate-y-7  ">
        <h1 className=' text-white text-md md:text-xl mb-1'>{data.title}</h1>
        <Button className={'bg-gray-400/50'} variant={'outline'}><a className='text-white transition-all duration-300 group-hover:text-black' href={data.verify}>Verify</a></Button>
      </div>
    </div>
  )
}

export default CertificateCard
