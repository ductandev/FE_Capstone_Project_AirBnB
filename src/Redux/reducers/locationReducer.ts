import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import { httpNonAuth } from '../../Util/config';

export interface Location{
  id:        number;
  tenViTri:  string;
  tinhThanh: string;
  quocGia:   string;
  hinhAnh:   string;
}

export interface LocationState{
  arrLocation: Location[]
}

const initialState = {
  arrLocation: []
}

const locationReducer = createSlice({
  name: 'locationReducer',
  initialState,
  reducers: {
    getLocationAction: (state:LocationState, action:PayloadAction<Location[]>) => {
      state.arrLocation = action.payload
    }
  }
});

export const {getLocationAction} = locationReducer.actions

export default locationReducer.reducer

// ---------------- action async --------------
export const getDataLocation = (pageIndex: number, pageSize: number) => {
  return async (dispatch: DispatchType) => {
      const res = await httpNonAuth.get(`/api/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`);

      const action: PayloadAction<Location[]> = getLocationAction(res.data.content.data);
      dispatch(action);
  }
}