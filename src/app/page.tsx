import React from 'react';
import {useState} from 'react';

export default function Card(){
  return (
    <div
      className="flex justify-center items-center min-w-screen min-h-screen bg-gray-800 text-white font-sans"
    >
      <div
        className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full flex justify-center items-center flex-col"
      >
        <h2
          className="text-3xl font-bold mb-6"
        >To Do List</h2>
        <ul
          className='flex flex-col space-y-4 w-full overflow-y-auto max-h-60'
        >
          <li className=' mb-6 list-inside text-white bg-gray-950 p-4 rounded-lg shadow-md w-full overflow-y-auto max-h-60 hover:bg-gray-800 flex justify-between items-center'>
            First Task
            <button
              className='bg-red-500 text-white px-2 py-1 rounded hover:cursor-pointer hover:bg-red-700 hover:shadow-lg hover:ease-in-out'
            >Delete</button>
            
          </li>
          <li className='space-y-4 mb-6 list-inside text-white bg-gray-950 p-4 rounded-lg shadow-md w-full overflow-y-auto max-h-60 hover:bg-gray-800 flex justify-between items-center'>
            Second Task
            <button
              className='bg-red-500 text-white px-2 py-1 rounded hover:cursor-pointer hover:bg-red-700 hover:shadow-lg hover:ease-in-out'
            >Delete</button>
          </li>
        </ul>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-blue-900 hover:shadow-lg hover:ease-in-out">Add Task</button>
      </div>
    </div>
  )
}