import React, { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/configStore";

import { AiFillStar } from "react-icons/ai";
import { BiMedal } from "react-icons/bi";
import Calendar from "../../Components/Calendar/Calendar";

import { addDays } from "date-fns";

type Props = {};


export default function Book({ }: Props) {
  const { roomDetail } = useSelector((state: RootState) => state.roomReducer);

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 5));
  const [length, setLength] = useState<number>(5);

  const [showCalendar, setShowCalendar] = useState(false);

  const tongTien = roomDetail?.giaTien !== undefined ? roomDetail.giaTien * length : 0;

  // Callback function to update the selectedDate state with the props from the Calendar component
  const handleDateRangeChange = (startDate: Date, endDate: Date, length: number) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setLength(length);
  };

  const handleButtonClick = useCallback(() => {
    setShowCalendar((value) => !value)
  }, [setShowCalendar])

  return (
    <div className="container mx-auto mt-14 w-full xl:max-w-[1120px] p-0">
      <div className="flex items-center">
        <NavLink to={"/"}>
          <FaChevronLeft className="mr-10 text-[18px]" />
        </NavLink>
        <p className="text-3xl font-medium">
          Yêu cầu đặt phòng/đặt chỗ - Airbnb
        </p>
      </div>
      <div className="mt-8 grid grid-cols-2">
        <div className="col-span-2 md:col-span-1">
          <div className="mb-12 rounded-xl border p-6">
            <div className="flex flex-row justify-between items-center w-full">
              <div>
                <p className="font-bold">Nơi này rất hiếm khi còn chỗ.</p>
                <p>Nhà/phòng cho thuê này thường kín phòng.</p>
              </div>
              <div>
                <IoDiamond className="text-4xl text-rose-500" />
              </div>
            </div>
          </div>

          <div>
            <p className="text-2xl font-medium">Chuyến đi của bạn</p>
            <div className="mt-6 flex justify-between relative">
              <div>
                <p className="font-medium">Ngày</p>
                <p className="mt-1 font-light text-gray-400 text-sm md:text-base">
                  {startDate.toLocaleDateString()} đến {endDate.toLocaleDateString()}
                </p>
              </div>


              <button
                type="button"
                className="h-12 text-base leading-[18px] underline shadow-none"
                onClick={handleButtonClick}
              >
                Chỉnh sửa
              </button>
              {showCalendar && (
                <div className="absolute w-full top-14 duration-300 borde rounded-xl border-neutral-200 overflow-hidden">
                  <Calendar onDateRangeChange={handleDateRangeChange} />
                </div>
              )}




            </div>

            <div className="mt-6 flex justify-between">
              <div>
                <p className="font-medium">Khách</p>
                <p className="mt-1 font-light text-gray-400 text-sm md:text-base">
                  {roomDetail?.khach} khách
                </p>
              </div>
              <button
                type="button"
                className="h-12 text-base leading-[18px] underline shadow-none"
              >
                Chỉnh sửa
              </button>
            </div>
          </div>

          <hr className="my-8" />

          <p className="text-xs font-light">
            Bằng việc chọn nút bên dưới, tôi đồng ý với Nội quy nhà của Chủ nhà,
            Quy chuẩn chung đối với khách, Chính sách đặt lại và hoàn tiền của
            Airbnb, và đồng ý rằng Airbnb có thể tính phí vào phương thức thanh
            toán của tôi nếu tôi phải chịu trách nhiệm về thiệt hại.
          </p>

          <div className="my-8">
            <button
              type="button"
              className="h-12 text-base rounded-lg px-6 focus:outline-none w-full bg-rose-500 text-white hover:text-black"
            >
              <div className="flex-center w-full gap-2">
                Xác nhận và thanh toán • Airbnb
              </div>
            </button>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 xl:ml-24">
          <div className="border rounded-xl sticky p-4">
            <div className="grid grid-cols-3">
              <div className="w-[140px] overflow-hidden rounded-lg col-span-1">
                <img
                  className="mr-2 !w-[200%] !max-w-[200%] object-fill"
                  src={roomDetail?.hinhAnh}
                  alt="..."
                />
              </div>
              <div className="col-span-2 flex flex-col justify-between ml-2">
                <div>
                  <p className="text-xs text-gray-400">Toàn bộ căn phòng</p>
                  <p className="text-sm">Closer Home !!!</p>
                </div>
                <div className="text-xs flex items-center">
                  <AiFillStar className="inline" />
                  4 •
                  <BiMedal className="inline" />
                  <p className="text-gray-400">Chủ nhà siêu cấp</p>
                </div>
              </div>
            </div>
            <hr className="my-4" />
            <p>Đặt phòng của bạn được bảo vệ bởi AirCover</p>
            <hr className="my-4" />
            <h1>Chi tiết giá</h1>
            <div className="mt-4">
              <div className="flex justify-between">
                <p className="text-sm underline">
                  {roomDetail?.giaTien}$ x {length} đêm
                </p>
                <p className="text-sm">{tongTien}$</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-semibold">
                <p>Total</p>
                <p>{tongTien}$</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
