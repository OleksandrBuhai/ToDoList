import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { TaskType } from "../ToDoList";

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
    payload: {
        title: string
        todolistId: string
    }
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
    payload: {
        title: string
        todolistId: string
    }
}
type RemoveTodoListAC = {
    type: typeof RemoveTodolistAT
    todolistId: string
}

export type ActionType = RemoveTasktAT | addTaskAC | changeTaskStatusAC | ChangeTaskTitleAC | AddToDoListAC | RemoveTodoListAC

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TasksStateType = {
    [todolistID1]: [
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },

    ],
    [todolistID2]: [
        { id: v1(), title: 'Rest API', isDone: true },
        { id: v1(), title: 'GraphQL', isDone: false },
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return { ...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId) }
        case "ADD-TASK":
            let newTask: TaskType = { id: v1(), title: action.payload.title, isDone: false }
            return {
                ...state,
                [action.payload.todolistId]: [
                    newTask, ...state[action.payload.todolistId] || []
                ]
            };
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ?
                    {
                        ...t,
                        isDone: action.taskStatus
                    } : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.taskTitle
                } : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.payload.todolistId]: []
            };
        case 'REMOVE=TODOLIST':
            const { [action.todolistId]: _, ...newState } = state
            return newState
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTasktAT => ({ type: RemoveTasktAT, taskId, todolistId })
export const addTaskAC = (title: string, todolistId: string): addTaskAC => ({ type: addTaskAT, payload: { title, todolistId } })
export const changeTaskStatusAC = (taskId: string, taskStatus: boolean, todolistId: string) => {
    return { type: ChangeTaskStatusAT, taskId, taskStatus, todolistId }
}
export const ChangeTaskTitleAC = (taskId: string, taskTitle: string, todolistId: string): ChangeTaskTitleAC => ({ type: ChangeTaskTitleAT, taskId, taskTitle, todolistId })
export const AddToDoListAC = (title: string): AddToDoListAC => {

    return { type: AddTodoListAT, payload: { title, todolistId: v1() } };
}
export const RemoveTodoListAC = (todolistId: string): RemoveTodoListAC => ({
    type: RemoveTodolistAT, todolistId
})