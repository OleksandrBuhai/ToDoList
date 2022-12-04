import React from 'react';
import {FilterType} from "./App";

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask:(id:number)=>void
    filtredTask:(value:FilterType)=>void
}
type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const ToDoList = (props: ToDoListPropsType) => {
    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <div>
                    <ul>
                        {props.tasks.map((task, index) => {
                            return (
                                <li key={task.id}>{task.title}
                                    <input type={"checkbox"} checked={task.isDone}/>
                                    <button onClick={()=>props.removeTask(task.id)}>X</button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <button onClick={()=>props.filtredTask('all')}>All</button>
                    <button onClick={()=>props.filtredTask('active')}>Active</button>
                    <button onClick={()=>props.filtredTask(' completed')}>Completed</button>
                </div>
            </div>
        </div>)
}