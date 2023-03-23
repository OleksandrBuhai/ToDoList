import { FilterType, TasksStateType, TodoListType } from "../App";
import { v1 } from "uuid";
import { TaskType } from "../ToDoList";

const RemoveTasktAT = "REMOVE-TASK" as const
const addTaskAT = 'ADD-TASK' as const
const ChangeTaskTitleAT = 'CHANGE-TASK-TITLE' as const
const ChangeTaskStatusAT = 'CHANGE-TASK-FILTER' as const

type RemoveTasktAT = {
    type: typeof RemoveTasktAT

        taskId: string
        todolistId: string
    
}
type addTaskAC = {
    type: typeof addTaskAT
    title: string
    todolistId:string
}
type ChangeTaskTitleAT = {
    type: typeof ChangeTaskTitleAT
    id: string
    title: string
}
type ChangeTaskStatusAT = {
    type: typeof ChangeTaskStatusAT
    id: string
}

export type ActionType = RemoveTasktAT | addTaskAC | ChangeTaskTitleAT | ChangeTaskStatusAT

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
          /*  const stateCopy = {...state}
           const tasks = state[action.todolistId]
           const filteredTask = tasks.filter(t=> t.id != action.taskId)
           stateCopy[action.todolistId]= filteredTask
           return stateCopy */
       return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [
                  { id: v1(), title: action.title, isDone: false },
                  ...state[action.todolistId]
                ]
              };
        case "CHANGE-TASK-TITLE":
            return { ...state }
        /* case "CHANGE-TASK-FILTER":
            return state.map(el => el.id === action.id ? { ...el, filter: action.filter } : el) */
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTasktAT => ({ type: RemoveTasktAT, taskId, todolistId })
export const addTaskAC = (title:string, todolistId: string):addTaskAC=>({type:addTaskAT, title,todolistId})
/* export const AddTodolistAC = (title: string): AddTodoListAT => ({ type: AddTodoListAT, title })
export const ChangeTodolistAC = (id: string, title: string) => ({ type: ChangeTodoListTitleAT, id, title })
export const ChangeTodolistFilterAC = (id: string, filter: FilterType) => ({ type: ChangeTodoListFilterAT, id, filter }) */