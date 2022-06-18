import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {chatAPI} from "../../api/chat";


export const getChatsAsync = createAsyncThunk(
  'chat/get',
  async (args, thunkAPI) => {
    const {userId} = args
    const response = await chatAPI.getChatsByUserId(userId)
    return response.data
  }
)

const initialState = {
  chats: [],
  unread_sum: 0,
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    logout: ((state, action) => {
      state.chats = initialState.chats;
      state.unread_sum = initialState.unread_sum;
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getChatsAsync.fulfilled, (state, action) => {
      console.log('fulfilled', action.payload.data);
      if (action.payload.code === 0) {
        state.chats = action.payload.data;
      }
    });
  },
})

// Action creators are generated for each case reducer function
export const {logout} = chatSlice.actions
export default chatSlice.reducer
