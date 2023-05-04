import React from 'react'

const User = ({name,imgUrl, timeAgo, amount}) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex gap-2'>
        <img src={`${imgUrl}`} alt='img' className='h-10 w-10 rounded-full'></img>
        <div>
          <p className='font-bold'>{name}</p>
          <p className='text-gray-400 text-sm'>{timeAgo} minutes ago</p>
        </div>
      </div>
      <div>
        <p className='font-bold'>+${amount}</p>
      </div>
    </div>
  )
}

export default User