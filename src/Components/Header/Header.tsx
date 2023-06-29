import React from 'react'
import Navbar from './Navbar/Navbar'
import RegisterModal from '../Modals/RegisterModal'
import ToasterProvider from '../../Providers/ToasterProvider'
import LoginModal from '../Modals/LoginModal'

type Props = {}

export default function Header({ }: Props) {
  return (
    <div>
      <ToasterProvider />
      <LoginModal/>
      <RegisterModal />
      <Navbar />
    </div>
  )
}