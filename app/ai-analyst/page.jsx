import Header from '@/components/qa/Header'
import React from 'react'

const page = () => {
  return (
    <div>
        <Header />
        <div className='flex justify-center items-center h-[80vh]'>
            <h1 className='text-2xl font-bold'>مرحبًا بك في صفحة محلل الذكاء الاصطناعي</h1>
        </div>
    </div>
  )
}

export default page