import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { USER_LOGIN, getStoreJson, httpNonAuth, setStoreJson } from '../../Util/config';
import { UserLoginFrm } from '../../Components/Modals/LoginModal';

// import { toast } from 'react-hot-toast';
import { ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserRegisterFrm } from '../../Components/Modals/RegisterModal';

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


export interface UserLoginApi {
  id:       number;
  name:     string;
  email:    string;
  password: string;
  phone:    string;
  birthday: string;
  avatar:   string;
  gender:   boolean;
  role:     string;
  token: string;
}

export interface UserState {
  userLogin: UserLoginApi | undefined;
  isLoadingAuth: boolean;
  hideInputBtn: boolean;
  closeModal: boolean;
}

const initialState: UserState = {
  userLogin: getStoreJson(USER_LOGIN),
  isLoadingAuth: false,
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
        state.isLoadingAuth = true;
        state.closeModal = false;
      })
      .addCase(loginAsyncAction.fulfilled, (state, action) => {
        state.userLogin = action.payload;
        state.isLoadingAuth = false;
        state.hideInputBtn = true;
        state.closeModal = true;
      })
      .addCase(loginAsyncAction.rejected, (state) => {
        state.isLoadingAuth = false;
        state.hideInputBtn = false;
        state.closeModal = false;
      })


      .addCase(registerAsyncAction.pending, (state) => {
        state.isLoadingAuth = true;
        state.closeModal = false;
      })
      .addCase(registerAsyncAction.fulfilled, (state) => {
        state.isLoadingAuth = false;
        state.closeModal = true;
      })
      .addCase(registerAsyncAction.rejected, (state) => {
        state.isLoadingAuth = false;
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

    // Lưu vào localStorage
    setStoreJson(USER_LOGIN, res.data.content);
    toast.success('Đăng nhập thành công!', toastOptions);

    return res.data.content.user;

  } catch (err) {
    toast.error('Đăng nhập thất bại!', toastOptions);
    console.log("🚀 ~ file: authReducer.ts:112 ~ loginAsyncAction ~ err:", err)
    //đảm bảo lỗi được truyền đi
    throw err;
  }
}
);


export const registerAsyncAction = createAsyncThunk("registerAsyncAction", async (userRegister: UserRegisterFrm) => {
  try{
    const res = await httpNonAuth.post("/api/auth/signup", userRegister);
    toast.success('Đăng ký thành công!', toastOptions);

    return res.data.content;

  } catch (err){
    toast.error('Đăng ký thất bại!', toastOptions);
    console.log("🚀 ~ file: authReducer.ts:128 ~ registerAsyncAction ~ err:", err)
    //đảm bảo lỗi được truyền đi
    throw err; 
  }
})
