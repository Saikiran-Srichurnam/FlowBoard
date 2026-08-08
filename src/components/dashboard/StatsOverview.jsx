import { div, symbol } from 'framer-motion/client'
import React, { useState } from 'react'
import { ClipboardPenLine, CircleCheck, Hourglass, Users2Icon, ArrowUp, ArrowDown } from 'lucide-react'

function StatsOverview() {

  const statsData = [
    { symbol: ClipboardPenLine, name: "Total Projects", total: 24, performance: 12, text: "from last week" },
    { symbol: CircleCheck, name: "Tasks Completed", total: 156, performance: 18, text: "from last week" },
    { symbol: Hourglass, name: "In Progress", total: 32, performance: -5, text: "from last week" },
    { symbol: Users2Icon, name: "Team Members", total: 8, performance: 2, text: "from last week" }
  ]

  return (
    <section id="StatsOverview" className='grid grid-cols-2 xl:grid-cols-4 gap-4'>
      {statsData.map((data) => {

        const Icon = data.symbol

        const isPositive = data.performance >= 0;

        const ArrowSymbol = isPositive ? ArrowUp : ArrowDown

        return (
          <div key={data.name} className='bg-surface p-4 border border-border rounded-xl shadow-sm space-y-2 min-w-full md:min-w-56'>
            <div className='flex flex-col'>
              <div className=' flex gap-4 '>
                <span className='bg-primary/10 p-2 text-primary rounded-md items flex justify-center items-center'>
                  <Icon className='h-10 w-10' />
                </span>
                <div className='flex flex-col space-y-1'>
                  <h2 className='text-sm text-gray-500'>{data.name}</h2>
                  <h1 className='text-3xl text-heading font-semibold'>{data.total}</h1>
                </div>
              </div>
            </div>
            <p className='flex justify-center items-center gap-2 text-sm'>
              <span className={`flex justify-center items-center gap-1 ${isPositive ? "text-success" : "text-danger"}`}>
                <ArrowSymbol />{data.performance}%</span>
              {data.text}
            </p>
          </div>
        );
      })}
    </section>
  )
}

export default StatsOverview