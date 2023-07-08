import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { USER_LOGIN, getStoreJson, httpNonAuth, setStoreJson } from '../../Util/config';
import { UserLoginFrm } from '../../Components/Modals/LoginModal';

// import { toast } from 'react-hot-toast';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export interface UserLoginApi {
  email: string;
  password: string;
  accessToken: string;
}

export interface UserState {
  userLogin: UserLoginApi | undefined;
  isLoading: boolean;
  hideInputBtn: boolean;
  closeModal: boolean;
}

const initialState: UserState = {
  userLogin: getStoreJson(USER_LOGIN),
  isLoading: false,
  hideInputBtn: false,
  closeModal: false,
};



const authReducer = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {},
  /*
    Các trạng thái của 1 action api
    + pending: Khi api đang được thực hiện
    + fulfilled: khi kết quả api trả về thành công
    + rejected: Khi kết quả api trả về thất bại
 */
  extraReducers: (builder) => {
    builder
      .addCase(loginAsyncAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsyncAction.fulfilled, (state, action) => {
        state.userLogin = action.payload;
        state.isLoading = false;
        state.hideInputBtn = true;
        state.closeModal = true;
      })
      .addCase(loginAsyncAction.rejected, (state) => {
        state.isLoading = false;
        state.hideInputBtn = false;
        state.closeModal = false;
      })
  },
})

export const { } = authReducer.actions

export default authReducer.reducer


// =================Async Action===================
export const loginAsyncAction = createAsyncThunk("loginAsyncAction", async (userLogin: UserLoginFrm) => {
  try {
    const res = await httpNonAuth.post("/api/auth/signin", userLogin);
    console.log("🚀 ~ file: authReducer.ts:61 ~ loginAsyncAction ~ res:", res)

    setStoreJson(USER_LOGIN, res.data.content);

    toast.success('Đăng nhập thành công!', {
      position: "top-center",
      autoClose: 400,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    return res.data.content;

  } catch (err) {
    toast.error('Đăng nhập thất bại!', {
      position: "top-center",
      autoClose: 400,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    //đảm bảo lỗi được truyền đi
    throw err; 
  }
}
);