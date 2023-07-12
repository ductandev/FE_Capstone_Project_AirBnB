import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpNonAuth } from "../../Util/config";

export interface Location {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
}

export interface LocationState {
  arrLocation: Location[];
  isLoadingLocationAPI: boolean;
}

const initialState = {
  arrLocation: [],
  isLoadingLocationAPI: false,
};

const locationReducer = createSlice({
  name: "locationReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataLocationAsyncAction.pending, (state) => {
        state.isLoadingLocationAPI = true;
      })
      .addCase(getDataLocationAsyncAction.fulfilled, (state, action) => {
        state.isLoadingLocationAPI = false;
        state.arrLocation = action.payload;
      })
      .addCase(getDataLocationAsyncAction.rejected, (state) => {
        state.isLoadingLocationAPI = false;
      });
  },
});

export const {} = locationReducer.actions;

export default locationReducer.reducer;

// ---------------- action async --------------
export const getDataLocationAsyncAction = createAsyncThunk(
  "getDataLocationAsyncAction",
  async ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
    try {
      const res = await httpNonAuth.get(
        `/api/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );

      return res.data.content.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);
