import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../Redux/configStore";

import { Room, getDataAllRoomAPi } from "../../Redux/reducers/roomReducer";
import {
  Location,
  getDataLocation,
} from "../../Redux/reducers/locationReducer";

import ListingCard from "../../Components/ListingCard/ListingCard";
import Categories from "../../Components/Categories/Categories";

//Owl Carousel Libraries and Module
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

type Props = {};

export default function Home({}: Props) {
  //Owl Carousel Settings
  const options = {
    margin: 30,
    responsiveClass: true,
    nav: true,
    autoplay: true,
    smartSpeed: 500,
    loop: true,
    responsive: {
      0: {
        items: 4,
      },
      400: {
        items: 5,
      },
      600: {
        items: 6,
      },
      768: {
        items: 8,
      },
      950: {
        items: 9,
      },
      1024: {
        items: 12,
      },
      1280: {
        items: 14,
      },
    },
  };

  const { arrAllRoom } = useSelector((state: RootState) => state.roomReducer);
  const { arrLocation } = useSelector(
    (state: RootState) => state.locationReducer
  );
  const dispatch: DispatchType = useDispatch();

  // ====CALL API====
  const getDataListingRoom = async (pageIndex:number, pageSize:number):Promise<void> => {
    const actionApi = getDataAllRoomAPi(pageIndex, pageSize);
    dispatch(actionApi);
  };

  const getDataListingLocation = async (pageIndex:number, pageSize:number):Promise<void> => {
    const actionApi = getDataLocation(pageIndex, pageSize);
    dispatch(actionApi);
  };

  useEffect(() => {
    getDataListingLocation(1, 15);
    getDataListingRoom(1, 20);
  }, []);

  const renderAllRoom = (): JSX.Element[] => {
    return arrAllRoom.map((item: Room, index) => {
      return (
        <div key={item.id}>
          <ListingCard room={item} />
        </div>
      );
    });
  };

  return (
    <div className=" pt-20 bg-white">
      <div className="container mx-auto">
        <Categories />

        <h1 className="font-bold text-lg xl:text-xl mt-4">
          Explore nearby places
        </h1>

        {arrLocation?.length > 0 && (
          <>
            <OwlCarousel className="slider-items owl-carousel overflow-hidden" {...options}>
              {arrLocation.map((item: Location, index) => (
                <div className="mt-6 text-center" key={item.id}>
                  <img
                    className="
                  rounded-full
                  h-[50px]
                  !w-[50px]
                  mx-auto"
                    src={item.hinhAnh}
                    alt=""
                  />
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs">
                    {item.tenViTri}
                  </p>
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs">
                    {item.tinhThanh}
                  </p>
                </div>
              ))}
            </OwlCarousel>
          </>
        )}

        <h1 className="font-bold text-lg xl:text-xl mt-4">Stay anywhere</h1>
        <div className="pt-4 grid sm:grid-col-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {renderAllRoom()}
        </div>
      </div>
    </div>
  );
}
