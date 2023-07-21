import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpNonAuth } from "../../Util/config";

export interface Comment {
  ngayBinhLuan: Date;
  noiDung: string;
  saoBinhLuan: number;
  tenNguoiBinhLuan: string;
  avatar: string;
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
      });
  },
});

export const {} = commentReducer.actions;

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
