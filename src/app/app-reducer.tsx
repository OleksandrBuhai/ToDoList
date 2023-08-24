//app-reducer.tsx

import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/authReducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils.";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,

}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR' :
            return {...state,error:action.error}


        default:
            return {...state}
    }
}






export const setStatus = (status:RequestStatusType) => ({type:'APP/SET-STATUS', status} as const)
export const setError = (error: null | string) => ({type:"APP/SET-ERROR",error} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type:'APP/SET-IS-INITIALIZED',isInitialized} as const)


export type  SetLoadingType = ReturnType<typeof setStatus>
export type SetErrorType = ReturnType<typeof setError>
export type SetInitializedType = ReturnType<typeof setIsInitializedAC>

type ActionsType = SetLoadingType | SetErrorType | SetInitializedType
