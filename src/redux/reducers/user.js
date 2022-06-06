import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {userAPI} from "../../api/user";

export const loginAsync = createAsyncThunk(
  'user/login',
  async (args, thunkAPI) => {
    const {username, password} = args
    const response = await userAPI.login(username, password)
    return response.data
  }
)

export const registerAsync = createAsyncThunk(
  'user/register',
  async (args, thunkAPI) => {
    const {username, password, identity} = args
    const response = await userAPI.register(username, password, identity)
    return response.data
  }
)

const initialState = {
  _id: '',
  username: '',
  identity: '',
  loading: 'idle', // 'idle' | 'pending'
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // Handle loginAsync
    builder.addCase(loginAsync.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      // console.log('fulfilled', action);
      if (action.payload.code === 0) {
        state.username = action.payload.data.username;
        state.identity = action.payload.data.identity;
        state._id = action.payload.data._id;
      }
      state.loading = 'idle';
    });
    // Handle registerAsync
    builder.addCase(registerAsync.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      // console.log('fulfilled', action);
      if (action.payload.code === 0) {
        state.username = action.payload.data.username;
        state.identity = action.payload.data.identity;
        state._id = action.payload.data._id;
      }
      state.loading = 'idle';
    });
  },
})

// Action creators are generated for each case reducer function
export const { } = userSlice.actions
export default userSlice.reducer
