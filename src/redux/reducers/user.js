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
    const {_id, name, avatar, introduction, headline, company} = args
    const response = await userAPI.updateProfile(_id, name, avatar, introduction, headline, company)
    return response.data
  }
)

const initialState = {
  // Common filed
  user: {
    // required fields for a user
    _id: '',
    username: '',
    identity: '',
    avatar: -1,
  },
  // Recruiter-only field, only save (_id, title, level) fields for a job
  jobs: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: ((state, action) => {
      state.user = initialState.user;
      state.jobs = initialState.jobs;
    }),
    addJob: ((state, action) => {
      //console.log('add job payload', action.payload);
      state.jobs.push(action.payload.job);
    }),
    updateJob: ((state, action) => {
      //console.log('update job payload', action.payload);
      const updatedJobId = action.payload.job._id;
      state.jobs = state.jobs.map(value => (value._id === updatedJobId ? action.payload.job : value));
    }),
    deleteJob: ((state, action) => {
      //console.log('delete job payload', action.payload);
      const updatedJobId = action.payload.jobId;
      for (let i = 0; i < state.jobs.length; i++) {
        if (state.jobs.at(i)._id === updatedJobId) {
          state.jobs.splice(i, 1);
          break;
        }
      }
    })
  },
  extraReducers: (builder) => {
    // Handle loginAsync
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      // console.log('fulfilled', action.payload.data);
      if (action.payload.code === 0) {
        state.user = action.payload.data.user;
        state.jobs = action.payload.data.jobs;
      }
    });
    // Handle registerAsync
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      // console.log('fulfilled', action);
      if (action.payload.code === 0) {
        state.user = action.payload.data.user;
      }
    });
    builder.addCase(updateProfileAsync.fulfilled, (state, action) => {
      // console.log('fulfilled', action);
      if (action.payload.code === 0) {
        state.user = action.payload.data.user;
      }
    });
  },
})

// Action creators are generated for each case reducer function
export const {logout, addJob, updateJob, deleteJob} = userSlice.actions
export default userSlice.reducer
