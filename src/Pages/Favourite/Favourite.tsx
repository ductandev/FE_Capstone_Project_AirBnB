import React, { useEffect, useState } from "react";
import { Room } from "../../Redux/reducers/roomReducer";
import { getStoreJson } from "../../Util/config";
import ListingCard from "../../Components/ListingCard/ListingCard";

type Props = {};

export default function Favourite({}: Props) {
  const [favouriteRooms, setFavouriteRooms] = useState<Room[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn về đầu trang khi component được render
    const storedFavouriteRooms: Room[] | null = getStoreJson('favourite');
    if (Array.isArray(storedFavouriteRooms)) {
      setFavouriteRooms(storedFavouriteRooms);
    }
  }, []);

  const renderAllRoom = (): JSX.Element[] => {
    return favouriteRooms.map((item: Room, index) => {
      return (
        <div key={item.id}>
          <ListingCard room={item} />
        </div>
      );
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="pt-9 pb-6 text-4xl font-bold text-[#484848]">Yêu thích</h1>
      {favouriteRooms.length === 0 ? (
        <>
          <h3 className="text-xl font-bold mt-4">Tạo danh sách Yêu thích đầu tiên</h3>
          <p className="mt-4 text-[#717171]">
            Trong quá trình tìm kiếm, hãy nhấp vào biểu tượng hình trái tim để lưu các chỗ <br />
            ở và Trải nghiệm bạn thích vào Danh sách yêu thích.
          </p>
        </>
      ) : (
        <div className="pt-4 grid sm:grid-col-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {renderAllRoom()}
        </div>
      )}
    </div>
  );
}
