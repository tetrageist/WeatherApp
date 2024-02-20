import React from 'react'

const Display = () => {
  return (
    <div className='flex justify-center items-center bg-blue-100 p-6'>
        <div>
            <p className='text-center text-sm uppercase font-semibold pb-2'>Seattle, WA</p>
            <p className='text-5xl text-center pb-2'>42°</p>
            <p className='text-center text-sm uppercase font-semibold'>Party Cloudy</p>
            <div className='flex gap-4 justify-center'>
                <p>H:48°</p>
                <p>L:41°</p>
            </div>
        </div>
    </div>
  )
}

export default Display
