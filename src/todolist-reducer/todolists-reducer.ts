import { FilterType } from "../App";
import { v1 } from "uuid";

const RemoveTodolistAT = "REMOVE-TODOLIST" as const
const AddTodoListAT = 'ADD-TODOLIST' as const
const ChangeTodoListTitleAT = 'CHANGE-TODOLIST-TITLE' as const
const ChangeTodoListFilterAT = 'CHANGE-TODOLIST-FILTER' as const

type RemoveTodoListAT = {
    type: typeof RemoveTodolistAT
    payload:{
    todolistId: string}
}
type AddTodoListAT = {
    type: typeof AddTodoListAT
    payload:{
    title: string
    todolistId: string}
}
type ChangeTodoListTitleAT = {
    type: typeof ChangeTodoListTitleAT
    payload:{
    id: string
    title: string}
}
type ChangeTodoListFilterAT = {
    type: typeof ChangeTodoListFilterAT
    payload:{
    id: string
    filter: FilterType}
}
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterType
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodoListType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (state: TodoListType[]=initialState, action: ActionType):TodoListType[] => {
    switch (action.type) {
        case RemoveTodolistAT:
            return state.filter(t => t.id != action.payload.todolistId) 
        case AddTodoListAT:
            return ([
                ...state,
                {id: action.payload.todolistId, title: action.payload.title, filter: 'all' }
                ]) 
        case ChangeTodoListTitleAT:
            return state.map(t => t.id === action.payload.id ? { ...t, title: action.payload.title } : t)
        case ChangeTodoListFilterAT:
            return state.map(t => t.id === action.payload.id ? { ...t, filter: action.payload.filter } : t)
        default:
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodoListAT => { return { type: RemoveTodolistAT, payload:{todolistId} }}
export const AddTodoListAC = (title: string): AddTodoListAT => {
    return { type: AddTodoListAT, payload: { title, todolistId: v1() } };
}
export const ChangeTodolistAC = (id: string, title: string):ChangeTodoListTitleAT => {return { type: ChangeTodoListTitleAT, payload:{ id, title }}}
export const ChangeTodolistFilterAC = (id: string, filter: FilterType):ChangeTodoListFilterAT => {return { type: ChangeTodoListFilterAT, payload:{id, filter} }}