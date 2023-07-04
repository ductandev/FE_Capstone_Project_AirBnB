'use client'
import React from 'react'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'

type Props = {}

export default function Navbar({}: Props) {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
        <div className='py-3 border-b-[1px]'>
            <div className="container mx-auto">
                <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                    <Logo/>
                    <Search/>
                    <UserMenu/>
                </div>
            </div>
        </div>
    </div>
  )
}