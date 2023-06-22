import React from 'react'

type Props = {}

export default function Footer({ }: Props) {
    return (
        <div className='container mx-auto max-w-full mt-3 bg-gray-100'>
            <div className='
            pt-10
            grid 
            grid-cols-2 
            md:grid-cols-2
            lg:grid-cols-4 
            gap-3'>
                <div className='pb-4'>
                    <h3 className='font-extrabold text-lg pb-1'>Help</h3>
                    <p className='pb-1 xl:pb-2 hover:text-rose-500'>Help Center</p>
                    <p className='pb-1 xl:pb-2 hover:text-rose-500'>Safe imformation</p>
                    <p className='pb-1 xl:pb-2 hover:text-rose-500'>Support people disabilities</p>
                    <p className='pb-1 xl:pb-2 hover:text-rose-500'>Cancel option</p>
                    <p className='pb-1 xl:pb-2 hover:text-rose-500'>Measures to deal with covid-19</p>
                    <p className='pb-1 xl:pb-2 hover:text-rose-500'>Neighbor's fear report</p>
                </div>
                <div className='pb-4'>
                    <h3 className='font-extrabold text-lg pb-1'>Community</h3>
                    <p className='pb-1 xl:pb-2 hover:text-rose-500'>Airbnb.org: housing relief</p>
                    <p className='pb-1 xl:pb-2 hover:text-rose-500'>Supporting Afghan Refugees</p>
                    <p className='pb-1 xl:pb-2 hover:text-rose-500'>Anti-discrimination</p>
                </div>
                <div className='pb-4'>
                    <h3 className='font-extrabold text-lg pb-1'>Welcome guests</h3>
                    <p className='pb-1 xl:pb-2 hover:text-rose-500'>Try to receive guests</p>
                    <p className='pb-1 xl:pb-2 hover:text-rose-500'>AirCover for Hosts</p>
                    <p className='pb-1 xl:pb-2 hover:text-rose-500'>See resources for welcoming guests</p>
                    <p className='pb-1 xl:pb-2 hover:text-rose-500'>Visit the community forum</p>
                    <p className='pb-1 xl:pb-2 hover:text-rose-500'>Welcoming guests responsibly</p>
                </div>
                <div className='pb-4'>
                    <h3 className='font-extrabold text-lg pb-1'>Airbnb</h3>
                    <p className='pb-1 xl:pb-2 hover:text-rose-500'>News sites</p>
                    <p className='pb-1 xl:pb-2 hover:text-rose-500'>Learn new features</p>
                    <p className='pb-1 xl:pb-2 hover:text-rose-500'>Open letter from founders</p>
                    <p className='pb-1 xl:pb-2 hover:text-rose-500'>Career opportunities</p>
                    <p className='pb-1 xl:pb-2 hover:text-rose-500'>Investors</p>
                </div>
            </div>

            <div className="flex flex-wrap justify-center mt-4">
                <p>© 2023 Airbnb, Inc.</p>
                <ul className="flex flex-nowrap mb-4">
                    <li className="ml-6 !list-disc">Privacy</li>
                    <li className="ml-6 !list-disc">Rules</li>
                    <li className="ml-6 !list-disc">Sitemap</li>
                </ul>
            </div>
        </div>
    )
}