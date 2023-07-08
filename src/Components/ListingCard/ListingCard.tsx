import React from "react";
import { NavLink } from "react-router-dom";
import { Room } from "../../Redux/reducers/roomReducer";
import { BsFillStarFill, BsStarHalf } from 'react-icons/bs'

type Props = {
    room: Room;
};

export default function ListingCard({ room }: Props) {
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
        </div>
    );
}
