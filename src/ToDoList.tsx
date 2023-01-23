import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterType} from "./App";
import './App.css';
import AddItemForm from "./components/AddItemForm/AddItemForm";
import EditableSpan from "./components/EditableSpan/EditableSpan";

type ToDoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    deleteTodoList: (id: string) => void
    removeTask: (id: string, todoListId: string) => void
    filtredTask: (value: FilterType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void
    changeTodoListTitle: (id:string, newTitle:string) => void
    filter: string
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const ToDoList = (props: ToDoListPropsType) => {

    const [title, setTitle] = useState('')
    const [error, serError] = useState(false)

    


    const addTask = (title:string) => {
        props.addTask(title, props.id)
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

    const onChangeTitleHandler = (title:string) => {
        props.changeTodoListTitle(props.id, title)
    }
    
    return (
        <div className="App">
            <div>
                <h3>
                    <EditableSpan title={props.title} onChange={onChangeTitleHandler}/>
                    <button onClick={removeTodolist}>X</button>
                </h3>
                <div >

                </div>
                <AddItemForm  addItem={addTask}/>
                <div>
                    <ul>
                        {props.tasks.map((task, index) => {
                            const onClickRemoveTaskHandler = () => {
                                props.removeTask(task.id, props.id)
                            }
                            const onChangeTaskStates = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                            }
                            const onChange = (newValue:string) => {
                                props.changeTaskTitle(task.id, newValue, props.id)
                            }
                            return (
                                <li key={task.id} className={task.isDone ? 'is-done' : ""}>
                                    <EditableSpan title={task.title}  onChange={onChange}/>
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