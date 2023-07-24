import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../Redux/configStore";
import { USER_LOGIN, getStoreJson } from "../../Util/config";
import { BookRoomHistory, getBookRoomUserIDAsyncAction } from "../../Redux/reducers/bookRoomReducer";
import {
  Room,
  getDataAllRoomAsyncAction,
} from "../../Redux/reducers/roomReducer";
import { BsFillStarFill, BsStarHalf } from "react-icons/bs";

type Props = {};

export default function TripHistory({ }: Props) {
  const storedUserLogin = getStoreJson(USER_LOGIN);
  const { arrTripHistory } = useSelector((state: RootState) => state.bookRoomReducer);
  const { arrAllRoom } = useSelector((state: RootState) => state.roomReducer);
  const dispatch: DispatchType = useDispatch();

  const getDataTripHistoryAPI = async () => {
    const actionApi = getBookRoomUserIDAsyncAction(storedUserLogin?.user.id);
    dispatch(actionApi);
  };

  const getDataAllRoomAPI = async () => {
    const actionApi = getDataAllRoomAsyncAction();
    dispatch(actionApi);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn về đầu trang khi component được render
    getDataTripHistoryAPI();
    getDataAllRoomAPI();
  }, []);


  const res = () => {
    let arrRes: BookRoomHistory[] = [];
    for (let itemA of arrTripHistory) {
      for (let itemB of arrAllRoom) {
        if (itemA.maPhong === itemB.id) {
          const bookRoomHistory: BookRoomHistory = {
            tenPhong: itemB.tenPhong,
            phongNgu: itemB.phongNgu,
            giuong: itemB.giuong,
            phongTam: itemB.phongTam,
            hinhAnh: itemB.hinhAnh,

            id: itemA.id,
            maPhong: itemA.maPhong,
            ngayDen: itemA.ngayDen,
            ngayDi: itemA.ngayDi,
            soLuongKhach: itemA.soLuongKhach,
            maNguoiDung: itemA.maNguoiDung,
          };
          arrRes.push(bookRoomHistory);
        }
      }
    }
    return arrRes;
  };


  const renderListingTripsHistory = (): JSX.Element[] => {
    return res().reverse().map((item: BookRoomHistory, index: number) => {

      // Convert ngayDen and ngayDi strings to Date objects
      const ngayDenDate = new Date(item.ngayDen);
      const ngayDiDate = new Date(item.ngayDi);

      return (
        <div className="mt-4" key={item.id}>
          <h1 className="font-semibold md:text-2xl mb-4">#{item.id}</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4" key={index}>

            <div className="col-span-1 rounded-2xl overflow-hidden">
              <img
                src={item.hinhAnh}
                className="lg:h-[211px] !w-[200%] !max-w-[200%]"
                alt="..."
              />
            </div>

            <div className="col-span-2">
              <h2
                className="                    
                    font-bold
                    mb-2 
                    text-xl
                    group-hover:text-rose-500
                    md:h-[48px]
                    overflow-hidden"
              >
                {item.tenPhong}
              </h2>
              <p className="text-grey-500">{item.soLuongKhach} khách - Phòng ngủ: {item.phongNgu} - Phòng tắm: {item.phongTam}</p>
              <p className="text-grey-500">
                Wifi - Bếp - Điều hòa nhiệt độ - Máy giặt
              </p>
              <div className="flex flex-row gap-8 mt-4">
                <div>
                  <p className="font-bold text-sm md:text-base">Check-in</p>
                  <p className="text-sm md:text-base">{ngayDenDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-bold text-sm md:text-base">Check-out</p>
                  <p className="text-sm md:text-base">{ngayDiDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-bold text-sm md:text-base">Số khách</p>
                  <p className="text-sm md:text-base">{item.soLuongKhach} khách</p>
                </div>
              </div>
              <div className="flex flex-row justify-between gap-8 mt-1">
              <button className="px-3 py-2 text-white bg-rose-500 hover:text-black rounded-md">Đánh giá</button>
              <div className="flex flex-row text-rose-500 mt-2">
                <span className="pe-1"><BsFillStarFill /></span>
                <span className="pe-1"><BsFillStarFill /></span>
                <span className="pe-1"><BsFillStarFill /></span>
                <span className="pe-1"><BsFillStarFill /></span>
                <span className="pe-1"><BsStarHalf /></span>
              </div>
              </div>
            </div>
          </div>
          <hr className="w-full md:w-[75%]" />

        </div>
      );
    });
  };

  const renderTripHistory = () => {
    if (Array.isArray(arrTripHistory) && arrTripHistory.length > 0) {
      return (
        <>
          <div className="ps-3 sm:ps-0">
            <h1 className="text-2xl font-bold text-gray-600 mb-4">Phòng đã thuê</h1>
            {renderListingTripsHistory()}
          </div>
        </>)
    } else {
      return (
        <>
          <h3 className="text-2xl font-semibold">
            Chưa có chuyến đi nào được đặt... vẫn chưa!
          </h3>
          <p className="mt-2 font-normal">
            Đã đến lúc phủi bụi hành lý và bắt đầu chuẩn bị cho chuyến phiêu lưu
            tiếp theo của bạn rồi
          </p>
          <button className="mt-4 hover:bg-[#F7F7F7] border border-black rounded-xl px-[23px] py-[13px] text-black font-bold">
            Bắt đầu tìm kiếm
          </button>
        </>
      );
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="pt-9 pb-6 text-4xl font-bold  text-[#484848]">Lịch sử chuyến đi</h1>
      <hr />

      <div className="pt-8 pb-12">{renderTripHistory()}</div>

      <hr />
      <p className="pb-9 pt-6 font-normal text-gray-500">
        Bạn không tìm thấy đặt phòng/đặt chỗ của mình ở đây?
        <span className="font-bold underline cursor-pointer text-black">
          {" "}
          Truy cập Trung tâm trợ giúp
        </span>
      </p>
    </div>
  );
}
