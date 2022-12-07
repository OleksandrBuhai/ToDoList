import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

import {FilterType} from "./App";

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    filtredTask: (value: FilterType) => void
    addTask: (title: string) => void
}
type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const ToDoList = (props: ToDoListPropsType) => {

    const [title, setTitle] = useState('')

    const addTask = () => {
        props.addTask(title);
        setTitle("")
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const onAllClickHandler = () => {
        props.filtredTask('all')
    }
    const onActiveClickHandler = () => {
        props.filtredTask('active')
    }

    const onCompletedClickHandler = () => {
        props.filtredTask(' completed')
    }

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={title} onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                    />
                    <button onClick={addTask}>+</button>
                </div>
                <div>
                    <ul>
                        {props.tasks.map((task, index) => {
                            const onClickRemoveTaskHandler = () => {
                                props.removeTask(task.id)
                            }
                            return (
                                <li key={task.id}>{task.title}
                                    <input type={"checkbox"} checked={task.isDone}/>
                                    <button onClick={onClickRemoveTaskHandler}>X</button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <button onClick={onAllClickHandler}>All</button>
                    <button onClick={onActiveClickHandler}>Active</button>
                    <button onClick={onCompletedClickHandler}>Completed</button>
                </div>
            </div>
        </div>)
}