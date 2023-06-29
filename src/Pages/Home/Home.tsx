import React from 'react'

type Props = {}

export default function Home({}: Props) {
  return (
    <div className="container mx-auto pt-24">
        <h1 className='font-bold text-lg xl:text-xl'>Explore nearby places</h1>
        <h1 className='font-bold text-lg xl:text-xl'>Stay anywhere</h1>
        <div className="pt-4 grid sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <img src="https://picsum.photos/200" alt="..." />
        </div>
    </div>
  )
}