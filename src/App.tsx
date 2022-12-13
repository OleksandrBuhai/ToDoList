import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";

export type FilterType = 'all'| 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState( [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false }
    ])

    const [filter, setFilter] = useState<FilterType>('all')

    let taskForToDoList = tasks
     if (filter === 'active'){
         taskForToDoList = tasks.filter(task=> task.isDone=== false)
     }
     if (filter ==='completed'){
         taskForToDoList= tasks.filter(task=>task.isDone=== true)
     }


    function filtredTask(value:FilterType) {
        setFilter(value)
    }

    function removeTask(id:string) {
        let deletedTask = tasks.filter(tasks=> id!== tasks.id)
        setTasks(deletedTask);
    }

    function addTask(task:string) {
        let newTask = {id:v1(), title:task, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
        task = ''
    }

     function changeTaskStatus(taskId: string, isDone: boolean) {
         setTasks(tasks.map(t=>t.id=== taskId ? {...t,isDone: isDone} : t))
     }


    return (
        <div className={'App'}>
            <ToDoList title={"What To Learn?"} tasks={taskForToDoList} removeTask={removeTask}
                      filtredTask={filtredTask} addTask={addTask} changeTaskStatus={changeTaskStatus} filter={filter}/>
        </div>
    );
}

export default App;
