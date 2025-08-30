import React from 'react'

const SkillCard = ({image, skillName, progress, category}) => {
  return (
    <div className='overflow-auto max-sm:px-5  hover:scale-103 transition-all duration-200 shadow-xs shadow-green-100 max-w-[160px] max-h-[240px] border border-gray-500/50 rounded-xl py-3 bg-gray-400/6 flex flex-col gap-2 items-center text-center text-white'>
      <img className='w-[80%] rounded-2xl grayscale-15' src={image} alt="" />
      <div className="flex flex-col gap-1">
        <h5 className='text-md sm:text-xl font-medium'>{skillName}</h5>
        <p className='text-sm'>{progress}</p>
        <p className='text-xs border px-1 py-0.5 bg-blue-400/40 rounded-2xl'>{category}</p>
      </div>
    </div>
  )
}

export default SkillCard
