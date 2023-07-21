import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpNonAuth } from "../../Util/config";

export interface BookRoom {
    id:           number;
    maPhong:      number;
    ngayDen:      Date;
    ngayDi:       Date;
    soLuongKhach: number;
    maNguoiDung:  number;
}

export interface BookRoomState {
    arrTripHistory: BookRoom[],
    isLoadingTripHistory: boolean;
}


const initialState:BookRoomState = {
    arrTripHistory: [],
    isLoadingTripHistory: false,
};

const bookRoomReducer = createSlice({
  name: "bookRoomReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getBookRoomUserIDAsyncAction.pending, (state) => {
        state.isLoadingTripHistory = true
    })
    .addCase(getBookRoomUserIDAsyncAction.fulfilled, (state, action) => {
        state.isLoadingTripHistory = false
        state.arrTripHistory = action.payload;
    })
    .addCase(getBookRoomUserIDAsyncAction.rejected, (state)=>{
        state.isLoadingTripHistory = false
    })
  }
});

export const {} = bookRoomReducer.actions;

export default bookRoomReducer.reducer;

//==================Async Action======================
export const getBookRoomUserIDAsyncAction = createAsyncThunk(
  "getBookRoomUserIDAsyncAction",
  async (userID: number) => {
    try {
        const res = await httpNonAuth.get(`/api/dat-phong/lay-theo-nguoi-dung/${userID}`)

        console.log("🚀 ~ file: bookRoomReducer.ts:55 ~ res:", res)
        return res.data.content;
    } catch (err) {
        console.log("🚀 ~ file: bookRoomReducer.ts:26 ~ err:", err)
      throw err;
    }
  }
);
