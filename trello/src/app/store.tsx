import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login";
import userinformation from "../features/userInformation";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistUser = {
  key: "user",
  version: 1,
  storage,
};

const persistLogin = {
  key: "login",
  version: 1,
  storage,
};

const persistedReducer_User = persistReducer(persistUser, userinformation);
const persistedReducer_Login = persistReducer(persistLogin, loginReducer);


export const store = configureStore({
  reducer: { 
    userInformation:persistedReducer_User,
    login:persistedReducer_Login,
   },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

//state 타입을 export 
export type RootState = ReturnType<typeof store.getState>;
