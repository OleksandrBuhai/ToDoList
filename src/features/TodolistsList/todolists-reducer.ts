import { todolistsAPI, TodolistType } from "../../api/todolists-api";
import { Dispatch } from "redux";
import {
  appActions,
  RequestStatusType,
} from "../../app/app-reducer";
import { handleServerNetworkError } from "../../utils/error-utils";
import { AppThunk } from "../../app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = [];



const slice = createSlice({
  name: 'todolists',
  initialState: [] as Array<TodolistDomainType>,
  reducers: {
    removeTodolist: (state, actions: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((todo) => todo.id === actions.payload.id)
      if (index !== -1) state.splice(index, 1)
    },
    addTodolist: (state, actions: PayloadAction<{ todolist: TodolistType }>) => {
      const newTodolist: TodolistDomainType = { ...actions.payload.todolist, filter: 'all', entityStatus: 'idle' }
      state.unshift(newTodolist)
    },
    changeTodolistTitle: (state, actions: PayloadAction<{ id: string, title: string }>) => {
      const todo = state.find((todo) => todo.id === actions.payload.id)
      if (todo) {
        todo.title = actions.payload.title
      }
    },
    changeTodolistEntityStatus: (state, actions:PayloadAction<{id: string, entityStatus: RequestStatusType}>)=>{
      const todolist = state.find((el=> el.id === actions.payload.id))
      if(todolist){
        todolist.entityStatus = actions.payload.entityStatus
      }
    },
    changeTodolistFilter: (state, action:PayloadAction<{id: string, filter: FilterValuesType}>)=> {
        const todolist = state.find((todo)=> todo.id === action.payload.id)
        if(todolist){
          todolist.filter = action.payload.filter
        }
    },
    setTodolists: (state, actions: PayloadAction<{ todolists: TodolistType[] }>) => {
      return actions.payload.todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
    }
  }
})

export const todolistAction = slice.actions

export const todolistsReducer = slice.reducer



// thunks
export const fetchTodolistsTC = (): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    todolistsAPI
      .getTodolists()
      .then((res) => {
        dispatch(todolistAction.setTodolists({todolists: res.data}));
        dispatch(appActions.setAppStatus({ status: 'succeeded' }))
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};
export const removeTodolistTC = (todolistId: string): AppThunk => {
  return (dispatch) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(todolistAction.changeTodolistEntityStatus({id:todolistId, entityStatus: "loading"}));
    todolistsAPI.deleteTodolist(todolistId).then((res) => {
      dispatch(todolistAction.removeTodolist({id: todolistId}));
      //скажем глобально приложению, что асинхронная операция завершена
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
    });
  };
};
export const addTodolistTC = (title: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }))
    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(todolistAction.addTodolist({todolist: res.data.data.item}));
      dispatch(appActions.setAppStatus({ status: 'succeeded' }))
    });
  };
};
export const changeTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(id, title).then((res) => {
      dispatch(todolistAction.changeTodolistTitle({id:id, title:title}));
    });
  };
};

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};


