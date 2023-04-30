import React, { ChangeEvent, KeyboardEvent, memo, useCallback, useMemo, useState } from 'react'
import { FilterType } from "./App";
import './App.css';
import AddItemForm from "./components/AddItemForm/AddItemForm";
import EditableSpan from "./components/EditableSpan/EditableSpan";
import { Tasks } from './components/Tasks/Tasks';
import { TasksWithRedux } from './components/Tasks/TasksWithRedux';

type ToDoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    deleteTodoList: (id: string) => void
    removeTask: (id: string, todoListId: string) => void
    filtredTask: (todoListId: string, value: FilterType) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    filter: FilterType
}

export type TodoListType = {
    id: string
    title: string
    filter: string
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const ToDoList = memo((props: ToDoListPropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [])

    const onAllClickHandler = () => {
        props.filtredTask(props.id, 'all')
    }
    const onActiveClickHandler = () => {
        props.filtredTask(props.id, 'active')
    }
    const onCompletedClickHandler = () => {
        props.filtredTask(props.id, 'completed')
    }
    const removeTodolist = () => {
        props.deleteTodoList(props.id)
    }

    const onChangeTitleHandler = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title)
    }, [props.changeTodoListTitle, props.id])

    /* 
        const removeTask = useCallback((taskId: string) => {
            props.removeTask(taskId, props.id)
        }, [props.removeTask, props.id])
        const changeTaskStatus = useCallback((taskId: string, newtaskStatus: boolean) => {
            props.changeTaskStatus(taskId, newtaskStatus, props.id)
        }, [props.changeTaskStatus, props.id])
        const changeTaskTitle = useCallback((taskId: string, newValue: string) => {
            props.changeTaskTitle(taskId, newValue, props.id)
        }, [props.changeTaskTitle, props.id]) */



    let tasks = props.tasks

    useMemo(() => {
        if (props.filter === 'active') {
            tasks = tasks.filter(task => task.isDone === false)
        }
        if (props.filter === 'completed') {
            tasks = tasks.filter(task => task.isDone === true)
        }
        return tasks
    }, [props.filter, props.tasks])



    return (
        <div className="App">
            <div>
                <h3>
                    <EditableSpan title={props.title} onChange={onChangeTitleHandler} />
                    <button onClick={removeTodolist}>X</button>
                </h3>
                <div >

                </div>
                <AddItemForm addItem={addTask} />
                <div>
                    <ul>
                        {tasks?.map(t => {
                            return <TasksWithRedux key={t.id} task={t} todolistId={props.id} />
                        })}
                    </ul>
                </div>
                <div>
                    <button onClick={onAllClickHandler} className={props.filter === 'all' ? 'active-filter' : ''}>All
                    </button>
                    <button onClick={onActiveClickHandler}
                        className={props.filter === 'active' ? 'active-filter' : ''}>Active
                    </button>
                    <button onClick={onCompletedClickHandler}
                        className={props.filter === 'completed' ? 'active-filter' : ''}>Completed
                    </button>
                </div>
            </div>
        </div>)
})