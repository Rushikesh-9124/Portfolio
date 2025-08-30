import React from 'react'
import { Button } from './ui/button'

const ProjectCard = ({data}) => {
  return (
    <div className='w-full h-full  flex flex-col items-center group justify-center p-2 overflow-auto hover:scale-103 transition-all duration-200 shadow-xs shadow-green-100 max-w-[240px] max-h-[310px] border border-gray-500/50 rounded-xl  bg-gray-400/6 '>
      <div className="w-full h-auto flex items-center justify-center overflow-hidden">
        <img src={data?.projectImg} className='w-[85%] h-[120px]  rounded-lg' alt="" />
      </div>
      <div className="flex flex-col items-center mt-2">
        <h4 className='text-lg text-wrap font-semibold text-center text-white/80 group-hover:text-white'>{data?.title}</h4>
        <div className="w-full p-3 flex flex-wrap gap-1 justify-center">
            {
                data?.technologies?.map((item, idx)=>(
                    <p className='border px-1.5 py-0.5  rounded-lg text-xs text-gray-400' key={idx}>{item}</p>
                ))
            }
        </div>
        <div className="flex gap-2 ">
            <Button variant={'outline'} className='max-w-[80px] px-1 bg-transparent text-white/70 hover:text-black hover:bg-white/60 transition-all duration-300'><a className='text-xs font-semibold' href={data?.liveDemo}>Live Demo</a></Button>
            <Button className='hover:bg-black/70 transition-all duration-300'><a href={data?.github} className='max-w-[80px] px-1 '>GitHub</a></Button>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
