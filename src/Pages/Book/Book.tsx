import React, { useCallback, useEffect, useState } from "react";
import { NavLink, Navigate, useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../Redux/configStore";

import { AiFillStar } from "react-icons/ai";
import { BiMedal } from "react-icons/bi";
import Calendar from "../../Components/Calendar/Calendar";

import { getDataRoomIdAsyncAction } from "../../Redux/reducers/roomReducer";
import { BookRoomAsyncAction } from "../../Redux/reducers/bookRoomReducer";

type Props = {};

export default function Book({ }: Props) {
  const { roomDetail } = useSelector((state: RootState) => state.roomReducer);
  const { userProfile } = useSelector((state: RootState) => state.userReducer);
  const { bookTripsInfo } = useSelector((state: RootState) => state.bookRoomReducer);

  const [startDate, setStartDate] = useState(new Date(bookTripsInfo ? bookTripsInfo?.ngayDen : ''));
  const [endDate, setEndDate] = useState(new Date(bookTripsInfo ? bookTripsInfo?.ngayDi : ''));
  const [length, setLength] = useState(bookTripsInfo?.soDem);
  const [showCalendar, setShowCalendar] = useState(false);
  const [guestNumber, setShowGuestNumber] = useState(false);

  const [numTotalGuest, setnumTotalGuest] = useState(bookTripsInfo? bookTripsInfo.soLuongKhach : 0);
  const [numAdults, setNumAdults] = useState(numTotalGuest);
  const [numChildren, setNumChildren] = useState(0);
  const [numInfants, setNumInfants] = useState(0);
  const [numPets, setNumPets] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const dispatch: DispatchType = useDispatch();
  const param = useParams();
  const navigate = useNavigate();

  const tongTien =
    roomDetail?.giaTien !== undefined ? roomDetail.giaTien * (length? length: 0) : 0;

  // Callback function to update the selectedDate state with the props from the Calendar component
  const handleDateRangeChange = (
    startDate: Date,
    endDate: Date,
    length: number
  ) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setLength(length);
  };

  const handleConfirmAndPay = async () => {
    if (roomDetail && userProfile && startDate && endDate) {
      setIsSubmitting(true);
      try {
        const action = await BookRoomAsyncAction({
          id: 0,
          maPhong: roomDetail.id,
          ngayDen: startDate,
          ngayDi: endDate,
          soLuongKhach: numTotalGuest,
          maNguoiDung: userProfile.id,
        });
        dispatch(action);
        setIsSubmitSuccess(true);
      } catch (error) {
        setIsSubmitSuccess(false);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCalendarButtonClick = useCallback(() => {
    setShowCalendar((value) => !value);
  }, [setShowCalendar]);

  const handleGuestrButtonClick = useCallback(() => {
    setShowGuestNumber((value) => !value);
  }, [setShowGuestNumber]);

  const updateGuestCount = useCallback(() => {
    setnumTotalGuest(numAdults + numChildren + numInfants + numPets);
  }, [numAdults, numChildren, numInfants, numPets]);

  const getRoomDetailAPI = () => {
    const id: string | undefined = param.id;
    const action = getDataRoomIdAsyncAction(id as string);
    dispatch(action);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn về đầu trang khi component được render
    getRoomDetailAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param.id]);

  useEffect(() => {
    updateGuestCount();
  }, [updateGuestCount]);

  useEffect(() => {
    if (isSubmitSuccess) {
      navigate('/'); // Chuyển hướng về trang home khi dữ liệu gửi thành công
    }
  }, [isSubmitSuccess, navigate]);

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
                  {startDate ? startDate.toLocaleDateString() : "No start date available."} đến{" "}
                  {endDate ? endDate.toLocaleDateString() : "No start date available."}
                </p>
              </div>

              <button
                type="button"
                className="h-12 text-base leading-[18px] underline shadow-none"
                onClick={handleCalendarButtonClick}
              >
                Chỉnh sửa
              </button>
            </div>
            {showCalendar && (
              <div className="w-full border rounded-xl border-neutral-200 overflow-hidden">
                <Calendar onDateRangeChange={handleDateRangeChange} />
              </div>
            )}

            <div className="mt-6 flex justify-between">
              <div>
                <p className="font-medium">Số lượng khách</p>
                <p className="mt-1 font-light text-gray-400 text-sm md:text-base">
                  {numTotalGuest} khách
                </p>
              </div>
              <button
                type="button"
                className="h-12 text-base leading-[18px] underline shadow-none"
                onClick={handleGuestrButtonClick}
              >
                Chỉnh sửa
              </button>
            </div>
            {guestNumber && (
              <div className="w-full border rounded-xl border-neutral-200 overflow-hidden py-2 px-8">
                <div className="flex flex-row items-center justify-between pt-2">
                  <div className="text-xs md:text-sm">
                    <h1 className="font-bold">Người lớn</h1>
                    <p className="text-gray-400">Từ 13 tuổi trở lên</p>
                  </div>
                  <div className="flex flex-row">
                    <button className="text-white rounded-md bg-rose-500 hover:text-black px-4 py-2"
                            onClick={() => {
                              if (numAdults >= 1) {
                                setNumAdults(numAdults - 1)
                                setnumTotalGuest(numAdults - 1)
                              }
                            }}
                    >-</button>
                    <input className="w-12 text-center border mx-2" type="text" readOnly value={numAdults} />
                    <button className="text-white rounded-md bg-rose-500 hover:text-black px-4 py-2"
                            onClick={() => {
                              if (numAdults >= 0) {
                                setNumAdults(numAdults + 1)
                                setnumTotalGuest(numAdults + 1)
                              }
                            }}
                    >+</button>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between pt-2">
                  <div className="text-xs md:text-sm">
                    <h1 className="font-bold">Trẻ em</h1>
                    <p className="text-gray-400">Độ tuổi 2 - 12</p>
                  </div>
                  <div className="flex flex-row">
                    <button className="text-white rounded-md bg-rose-500 hover:text-black px-4 py-2"
                            onClick={() => {
                              if (numChildren >= 1) {
                                setNumChildren(numChildren - 1)
                                setnumTotalGuest(numChildren - 1)
                              }
                            }}
                    >-</button>
                    <input className="w-12 text-center border mx-2" type="text" readOnly value={numChildren} />
                    <button className="text-white rounded-md bg-rose-500 hover:text-black px-4 py-2"
                            onClick={() => {
                              if (numChildren >= 0) {
                                setNumChildren(numChildren + 1)
                                setnumTotalGuest(numChildren + 1)
                              }
                            }}
                    >+</button>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between pt-2">
                  <div className="text-xs md:text-sm">
                    <h1 className="font-bold">Em bé</h1>
                    <p className="text-gray-400">Dưới 2 tuổi</p>
                  </div>
                  <div className="flex flex-row">
                    <button className="text-white rounded-md bg-rose-500 hover:text-black px-4 py-2"
                            onClick={() => {
                              if (numInfants >= 1) {
                                setNumInfants(numInfants - 1)
                                setnumTotalGuest(numInfants - 1)
                              }
                            }}
                    >-</button>
                    <input className="w-12 text-center border mx-2" type="text" readOnly value={numInfants} />
                    <button className="text-white rounded-md bg-rose-500 hover:text-black px-4 py-2"
                            onClick={() => {
                              if (numInfants >= 0) {
                                setNumInfants(numInfants + 1)
                                setnumTotalGuest(numInfants + 1)
                              }
                            }}
                    >+</button>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between pt-2">
                  <div className="text-xs md:text-sm">
                    <h1 className="font-bold">Thú cưng</h1>
                    <p className="text-gray-400">Dưới 2 tuổi</p>
                  </div>
                  <div className="flex flex-row">
                    <button className="text-white rounded-md bg-rose-500 hover:text-black px-4 py-2"
                            onClick={() => {
                              if (numPets >= 1) {
                                setNumPets(numPets - 1)
                                setnumTotalGuest(numPets - 1)
                              }
                            }}
                    >-</button>
                    <input className="w-12 text-center border mx-2" type="text" readOnly value={numPets} />
                    <button className="text-white rounded-md bg-rose-500 hover:text-black px-4 py-2"
                            onClick={() => {
                              if (numPets >= 0) {
                                setNumPets(numPets + 1)
                                setnumTotalGuest(numPets + 1)
                              }
                            }}
                    >+</button>
                  </div>
                </div>
              </div>
            )}
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
              disabled={isSubmitting}
              onClick={handleConfirmAndPay}
            >
              {isSubmitting ? "Đang xử lý..." : "Xác nhận và thanh toán • Airbnb"}
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
