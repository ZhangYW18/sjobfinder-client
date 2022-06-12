import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./reducers/user"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// Configure redux-persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const rootReducer = combineReducers({
  userReducer: userReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer)

// The store now has redux-thunk added and the Redux DevTools Extension is turned on by default.
// Doc Reference: https://redux-toolkit.js.org/api/configureStore
const getStore = () => {
  let store = configureStore({
    reducer: persistedReducer,
    // Configure middleware according to https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  let persistor = persistStore(store);
  return { store, persistor }
}

export default getStore;
