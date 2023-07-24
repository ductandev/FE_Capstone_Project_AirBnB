import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpNonAuth } from "../../Util/config";

import { ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOptions: ToastOptions<{}> = {
  position: "top-center",
  autoClose: 500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};
export interface BookRoom {
  id: number;
  maPhong: number;
  ngayDen: Date;
  ngayDi: Date;
  soLuongKhach: number;
  maNguoiDung: number;
}
export interface BookRoomInfo {
  maNguoiDung: number;
  maPhong: number;
  ngayDen: Date;
  ngayDi: Date;
  soLuongKhach: number;
  soDem: number;
  tongTien: number;
}

export interface BookRoomHistory {
  tenPhong: string;
  phongNgu: number;
  giuong: number;
  phongTam: number;
  hinhAnh: string;

  id: number;
  maPhong: number;
  ngayDen: Date;
  ngayDi: Date;
  soLuongKhach: number;
  maNguoiDung: number;
}


export interface BookRoomState {
  arrTripHistory: BookRoom[];
  isLoadingTripHistory: boolean;
  bookTripsInfo: BookRoomInfo | null;
}


const initialState: BookRoomState = {
  arrTripHistory: [],
  isLoadingTripHistory: false,
  bookTripsInfo: null,
};

const bookRoomReducer = createSlice({
  name: "bookRoomReducer",
  initialState,
  reducers: {
    setBookTripsInfo: (state, action) => {
      state.bookTripsInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookRoomUserIDAsyncAction.pending, (state) => {
        state.isLoadingTripHistory = true
      })
      .addCase(getBookRoomUserIDAsyncAction.fulfilled, (state, action) => {
        state.isLoadingTripHistory = false
        state.arrTripHistory = action.payload;
      })
      .addCase(getBookRoomUserIDAsyncAction.rejected, (state) => {
        state.isLoadingTripHistory = false
      })

      .addCase(BookRoomAsyncAction.pending, (state) => {
        state.isLoadingTripHistory = true
      })
      .addCase(BookRoomAsyncAction.fulfilled, (state) => {
        state.isLoadingTripHistory = false
      })
      .addCase(BookRoomAsyncAction.rejected, (state) => {
        state.isLoadingTripHistory = false
      })
  }
});

export const { setBookTripsInfo } = bookRoomReducer.actions;

export default bookRoomReducer.reducer;

//==================Async Action======================
export const getBookRoomUserIDAsyncAction = createAsyncThunk(
  "getBookRoomUserIDAsyncAction",
  async (userID: number) => {
    try {
      const res = await httpNonAuth.get(`/api/dat-phong/lay-theo-nguoi-dung/${userID}`)

      return res.data.content;
    } catch (err) {
      console.log("🚀 ~ file: bookRoomReducer.ts:69 ~ err:", err)
      throw err;
    }
  }
);

export const BookRoomAsyncAction = createAsyncThunk(
  "BookRoomAsyncAction",
  async (bookRoomInfo: BookRoom) => {
    try {
      const res = await httpNonAuth.post("/api/dat-phong", bookRoomInfo)
      console.log("🚀 ~ file: bookRoomReducer.ts:105 ~ res:", res)

      toast.success('Đăng ký chuyến đi thành công!', toastOptions);

      return res.data.content;
    } catch (err) {
      console.log("🚀 ~ file: bookRoomReducer.ts:110 ~ err:", err)
      toast.error('Đăng Ký chuyến đi thất bại!', toastOptions);
      throw err;
    }
  }
);
