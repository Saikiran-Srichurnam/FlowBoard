import React from 'react'
import Input from '../ui/Input/Input';
import DateRangePicker from './DateRangePicker';

function Dashboard() {

  // get the username from the local storage
  const storedUserName = localStorage.getItem("userName")

  return (
    <div className='flex justify-between items-center'>
      <div>
        <h1 className='font-semibold text-black text-lg'>Dashboard</h1>
        <h1 className='text-body text-lg'>Welcome back, {storedUserName || "User"}! 👋</h1>
      </div>
      <div className='relative overflow-visible'>
        <DateRangePicker />
      </div>
    </div>
  );
}

export default Dashboard