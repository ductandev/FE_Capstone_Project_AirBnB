import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Room } from "../../Redux/reducers/roomReducer";
import { BsFillStarFill, BsStarHalf } from 'react-icons/bs'
import { ToastOptions, toast } from 'react-toastify';

type Props = {
    room: Room;
};

const toastOptions: ToastOptions<{}> = {
    position: "top-center",
    autoClose: 400,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

export default function ListingCard({ room }: Props) {

    const [isRed, setIsRed] = useState(false);

    const handleClick = () => {
        setIsRed((preveState) => !preveState);
        if(!isRed){
            toast.success("Đã thêm vào yêu thích", toastOptions)
        }
    }

    return (
        <div className="
        bg-white 
        rounded-lg 
        shadow-lg 
        object-cover 
        overflow-hidden
        md:h-[395px]
        lg:h-[385px]
        group
        relative
        ">
            <NavLink to={`/detail/${room.id}`}>
                <div className="
                rounded-lg 
                overflow-hidden
                ">
                    <img
                        src={room.hinhAnh}
                        alt="..."
                        className="
                        lg:h-[211px]
                        !w-[200%] 
                        !max-w-[200%] 
                        group-hover:scale-110 
                        duration-200
                        transition-all
                    "/>
                </div>
                <div className="p-3">
                    <h2 className="
                    font-bold
                    mb-2 
                    text-md
                    group-hover:text-rose-500
                    md:h-[48px]
                    overflow-hidden
                    ">
                        {room.tenPhong}
                    </h2>
                    <p className="text-grey-500">
                        Phòng ngủ: {room.phongNgu} - Phòng tắm: {room.phongTam}
                    </p>
                    <p className="text-grey-500">Đón tối đa {room.khach} khách</p>
                    <p className="font-semibold">${room.giaTien} đêm</p>
                    <div className="flex flex-row text-rose-500 pt-1">
                        <span className="pe-1"><BsFillStarFill /></span>
                        <span className="pe-1"><BsFillStarFill /></span>
                        <span className="pe-1"><BsFillStarFill /></span>
                        <span className="pe-1"><BsFillStarFill /></span>
                        <span className="pe-1"><BsStarHalf /></span>
                    </div>
                </div>
            </NavLink>
            <button
                className="absolute top-1 right-3"
                onClick={handleClick}
                style={{
                    backgroundColor: isRed ? "red" : "transparent",
                    borderColor: "white",
                    borderWidth: 2,
                    borderRadius: "50%",
                    padding: 0,
                    height: 32,
                    width: 32,
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    style={{
                        display: "block",
                        fill: isRed ? "white" : "rgba(0, 0, 0, 0.5)",
                        height: 24,
                        width: 24,
                        margin: "4px auto",
                        stroke: "white",
                        strokeWidth: 2,
                        overflow: "visible",
                    }}>
                    <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z" />
                </svg>
            </button>

        </div>
    );
}
