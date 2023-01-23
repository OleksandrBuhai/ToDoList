import {FilterType, TodoListType} from "../App";
import {v1} from "uuid";

const RemoveTodolistAT = "REMOVE-TODOLIST" as const
const AddTodoListAT = 'ADD-TODOLIST' as const
const ChangeTodoListTitleAT = 'CHANGE-TODOLIST-TITLE' as const
const ChangeTodoListFilterAT = 'CHANGE-TODOLIST-FILTER' as const

type RemoveTodoListAT = {
    type: typeof RemoveTodolistAT
    id: string
}
type AddTodoListAT = {
    type: typeof AddTodoListAT
    title: string
}
type ChangeTodoListTitleAT = {
    type: typeof ChangeTodoListTitleAT
    id: string
    title: string
}
type ChangeTodoListFilterAT = {
    type: typeof ChangeTodoListFilterAT
    id: string
    filter: FilterType
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todolistsReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(t => t.id != action.id)
        case "ADD-TODOLIST":
            const newToDoList: TodoListType = {id: v1(), title: action.title, filter: 'all'}
            return ([...state, newToDoList])
        case "CHANGE-TODOLIST-TITLE":
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        default:
            return state
    }
}

export const RemoveTodolistAC = (id:string):RemoveTodoListAT => ({type:RemoveTodolistAT, id})
export const AddTodolistAC = (title:string):AddTodoListAT => ({type:AddTodoListAT, title})
export const ChangeTodolistAC = (id:string, title:string) => ({type:ChangeTodoListTitleAT, id, title})
export const ChangeTodolistFilterAC = (id:string, filter:FilterType)=>({type:ChangeTodoListFilterAT,id,filter})