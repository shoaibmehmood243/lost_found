import React from 'react';

const Card = ({ _id, name, rollNumber, description }) => {
  return (
    <div className='bg-white rounded-lg p-6'>
      <div className='w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white'>{name[0]}</div>
      <h2 className='font-bold text-lg mt-5'>Name: {name}</h2>
      <p className='text-gray-500'>Roll Number: {rollNumber}</p>
      <p className='mt-4'>Description: {description}</p>
    </div>
  )
}

export default Card
