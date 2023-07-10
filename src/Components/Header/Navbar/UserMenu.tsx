'use client'
import React from 'react'
import { useState, useCallback } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { TbWorld } from 'react-icons/tb'
import Avartar from '../../Avartar/Avartar'
import MenuItem from './MenuItem'
import useRegisterModal from '../../../Hooks/useRegisterModal'
import useLoginModal from '../../../Hooks/useLoginModal'
import { USER_LOGIN, clearStorage } from '../../../Util/config'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/configStore'

import { useNavigate } from 'react-router-dom';

type Props = {}

export default function UserMenu({ }: Props) {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isOpen, setIsOpen] = useState(false);

    const { userLogin } = useSelector((state: RootState) => state.authReducer)

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, [setIsOpen])

    const handleLoginModalOpen = useCallback(() => {
        setIsOpen(false);
        loginModal.onOpen();
      }, [loginModal, setIsOpen]);
      
    const handleRegisterModalOpen = useCallback(() => {
    setIsOpen(false);
    registerModal.onOpen();
    }, [registerModal, setIsOpen]);


    // Chuyển trang profile khi onclick sử dụng useNavigate
    const navigate = useNavigate();

    const handleProfiles = useCallback(() => {
        setIsOpen(false);
        navigate('/profile');
    }, [setIsOpen, navigate]);

    const handleTripHistory = useCallback(() => {
        setIsOpen(false);
        navigate('/trips-history');
    }, [setIsOpen, navigate]);

    const handleFavourite = useCallback(() => {
        setIsOpen(false);
        navigate('/favourite');
    }, [setIsOpen, navigate]);



    const renderMenuItem = () => {
        if (typeof userLogin !== 'undefined') {
            return(
            <>
                <MenuItem onClick={handleProfiles} label='Thông tin tài khoản' />
                <MenuItem onClick={handleTripHistory} label='Lịch sử chuyến đi' />
                <MenuItem onClick={handleFavourite} label='Danh sách yêu thích' />
                <hr />
                <MenuItem onClick={() => {
                    // kiểm tra xem giá trị trả về từ clearStorage(USER_LOGIN) có tồn tại hay không
                    clearStorage(USER_LOGIN);
                    toast.success('Đăng xuất thành công!', {
                        position: "top-center",
                        autoClose: 300,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setTimeout(() => {
                        window.location.reload(); //f5
                    }, 700);
                }} label='Đăng xuất' />
            </>
            );

        } else {
            return(
            <>
                <MenuItem onClick={handleLoginModalOpen} label='Đăng nhập' />
                <MenuItem onClick={handleRegisterModalOpen} label='Đăng ký' />
                <hr />
                <MenuItem onClick={() => { }} label='Cho thuê nhà' />
                <MenuItem onClick={() => { }} label='Trợ giúp' />
            </>
             )
        }
    }



    return (
        <div className='relative'>
            <div className="flex flex-row items-center gap-2">
                <div className={"hidden lg:block text-sm font-semiblod p-3 rounded-full hover:bg-neutral-100 transition cursor-pointer"} onClick={() => { }}>
                    Trở thành chủ nhà
                </div>
                <div className={"hidden lg:block text-xl font-semiblod py-2 px-2 rounded-full hover:bg-neutral-100 transition cursor-pointer"} onClick={() => { }}>
                    <TbWorld />
                </div>
                <div className={"p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"} 
                    onClick={toggleOpen}>
                    <AiOutlineMenu style={{ fontSize: '20px' }} />
                    <div className="hidden md:block">
                        <Avartar />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-52 lg:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm mt-2 border-[1px] border-solid border-light-gray'>
                    <div className='flex flex-col cursor-pointer'>
                        {renderMenuItem()}
                    </div>
                </div>
            )}
        </div>
    )
}