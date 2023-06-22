import React from 'react'
import Navbar from './Navbar/Navbar'
// import ClientOnly from '../ClientOnly/ClientOnly'
import RegisterModal from '../Modals/RegisterModal'
import ToasterProvider from '../../Providers/ToasterProvider'

type Props = {}

export default function Header({ }: Props) {
  return (
    <div>
      {/* <ClientOnly> */}
      <ToasterProvider />
      <RegisterModal />
      <Navbar />
      {/* </ClientOnly> */}
    </div>
  )
}