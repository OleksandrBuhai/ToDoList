import { Dispatch } from 'redux'
import {SetErrorType, setStatus, SetLoadingType, setIsInitializedAC, SetInitializedType} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils.";

const initialState = {
    isLoggedIn: false,
    isInitialized:false

}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'APP/SET-IS-INITIALIZED' :
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatus('loading'))
    try {
        const  res = await  authAPI.login(data)
        if (res.data.resultCode === 0){
            dispatch(setIsLoggedInAC(true))
            dispatch(setStatus('succeeded'))
        }else {
            handleServerAppError(res.data, dispatch)
        }

    } catch (e) {
        handleServerNetworkError((e as {message:string}),dispatch)
    }

}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        dispatch(setIsInitializedAC(true))
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));

        } else {
        }
    })
}


export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatus('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setStatus('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}





// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>  | SetLoadingType | SetErrorType | SetInitializedType
