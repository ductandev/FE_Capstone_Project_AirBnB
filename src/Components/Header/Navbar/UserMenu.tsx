'use client'
import React, { useEffect } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../../Redux/configStore'

import { useNavigate } from 'react-router-dom';
import { profileUserAsyncAction } from '../../../Redux/reducers/userReducer'

type Props = {}

export default function UserMenu({ }: Props) {

  const { userLogin } = useSelector((state: RootState) => state.authReducer)
  const { userProfile } = useSelector((state: RootState) => state.userReducer)
  const dispatch: DispatchType = useDispatch();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);


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
    navigate('/trips');
  }, [setIsOpen, navigate]);

  const handleFavourite = useCallback(() => {
    setIsOpen(false);
    navigate('/favourite');
  }, [setIsOpen, navigate]);


  // Di chuyển hàm getUserProfile ra ngoài phạm vi của component
  const getUserProfile = useCallback(() => {
    if (userLogin && userLogin.id) { // Check if userLogin and userLogin.id are defined
      const action = profileUserAsyncAction(userLogin.id) // Use userLogin.id here
      dispatch(action)
    }
  }, [userLogin, dispatch])

  // Sử dụng useEffect để gọi hàm lấy thông tin userProfile khi userLogin thay đổi
  useEffect(() => {
    getUserProfile()
  }, [getUserProfile, userLogin])

  const renderAvatar = () => {
    // Kiểm tra userProfile có tồn tại và không phải là một mảng rỗng
    if (typeof userProfile !== "undefined") {
      return (
        <>
          <img className='rounded-full h-[30px]' src={userProfile?.avatar} height={30} width={30} alt='Avatar'></img>
        </>
      )
    } else {
      return (
        <>
          <Avartar />
        </>
      )
    }
  }


  const renderMenuItem = () => {
    if (typeof userLogin !== 'undefined') {
      return (
        <>
          <MenuItem onClick={handleProfiles} label='Thông tin tài khoản' />
          <MenuItem onClick={handleTripHistory} label='Lịch sử chuyến đi' />
          <MenuItem onClick={handleFavourite} label='Danh sách yêu thích' />
          <hr />
          <MenuItem onClick={() => {
            // kiểm tra xem giá trị trả về từ clearStorage(USER_LOGIN) có tồn tại hay không
            clearStorage(USER_LOGIN);
            clearStorage("UserProfile");
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
              window.scrollTo(0, 0); // Cuộn về đầu trang khi component được render
              window.location.reload(); //f5
            }, 700);
            navigate('/');
            setIsOpen(false);
          }} label='Đăng xuất' />
        </>
      );

    } else {
      return (
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
            {renderAvatar()}
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