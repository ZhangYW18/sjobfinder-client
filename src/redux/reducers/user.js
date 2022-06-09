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

export const updateProfileAsync = createAsyncThunk(
  'user/profile',
  async (args, thunkAPI) => {
    const {_id, name, avatar, introduction, preference, company} = args
    const response = await userAPI.updateProfile(_id, name, avatar, introduction, preference, company)
    return response.data
  }
)

const initialState = {
  // required fields for a user
  _id: '',
  username: '',
  identity: '',
  // optional fields for a user
  name: '',
  avatar: -1,
  introduction: '',
  preference: '',
  company: '',
  jobs: [],

  loading: false, // 'idle' | 'pending'
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle loginAsync
    builder.addCase(loginAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      // console.log('fulfilled', action);
      if (action.payload.code === 0) {
        state = action.payload.data;
      }
      state.loading = false;
    });
    // Handle registerAsync
    builder.addCase(registerAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      // console.log('fulfilled', action);
      if (action.payload.code === 0) {
        state = action.payload.data;
      }
      state.loading = false;
    });
    // Handle updateProfileAsync
    builder.addCase(updateProfileAsync.pending, (state, action) => {
      //state.loading = true;
    });
    builder.addCase(updateProfileAsync.fulfilled, (state, action) => {
      // console.log('fulfilled', action);
      if (action.payload.code === 0) {
        state = action.payload.data;
      }
      //state.loading = false;
    });
  },
})

// Action creators are generated for each case reducer function
export const { } = userSlice.actions
export default userSlice.reducer
