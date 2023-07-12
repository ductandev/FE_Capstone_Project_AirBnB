import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpNonAuth } from "../../Util/config";

export interface Room {
  id: number;
  tenPhong: string;
  khach: number;
  phongNgu: number;
  giuong: number;
  phongTam: number;
  moTa: string;
  giaTien: number;
  mayGiat: boolean;
  banLa: boolean;
  tivi: boolean;
  dieuHoa: boolean;
  wifi: boolean;
  bep: boolean;
  doXe: boolean;
  hoBoi: boolean;
  banUi: boolean;
  maViTri: number;
  hinhAnh: string;
}

export interface RoomState {
  arrAllRoom: Room[];
  isLoadingRoomAPI: boolean;
}

const initialState = {
  arrAllRoom: [],
  isLoadingRoomAPI: false,
};

const roomReducer = createSlice({
  name: "roomReducer",
  initialState,
  reducers: {},
  // getAllRoomAction: (state:RoomState, action:PayloadAction<Room[]>) =>{
  //     state.arrAllRoom = action.payload
  extraReducers: (builder) => {
    builder
      .addCase(getDataAllRoomAsyncAction.pending, (state) => {
        state.isLoadingRoomAPI = true;
      })
      .addCase(getDataAllRoomAsyncAction.fulfilled, (state, action) => {
        state.isLoadingRoomAPI = false;
        state.arrAllRoom = action.payload;
      })
      .addCase(getDataAllRoomAsyncAction.rejected, (state) => {
        state.isLoadingRoomAPI = false;
      });
  },
});

export const {} = roomReducer.actions;

export default roomReducer.reducer;

// ---------------- action async --------------
export const getDataAllRoomAsyncAction = createAsyncThunk(
  "getDataAllRoomAsyncAction",
  async ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
    try {
      const res = await httpNonAuth.get(
        `/api/phong-thue/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );

      return res.data.content.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);
