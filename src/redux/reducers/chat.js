import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {chatAPI} from "../../api/chat";
import {getChatId} from "../../utils/chat";
import Cookies from "js-cookie";

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
  // Used by chats page.
  chats: [],
  unread_sum: 0,
  /*
     msgs saves every message in conversations.
     Init with a pair of meaningless keys and values to define it as a map.
     Used by chat-detail pages.
   */
  msgs: {
    'partnerId': [],
  },
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const msg = action.payload.data;
      const userId = Cookies.get('userid');
      if (msg.from._id !== userId && msg.to._id !== userId) return;
      // Push current message to corresponding conversation
      let partnerId;
      if (msg.from._id === userId) partnerId = msg.to._id; else partnerId = msg.from._id;
      console.log(state)
      if (state.chats.find(chat => chat._id === getChatId(userId, partnerId)) === undefined) {
        state.msgs[partnerId] = [];
        state.chats.push({
          _id: getChatId(msg.from._id, msg.to._id),
          partner: msg.from._id === userId ? msg.to : msg.from,
          lastMessage: {
            content: '',
            date: undefined,
          },
          count_unread: 0,
        });
      }
      console.log('here')
      state.msgs[partnerId].push({
        _id: msg._id,
        content: msg.content,
        create_time: msg.create_time,
        from: msg.from._id,
      });
      // Update overall chats
      if (msg.to._id === userId) state.unread_sum++;
      for (let i = 0; i < state.chats.length; i++) {
        if (state.chats[i]._id === msg.chat_id) {
          if (msg.to._id === userId) state.chats[i].count_unread++;
          state.chats[i].lastMessage.content = msg.content;
          state.chats[i].lastMessage.date = msg.create_time;
          [state.chats[i], state.chats[0]] = [state.chats[0], state.chats[i]]
          break;
        }
      }
    },
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
      if (action.payload.code !== 0) return;
      state.chats = action.payload.data;
      let unread_sum = 0;
      action.payload.data.forEach(chat => unread_sum += chat.count_unread);
      state.unread_sum = unread_sum;
    });
    builder.addCase(getChatMessagesAsync.fulfilled, (state, action) => {
      // Get partnerId from args sent when dispatching the action
      if (action.payload.code !== 0) return;
      const {partnerId} = action.meta.arg;
      state.msgs[partnerId] =  action.payload.data
    });
  },
})

// Action creators are generated for each case reducer function
export const {logout, setMessagesInConversationAllRead, addMessage} = chatSlice.actions
export default chatSlice.reducer
