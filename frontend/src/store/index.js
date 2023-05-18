import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";

// 리듀서 목록
const reducers = combineReducers({
  user: userSlice.reducer,
});

const persistConfig = {
  key: "root",
  // sessionStorage에 저장합니다.
  storage: sessionStorage,
  // reducer 중에 userReducer만 sessionStorage 에 저장합니다.
  whitelist: ["user"],
  // blacklist -> 그것만 제외합니다
};

const persistedReducer = persistReducer(
  persistConfig,
  reducers
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});
