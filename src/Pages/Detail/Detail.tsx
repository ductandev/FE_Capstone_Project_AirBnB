/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DispatchType, RootState } from "../../Redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { getDataRoomIdAsyncAction } from "../../Redux/reducers/roomReducer";
import { AiFillStar, AiOutlineRight } from "react-icons/ai";
import { Comment, getDataCommentRoomIdAsyncAction } from "../../Redux/reducers/commentReducer";
import { getDataLocationIDAsyncAction } from "../../Redux/reducers/locationReducer";

import { GrUpload } from "react-icons/gr";
import { BsSuitHeart } from "react-icons/bs";
import { TbIroning3, TbToolsKitchen2 } from "react-icons/tb";
import { GiWashingMachine } from "react-icons/gi";
import { LuAirVent, LuBedDouble } from "react-icons/lu";
import { PiTelevisionBold } from "react-icons/pi";
import { BiWifi } from "react-icons/bi";
import { FaParking, FaSwimmingPool, } from "react-icons/fa";
import { MdOutlineBathroom } from "react-icons/md";
import Calendar from "../../Components/Calendar/Calendar";

// Thư viện react-day-range
import { addDays } from "date-fns";

import { useNavigate } from "react-router-dom";



type Props = {};

// eslint-disable-next-line no-empty-pattern
export default function Detail({ }: Props) {

  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 5));
  const [length, setLength] = useState<number>(5);

  const { roomDetail } = useSelector((state: RootState) => state.roomReducer);
  const { arrCommentRoomId } = useSelector((state: RootState) => state.commentReducer);
  const { locationDetail } = useSelector((state: RootState) => state.locationReducer);
  const dispatch: DispatchType = useDispatch();
  const param = useParams();

  const navigate = useNavigate();

  const getRoomDetailAPI = () => {
    const id: string | undefined = param.id;
    const action1 = getDataRoomIdAsyncAction(id as string);
    const action2 = getDataCommentRoomIdAsyncAction(id as string);
    const action3 = getDataLocationIDAsyncAction(id as string);
    dispatch(action1);
    dispatch(action2);
    dispatch(action3);
  };

  useEffect(() => {
    getRoomDetailAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id]);


  const handleDateRangeChange = (startDate: Date, endDate: Date, length: number) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setLength(length);
  };

  const tongTien = roomDetail?.giaTien !== undefined ? roomDetail.giaTien * length : 0;

  const renderComent = (): JSX.Element[] => {
    return arrCommentRoomId.map((item: Comment, index) => {
      const formattedDate = item.ngayBinhLuan.toLocaleString();

      return (
        <div className="mt-8 md:mr-20" key={index}>
          <div className="flex items-center">
            <div className="rounded-full w-[32px] h-[32px] overflow-hidden bg-black">
              <img className="rounded-full" width={32} height={32} src={item.avatar} alt="" />
            </div>
            <div className="ml-3 text-xs md:text-base">
              <p>{item.tenNguoiBinhLuan}</p>
              <p className="mt-1 text-xs text-gray-400 md:text-base">{formattedDate}</p>
            </div>
          </div>
          <p className="mt-4 text-xs md:text-base">
            {item.noiDung}
          </p>
        </div>
      )
    })
  }


  
  return (
    <div className="container mx-auto xl:max-w-[1300px]">
      <h1 className="text-xl md:text-[26px] text-[#484848] font-semibold mt-4">
        {roomDetail?.tenPhong}
      </h1>

      <div className="flex flex-row justify-between text-xs md:text-base">
        <div className="flex items-center">
          <AiFillStar className="inline mb-1" /> 4,81
          <p className="ps-2 font-medium underline cursor-pointer">
            {arrCommentRoomId.length} đánh giá
          </p>
          <p className="ps-4 font-medium underline cursor-pointer">
            {locationDetail?.tenViTri}, {locationDetail?.tinhThanh},{" "}
            {locationDetail?.quocGia}
          </p>
        </div>

        <div className="hidden md:flex flex-row justify-center">
          <button className="flex items-center rounded-lg hover:bg-[#F7F7F7] px-3 py-1">
            <GrUpload />
            <span className="ms-2  font-semibold">Chia sẻ</span>
          </button>
          <button className="flex items-center rounded-lg hover:bg-[#F7F7F7] px-2 py-1">
            <BsSuitHeart />
            <span className="ms-1  font-semibold">Lưu</span>
          </button>
        </div>
      </div>

      <img className="rounded-xl mt-4" src={roomDetail?.hinhAnh} alt="..." />

      <div className="grid lg:grid-cols-3 lg:gap-3 my-4">
        <div className="col-span-1 lg:col-span-2">
          <h1 className="text-xl font-semibold">
            Toàn bộ nhà - Số lượng phòng
          </h1>
          <ul className="flex flex-col md:flex-row list-disc mb-6 text-sm md:text-base">
            <li className="ms-4 me-6">{roomDetail?.khach} khách</li>
            <li className="ms-4 me-6">{roomDetail?.phongNgu} phòng ngủ</li>
            <li className="ms-4 me-6">{roomDetail?.giuong} giường</li>
            <li className="ms-4">{roomDetail?.phongTam} phòng tắm</li>
          </ul>
          <hr />

          <div className="my-8">
            <h1 className="text-lg md:text-[22px] font-bold mt-8">
              Giới thiệu về chỗ ở này
            </h1>
            <p className="text-sm md:text-base">{roomDetail?.moTa}</p> <br />
            <p className="mb-4 text-sm md:text-base">
              Mọi đặt phòng đều được bảo vệ miễn phí trong trường hợp Chủ nhà
              hủy, thông tin nhà/phòng cho thuê không chính xác và những vấn đề
              khác như sự cố trong quá trình nhận phòng.
            </p>
            <span className="block font-semibold underline">
              Hiển thị thêm <AiOutlineRight className="inline" />
            </span>
          </div>
          <hr />

          <div className="mt-8">
            <p className="mb-4 text-lg md:text-[22px] font-bold">
              Nơi này có những gì cho bạn
            </p>
            <div className="flex flex-wrap gap-y-2 mb-8">
              <div className="text-black-200 flex min-w-[50%] items-center">
                <TbIroning3 className="me-3 font" size={24} />
                <span>Bàn Là</span>
              </div>
              <div className="text-black-200 flex min-w-[50%] items-center">
                <LuBedDouble className="me-3" size={24} />
                <span>Giường</span>
              </div>
              <div className="text-black-200 flex min-w-[50%] items-center">
                <GiWashingMachine className="me-3" size={24} />
                <span>Máy giặt</span>
              </div>
              <div className="text-black-200 flex min-w-[50%] items-center">
                <TbToolsKitchen2 className="me-3" size={24} />
                <span className="line-through">Bếp</span>
              </div>
              <div className="text-black-200 flex min-w-[50%] items-center">
                <PiTelevisionBold className="me-3" size={24} />
                <span>TV</span>
              </div>
              <div className="text-black-200 flex min-w-[50%] items-center">
                <LuAirVent className="me-3" size={24} />
                <span>Điều hòa</span>
              </div>
              <div className="text-black-200 flex min-w-[50%] items-center">
                <BiWifi className="me-3" size={24} />
                <span>Wifi</span>
              </div>
              <div className="text-black-200 flex min-w-[50%] items-center">
                <FaParking className="me-3" size={24} />
                <span>Bãi đỗ xe</span>
              </div>
              <div className="text-black-200 flex min-w-[50%] items-center">
                <FaSwimmingPool className="me-3" size={24} />
                <span className="line-through">Hồ bơi</span>
              </div>
              <div className="text-black-200 flex min-w-[50%] items-center">
                <MdOutlineBathroom className="me-3" size={24} />
                <span>Phòng tắm</span>
              </div>
            </div>
            <button className="flex items-center rounded-lg hover:bg-[#F7F7F7] px-4 py-3 border border-black mb-8">
              <span className="ms-1  font-semibold">
                Hiển thị tất cả 25 tiện nghi
              </span>
            </button>
            <hr />

            <div className="mt-8">
              <div className="flex flex-wrap flex-row justify-between mb-4">
                <div>
                  <h1 className="text-xl font-bold">
                    {length} đêm tại địa điểm này
                  </h1>
                  {startDate && endDate && (
                    <p className="hidden sm:flex text-sm font-thin text-[#717171]">
                      {startDate.toLocaleDateString()} -{" "}
                      {endDate.toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex flex-row justify-between items-center border border-black rounded-lg bg-white text-xs mt-2 sm:mt-0">
                  <div className="px-2 sm:px-3 lg:px-6 py-1">
                    <p className="font-bold">CHECK - IN</p>
                    <p>{startDate.toLocaleDateString()}</p>
                  </div>
                  <div className="px-2 sm:px-3 lg:px-6 py-1">
                    <p className="font-bold">CHECK - OUT</p>
                    <p>{endDate.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <Calendar onDateRangeChange={handleDateRangeChange} />
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="sticky top-[85px] ml-2 pt-6 ">
            <div className="min-h-[200px] max-w-full rounded-xl border-[0.25px] border-light-gray p-6 shadow-modal">
              <p>Add dates for prices</p>
              <div className="rounded-t-xl border border-black flex flex-row justify-around text-[10px] lg:text-xs">
                <div className="px-2 sm:px-3 lg:px-6 py-1 ">
                  <p className="font-bold">CHECK - IN</p>
                  <p>{startDate.toLocaleDateString()}</p>
                </div>
                <div className="border-e border-black"></div>
                <div className="px-2 sm:px-3 lg:px-6 py-1">
                  <p className="font-bold">CHECK - OUT</p>
                  <p>{endDate.toLocaleDateString()}</p>
                </div>
              </div>
              <div className="rounded-b-xl border border-black text-xs border-t-0">
                <div className="p-1 text-center">
                  <p className="font-bold">GUEST</p>
                  <p>{roomDetail?.khach}</p>
                </div>
              </div>

              <button
                type="button"
                className="bg-rose-500 text-white hover:text-black h-12 text-base leading-[18px] inline-block touch-manipulation select-none rounded-lg border-transparent px-6 transition-all duration-200 ease-linear focus:outline-none border border-solid font-semibold shadow-drop w-full mt-4"
              >
                <div className="flex-center w-full gap-2" onClick={()=>{
                  navigate('/book')
                }}>Đặt phòng</div>
              </button>
              <div>
                <p className="mt-4 text-center text-xs">
                  You won't be charged yet
                </p>
                <div className="mt-4">
                  <div className="flex justify-between">
                    <p className="text-sm underline">
                      {roomDetail?.giaTien}$ x {length} đêm
                    </p>
                    <p className="text-sm">{tongTien}$</p>
                  </div>
                  <div className="my-4">
                    <div className="h-px w-full bg-gray-300" />
                  </div>
                  <div className="flex justify-between font-semibold">
                    <p>Total</p>
                    <p>{tongTien}$</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div>
        <div className="flex items-center text-lg md:text-[22px] font-semibold mt-8">
          <AiFillStar className="inline mb-1" /> 4,81
          <p className="ps-2 cursor-pointer">
            · {arrCommentRoomId.length} đánh giá
          </p>
        </div>
        <div className="mt-4 grid grid-cols-2">
          <div className="col-span-1 mt-2 md:mt-4 mr-2 md:mr-24 flex items-center justify-between">
            <h1 className="font-light text-xs md:text-base">Mức độ sạch sẽ</h1>
            <div className="flex w-1/3 items-center">
              <div className="mr-3 h-1 w-full rounded bg-gray-300">
                <div
                  className="h-1 rounded bg-black"
                  style={{ width: "92%" }}
                />
              </div>
              <span className="text-xs font-medium">4.6</span>
            </div>
          </div>
          <div className="col-span-1 mt-2 md:mt-4 mr-2 md:mr-24 flex items-center justify-between">
            <h1 className="font-light text-xs md:text-base">Giao tiếp</h1>
            <div className="flex w-1/3 items-center">
              <div className="mr-3 h-1 w-full rounded bg-gray-300">
                <div
                  className="h-1 rounded bg-black"
                  style={{ width: "84%" }}
                />
              </div>
              <span className="text-xs font-medium">4.2</span>
            </div>
          </div>
          <div className="col-span-1 mt-2 md:mt-4 mr-2 md:mr-24 flex items-center justify-between">
            <h1 className="font-light text-xs md:text-base">Nhận phòng</h1>
            <div className="flex w-1/3 items-center">
              <div className="mr-3 h-1 w-full rounded bg-gray-300">
                <div
                  className="h-1 rounded bg-black"
                  style={{ width: "98%" }}
                />
              </div>
              <span className="text-xs font-medium">4.9</span>
            </div>
          </div>
          <div className="col-span-1 mt-2 md:mt-4 mr-2 md:mr-24 flex items-center justify-between">
            <h1 className="font-light text-xs md:text-base">Độ chính xác</h1>
            <div className="flex w-1/3 items-center">
              <div className="mr-3 h-1 w-full rounded bg-gray-300">
                <div
                  className="h-1 rounded bg-black"
                  style={{ width: "98%" }}
                />
              </div>
              <span className="text-xs font-medium">4.9</span>
            </div>
          </div>
          <div className="col-span-1 mt-2 md:mt-4 mr-2 md:mr-24 flex items-center justify-between">
            <h1 className="font-light text-xs md:text-base">Vị trí</h1>
            <div className="flex w-1/3 items-center">
              <div className="mr-3 h-1 w-full rounded bg-gray-300">
                <div
                  className="h-1 rounded bg-black"
                  style={{ width: "94%" }}
                />
              </div>
              <span className="text-xs font-medium">4.7</span>
            </div>
          </div>
          <div className="col-span-1 mt-2 md:mt-4 mr-2 md:mr-24 flex items-center justify-between">
            <h1 className="font-light text-xs md:text-base">Giá trị</h1>
            <div className="flex w-1/3 items-center">
              <div className="mr-3 h-1 w-full rounded bg-gray-300">
                <div
                  className="h-1 rounded bg-black"
                  style={{ width: "86%" }}
                />
              </div>
              <span className="text-xs font-medium">4.3</span>
            </div>
          </div>
        </div>

        <div className="my-8">
          <div className="grid grid-cols-2 gap-4 md:gap-0">
            {arrCommentRoomId.length > 0 ? renderComent() : <h1 className="text-2xl font-bold">Chưa có bình luận nào</h1>}
          </div>
        </div>
      </div>

      <hr />
      <iframe
        className="w-full mt-8"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48001.8608019714!2d106.62479642189494!3d10.821830566956796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zSOG7kyBDaMOtIE1pbmgsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1689668384446!5m2!1svi!2s"
        height={450}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      {/* <Map/> */}
    </div>
  );
}
