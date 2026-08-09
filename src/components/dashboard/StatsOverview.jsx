import { div, symbol } from 'framer-motion/client'
import React, { useState } from 'react'
import { ClipboardPenLine, CircleCheck, Hourglass, Users2Icon, ArrowUp, ArrowDown } from 'lucide-react'

function StatsOverview() {

  const statsData = [
    {
      symbol: ClipboardPenLine, symbolClass: "bg-primary/30 text-primary", name: "Total Projects", total: 24, performance: 12, text: "from last week"
    },
    { symbol: CircleCheck, symbolClass: "bg-success/10 text-success", name: "Tasks Completed", total: 156, performance: 18, text: "from last week" },
    { symbol: Hourglass, symbolClass: "bg-yellow-100 text-yellow-500", name: "In Progress", total: 32, performance: -5, text: "from last week" },
    { symbol: Users2Icon, symbolClass: "bg-primary/10 text-blue-500", name: "Team Members", total: 8, performance: 2, text: "from last week" }
  ]

  return (
    <section id="StatsOverview" className='grid grid-cols-2 xl:grid-cols-4 gap-4'>
      {statsData.map((data) => {

        const Icon = data.symbol

        const isPositive = data.performance >= 0;

        const ArrowSymbol = isPositive ? ArrowUp : ArrowDown

        return (
          <div key={data.name} className='bg-surface p-4 border-2 border-border rounded-md shadow-sm space-y-2 min-w-full md:min-w-56 transition-all hover:-translate-y-2 hover:shadow-lg hover:duration-300'>
            <div className='flex flex-col'>
              <div className=' flex gap-4 '>
                <span className={`p-2 rounded-md items flex justify-center items-center ${data.symbolClass}`}>
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