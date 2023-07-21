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
  locationDetail: Location | null;
  isLoadingLocationAPI: boolean;
}

const initialState: LocationState = {
  arrLocation: [],
  locationDetail: null,
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
      })
      
      .addCase(getDataLocationIDAsyncAction.pending, (state) => {
        state.isLoadingLocationAPI = true;
      })
      .addCase(getDataLocationIDAsyncAction.fulfilled, (state, action) => {
        state.isLoadingLocationAPI = false;
        state.locationDetail = action.payload;
      })
      .addCase(getDataLocationIDAsyncAction.rejected, (state) => {
        state.isLoadingLocationAPI = false;
      });
  },
});

export const { } = locationReducer.actions;

export default locationReducer.reducer;

// ---------------- action async --------------
export const getDataLocationAsyncAction = createAsyncThunk(
  "location/getDataLocationAsyncAction",
  async ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
    try {
      const res = await httpNonAuth.get(
        `/api/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
      return res.data.content.data;
    } catch (err) {
      console.log("Error:", err);
      throw err;
    }
  }
);

export const getDataLocationIDAsyncAction = createAsyncThunk(
  "location/getDataLocationIDAsyncAction",
  async (id: string) => {
    try {
      const res = await httpNonAuth.get(`/api/vi-tri/${id}`);
      return res.data.content;
    } catch (err) {
      console.log("Error:", err);
      throw err;
    }
  }
);
