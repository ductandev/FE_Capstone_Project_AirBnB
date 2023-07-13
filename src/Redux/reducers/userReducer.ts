import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserProfileFrm } from '../../Pages/Profile/Profile';
import { ToastOptions, toast } from 'react-toastify';
import { USER_LOGIN, clearStorage, getStoreJson, httpNonAuth, setStore, setStoreJson } from '../../Util/config';

const toastOptions: ToastOptions<{}> = {
  position: "top-center",
  autoClose: 400,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};
export interface userProfileApi {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  avatar: string;
  gender: boolean;
  role: string;
}

export interface userProfileState {
  isLoadingChangeProfile: boolean;
  closeInput: boolean;
}

const initialState = {
  isLoadingChangeProfile: false,
  closeInput: false
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeProfileAsyncAction.pending, (state) => {
        state.isLoadingChangeProfile = true;
        state.closeInput = false;
      })
      .addCase(changeProfileAsyncAction.fulfilled, (state) => {
        state.isLoadingChangeProfile = false;
        state.closeInput = true;
      })
      .addCase(changeProfileAsyncAction.rejected, (state) => {
        state.isLoadingChangeProfile = false;
        state.closeInput = false;
      })
  },

});

export const { } = userReducer.actions

export default userReducer.reducer

// =================Async Action===================
export const changeProfileAsyncAction = createAsyncThunk("changeProfileAsyncAction", async (changeUserProfiles: UserProfileFrm) => {
  try {
    const res = await httpNonAuth.put(`/api/users/${changeUserProfiles.id}`, changeUserProfiles);

    const userLoginData = getStoreJson(USER_LOGIN);
    // Kiểm tra nếu có dữ liệu trong key "userLogin"
    if (userLoginData) {
      // Gán dữ liệu mới vào thuộc tính "user"
      userLoginData.user = res.data.content
      // Lưu dữ liệu mới vào key "userLogin"
      setStoreJson(USER_LOGIN, userLoginData);
    }

    toast.success('Thay đổi thành công!', toastOptions);

  } catch (err) {
    toast.error('Thay đổi thất bại!', toastOptions);
    console.log("🚀 ~ file: userReducer.ts:81 ~ changeProfileAsyncAction ~ err:", err)
    // Đảm bảo lỗi được truyền đi
    throw (err)
  }
})

