import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../Redux/configStore";
import { USER_LOGIN, getStoreJson } from "../../Util/config";
import { getBookRoomUserIDAsyncAction } from "../../Redux/reducers/bookRoomReducer";
import {
  Room,
  getDataAllRoomAsyncAction,
} from "../../Redux/reducers/roomReducer";
import { BsFillStarFill, BsStarHalf } from "react-icons/bs";

type Props = {};

export default function TripHistory({ }: Props) {
  const storedUserLogin = getStoreJson(USER_LOGIN);
  const { arrTripHistory } = useSelector(
    (state: RootState) => state.bookRoomReducer
  );
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
    getDataTripHistoryAPI();
    getDataAllRoomAPI();
  }, []);

  const filteredObjectsArrAllRoom = (arrAllRoom as any[]).filter((itemB) =>
    (arrTripHistory as any[]).some((itemA) => itemA.maPhong === itemB.id)
  );

  const renderListingTripsHistory = (): JSX.Element[] => {
    return filteredObjectsArrAllRoom.map((item: Room, index) => {
      return (
        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4" key={index}>

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
              <p className="text-grey-500">{item.khach} khách - Phòng ngủ: {item.phongNgu} - Phòng tắm: {item.phongTam}</p>
              <p className="text-grey-500">
                Wifi - Bếp - Điều hòa nhiệt độ - Máy giặt
              </p>
              <div className="flex flex-row text-rose-500 pt-1">
                <span className="pe-1"><BsFillStarFill /></span>
                <span className="pe-1"><BsFillStarFill /></span>
                <span className="pe-1"><BsFillStarFill /></span>
                <span className="pe-1"><BsFillStarFill /></span>
                <span className="pe-1"><BsStarHalf /></span>
              </div>
              <p className="font-bold mt-4">
                ${item.giaTien}
                <span className="font-normal"> / Đêm</span>
              </p>
            </div>
          </div>
          <hr className="w-full md:w-[75%]"/>

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
      <h1 className="pt-9 pb-6 text-4xl font-semibold">Lịch sử chuyến đi</h1>
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
