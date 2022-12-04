import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";

export type FilterType = 'all'| 'active' | ' completed'

function App() {

    const [tasks, setTasks] = useState( [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])

    const [filter, setFilter] = useState<FilterType>('all')

    let taskForToDoList = tasks
     if (filter === 'active'){
         taskForToDoList = tasks.filter(task=> task.isDone=== false)
     }
     if (filter ===' completed'){
         taskForToDoList= tasks.filter(task=>task.isDone=== true)
     }


    function filtredTask(value:FilterType) {
        setFilter(value)
    }


    function removeTask(id:number) {
        let deletedTask = tasks.filter(tasks=> id!== tasks.id)
        setTasks(deletedTask);
    }


    return (
        <div className={'App'}>
            <ToDoList title={"What To Learn?"} tasks={taskForToDoList} removeTask={removeTask} filtredTask={filtredTask}/>
        </div>
    );
}

export default App;
