import { title } from 'framer-motion/client';
import React from 'react';
import { LuFolderKanban } from "react-icons/lu";

function AuthHeader({ title, subtitle }) {
  return (
    <div className='flex flex-col justify-center items-center' >
      <h1 className="text-3xl  font-bold flex gap-2 text-primary">
        <span >< LuFolderKanban size={32} /></span><p className='inter-font tracking-wider text-primary'>FlowBoard</p>
      </h1>
      <p className="text-center mt-4 text-heading">
        {title}
      </p>
      <p className='text-center text-muted dancing-script-font mt-1 text-lg'>
        {subtitle}
      </p>
    </div>
  )
}

export default AuthHeader