import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {chatAPI} from "../../api/chat";
import {getChatId} from "../../utils/chat";

export const getChatsAsync = createAsyncThunk(
  'chat/get',
  async (args, thunkAPI) => {
    const {userId} = args
    const response = await chatAPI.getChatsByUserId(userId)
    return response.data
  }
)

export const getChatMessagesAsync = createAsyncThunk(
  'chat/messages/from/to',
  async (args, thunkAPI) => {
    const {partnerId, userId} = args
    const response = await chatAPI.getChatDetails(userId, partnerId)
    return response.data
  }
)

const initialState = {
  // chats saves the infos of conversations, info of the two users & last message for each conversation.
  chats: [],
  unread_sum: 0,
  // msgs saves every message in conversations.
  // Init with a pair of meaningless keys and values to define it as a map.
  msgs: {
    'dsdsf': [],
  },
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.chats = initialState.chats;
      state.unread_sum = initialState.unread_sum;
      state.msgs = initialState.msgs;
    },
    setMessagesInConversationAllRead: (state, action) => {
      const chatId = getChatId(action.payload.from, action.payload.to);
      for (let i = 0; i < state.chats.length; i++) {
        if (state.chats[i]._id === chatId) {
          state.unread_sum -= state.chats[i].count_unread;
          state.chats[i].count_unread = 0;
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getChatsAsync.fulfilled, (state, action) => {
      // console.log('fulfilled', action.payload.data);
      if (action.payload.code === 0) {
        state.chats = action.payload.data;
        let unread_sum = 0;
        action.payload.data.forEach(chat => unread_sum += chat.count_unread);
        state.unread_sum = unread_sum;
      }
    });
    builder.addCase(getChatMessagesAsync.fulfilled, (state, action) => {
      // console.log('fulfilled', action);
      // Get partnerId from args sent when dispatching the action
      const {partnerId} = action.meta.arg;
      if (action.payload.code !== 0) return;
      state.msgs[partnerId] =  action.payload.data
    });
  },
})

// Action creators are generated for each case reducer function
export const {logout, setMessagesInConversationAllRead} = chatSlice.actions
export default chatSlice.reducer
