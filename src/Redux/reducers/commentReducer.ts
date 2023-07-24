import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http, httpNonAuth } from "../../Util/config";
import { ToastOptions, toast } from 'react-toastify';

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

export interface Comment {
  ngayBinhLuan: Date;
  noiDung: string;
  saoBinhLuan: number;
  tenNguoiBinhLuan: string;
  avatar: string;
}
export interface CommentUser {
  maPhong: number;
  maNguoiBinhLuan: number;
  ngayBinhLuan: string;
  noiDung: string;
  saoBinhLuan: number;
}

export interface CommentState {
  arrCommentRoomId: Comment[];
  isLoadingComment: boolean;
}

const initialState: CommentState = {
  arrCommentRoomId: [],
  isLoadingComment: false,
};

const commentReducer = createSlice({
  name: "commentReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataCommentRoomIdAsyncAction.pending, (state) => {
        state.isLoadingComment = true;
      })
      .addCase(getDataCommentRoomIdAsyncAction.fulfilled, (state, action) => {
        state.isLoadingComment = false;
        state.arrCommentRoomId = action.payload;
      })
      .addCase(getDataCommentRoomIdAsyncAction.rejected, (state) => {
        state.isLoadingComment = false;
      })

      .addCase(postCommentRoomAsyncAction.pending, (state) => {
        state.isLoadingComment = true;
      })
      .addCase(postCommentRoomAsyncAction.fulfilled, (state) => {
        state.isLoadingComment = false;
      })
      .addCase(postCommentRoomAsyncAction.rejected, (state) => {
        state.isLoadingComment = false;
      });
  },
});

export const { } = commentReducer.actions;

export default commentReducer.reducer;

//===============Async Action===================
export const getDataCommentRoomIdAsyncAction = createAsyncThunk(
  "getDataCommentRoomIdAsyncAction",
  async (idRoom: string) => {
    try {
      const res = await httpNonAuth.get(
        `/api/binh-luan/lay-binh-luan-theo-phong/${idRoom}`
      );

      return res.data.content;
    } catch (err) {
      console.log(
        "🚀 ~ file: commentReducer.ts:35 ~ getDataCommentRoomIdAsyncAction ~ err:",
        err
      );
      throw err;
    }
  }
);


export const postCommentRoomAsyncAction = createAsyncThunk(
  "postCommentRoomAsyncAction",
  async (content: CommentUser) => {
    try {
      const res = await http.post('/api/binh-luan', content);

      toast.success('Bình luận thành công!', toastOptions);
      return res.data.content;
    } catch (err) {
      toast.error('Bình luận thất bại!', toastOptions);
      console.log("🚀 ~ file: commentReducer.ts:81 ~ err:", err)
      throw err;
    }
  }
);
