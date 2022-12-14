import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterType} from "./App";
import './App.css';

type ToDoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    deleteTodoList: (id: string) => void
    removeTask: (id: string, todoListId: string) => void
    filtredTask: (value: FilterType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: string
}
type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const ToDoList = (props: ToDoListPropsType) => {

    const [title, setTitle] = useState('')
    const [error, serError] = useState(false)


    const addTask = () => {
        let trimTitle = title.trim()
        if (trimTitle) {
            props.addTask(title, props.id);
            setTitle("")
            serError(false)
        } else {
            serError(true)
        }
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
        props.filtredTask('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.filtredTask('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.filtredTask('completed', props.id)
    }
    const removeTodolist = () => {
        props.deleteTodoList(props.id)
    }


    return (
        <div className="App">
            <div>
                <h3>{props.title}
                    <button onClick={removeTodolist}>X</button>
                </h3>
                <div>
                    <input value={title} className={error ? 'error' : 'input'} onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                    />
                    <button onClick={addTask}>+</button>
                    {error && <div>Title is requied</div>}
                </div>
                <div>
                    <ul>
                        {props.tasks.map((task, index) => {
                            const onClickRemoveTaskHandler = () => {
                                props.removeTask(task.id, props.id)
                            }
                            const onChangeTaskStates = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                            }
                            return (
                                <li key={task.id} className={task.isDone ? 'is-done' : ""}>{task.title}
                                    <input type={"checkbox"} checked={task.isDone} onChange={onChangeTaskStates}/>
                                    <button onClick={onClickRemoveTaskHandler}>X</button>
                                </li>
                            )
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
}