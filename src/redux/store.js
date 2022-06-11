import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./reducers/user"

// The store now has redux-thunk added and the Redux DevTools Extension is turned on by default.
// Doc Reference: https://redux-toolkit.js.org/api/configureStore
export default configureStore({
  reducer: {
    userReducer: userReducer,
  },
})
