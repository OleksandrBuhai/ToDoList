import { FilterType, TasksStateType, TodoListType } from "../App";
import { v1 } from "uuid";
import { TaskType } from "../ToDoList";
import { type } from "os";

const RemoveTasktAT = "REMOVE-TASK" as const
const addTaskAT = 'ADD-TASK' as const
const ChangeTaskTitleAT = 'CHANGE-TASK-TITLE' as const
const ChangeTaskStatusAT = 'CHANGE-TASK-STATUS' as const
const AddTodoListAT = 'ADD-TODOLIST' as const
const RemoveTodolistAT = 'REMOVE=TODOLIST' as const

type RemoveTasktAT = {
    type: typeof RemoveTasktAT
    taskId: string
    todolistId: string
}
type addTaskAC = {
    type: typeof addTaskAT
    title: string
    todolistId: string
}
type changeTaskStatusAC = {
    type: typeof ChangeTaskStatusAT
    taskId: string
    taskStatus: boolean
    todolistId: string
}
type ChangeTaskTitleAC = {
    type: typeof ChangeTaskTitleAT
    taskId: string
    taskTitle: string
    todolistId: string
}
type AddToDoListAC = {
    type: typeof AddTodoListAT
    title: string
    todolistId: string
}
type RemoveTodoListAC = {
    type: typeof RemoveTodolistAT
    todolistId: string
}

export type ActionType = RemoveTasktAT | addTaskAC | changeTaskStatusAC | ChangeTaskTitleAC | AddToDoListAC | RemoveTodoListAC

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return { ...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId) }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [
                    { id: v1(), title: action.title, isDone: false },
                    ...state[action.todolistId]
                ]
            };
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.todolistId]: state[action.todolistId].filter(t => t.id === action.taskId ?
                    t.isDone = action.taskStatus : { ...t })
            }
        case 'CHANGE-TASK-TITLE':
            return { ...state, [action.todolistId]: state[action.todolistId].filter(t => t.id === action.taskId ? t.title = action.taskTitle : { ...t }) }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            };
        case 'REMOVE=TODOLIST':
            const { [action.todolistId]: _, ...newState } = state
            return newState
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTasktAT => ({ type: RemoveTasktAT, taskId, todolistId })
export const addTaskAC = (title: string, todolistId: string): addTaskAC => ({ type: addTaskAT, title, todolistId })
export const changeTaskStatusAC = (taskId: string, taskStatus: boolean, todolistId: string) => ({ type: ChangeTaskStatusAT, taskId, taskStatus, todolistId })
export const ChangeTaskTitleAC = (taskId: string, taskTitle: string, todolistId: string): ChangeTaskTitleAC => ({ type: ChangeTaskTitleAT, taskId, taskTitle, todolistId })
export const AddToDoListAC = (title: string): AddToDoListAC => {
    const todolistId = v1()
    return { type: AddTodoListAT, title, todolistId }
}
export const RemoveTodoListAC = (todolistId: string): RemoveTodoListAC => ({
    type: RemoveTodolistAT, todolistId
})