import { useDispatch, useSelector } from 'react-redux';
import { v1 } from "uuid";
import './App.css';
import { TaskType, ToDoList, } from "./ToDoList";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import { AppRootStateType } from './redux-store/store';
import { AddToDoListAC, ChangeTaskTitleAC, addTaskAC, changeTaskStatusAC, removeTaskAC } from './todolist-reducer/tasks-reducer';
import { ChangeTodolistAC, ChangeTodolistFilterAC, RemoveTodolistAC } from './todolist-reducer/todolists-reducer';
import { useCallback } from 'react';



export type FilterType = 'all' | 'active' | 'completed'

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type TodoListType = {
    id: string,
    title: string,
    filter: FilterType
}

const AppWithRedux = () => {

    const todolists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()


    const addTodoList = useCallback((title: string) => {
        let action = title
        dispatch(AddToDoListAC(action))
    }, [dispatch])

    const deleteTodoList = useCallback((id: string) => {
        dispatch(RemoveTodolistAC(id))
    }, [dispatch])

    const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
        dispatch(ChangeTodolistAC(id, newTitle))
    }, [dispatch])

    const filtredTask = useCallback((todoListId: string, value: FilterType) => {
        dispatch(ChangeTodolistFilterAC(todoListId, value))
    }, [dispatch])

    const removeTask = useCallback((id: string, todoListId: string) => {
        dispatch(removeTaskAC(id, todoListId))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newValue: string, todoListId: string) => {
        dispatch(ChangeTaskTitleAC(taskId, newValue, todoListId))
    }, [dispatch])

    return (
        <div className={'App'}>
            <AddItemForm addItem={addTodoList} />
            {todolists?.map(t => {

                return <ToDoList key={t.id} title={t.title} tasks={tasks[t.id]} removeTask={removeTask}
                    filtredTask={filtredTask} addTask={addTask} changeTaskStatus={changeTaskStatus}
                    filter={t.filter} id={t.id} deleteTodoList={deleteTodoList} changeTaskTitle={changeTaskTitle} changeTodoListTitle={changeTodoListTitle} />
            })}
        </div>
    )
}

export default AppWithRedux;
