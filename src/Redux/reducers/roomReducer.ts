import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import { httpNonAuth } from '../../Util/config';
import axios from 'axios';

export interface Room {
    id:       number;
    tenPhong: string;
    khach:    number;
    phongNgu: number;
    giuong:   number;
    phongTam: number;
    moTa:     string;
    giaTien:  number;
    mayGiat:  boolean;
    banLa:    boolean;
    tivi:     boolean;
    dieuHoa:  boolean;
    wifi:     boolean;
    bep:      boolean;
    doXe:     boolean;
    hoBoi:    boolean;
    banUi:    boolean;
    maViTri:  number;
    hinhAnh:  string;
}

export interface RoomState{
    arrAllRoom: Room[]
}

const initialState = {
    arrAllRoom: []
}

const roomReducer = createSlice({
  name: 'roomReducer',
  initialState,
  reducers: {
    getAllRoomAction: (state:RoomState, action:PayloadAction<Room[]>) =>{
        state.arrAllRoom = action.payload
    }
  }
});

export const {getAllRoomAction} = roomReducer.actions

export default roomReducer.reducer

// ---------------- action async --------------
export const getDataAllRoomAPi = (pageIndex: number, pageSize: number) => {
    return async (dispatch: DispatchType) => {
        const res = await httpNonAuth.get(`/api/phong-thue/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}`);
 
        const action: PayloadAction<Room[]> = getAllRoomAction(res.data.content.data);
        dispatch(action);
    }
}