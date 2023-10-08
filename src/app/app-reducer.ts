import { Dispatch } from "redux";
import { authAPI } from "../api/todolists-api";
import { authAction } from "../features/Login/auth-reducer";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type InitialStateType = {
  // происходит ли сейчас взаимодействие с сервером
  status: RequestStatusType;
  // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
  error: string | null;
  // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
  isInitialized: boolean;
};

const slice = createSlice({
  name:'app',
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppStatus:(state,actions:PayloadAction<{status:RequestStatusType}>)=>{
     state.status = actions.payload.status
    },
    setAppError:(state,actions:PayloadAction<{error: string | null}>)=>{
        state.error = actions.payload.error
    },
    setAppInitialized: (state,actions:PayloadAction<{isInitialized:boolean}>)=>{
      state.isInitialized = actions.payload.isInitialized
    }
  }
})

export const appActions = slice.actions
export const appReducer = slice.reducer


export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(authAction.setIsLoggedIn({isLoggedIn:true}))
    } else {
    }

    dispatch(appActions.setAppInitialized({isInitialized:true}));
  });
};
