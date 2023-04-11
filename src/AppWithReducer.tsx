import { useReducer, useState } from 'react';
import { v1 } from "uuid";
import './App.css';
import { TaskType, ToDoList, } from "./ToDoList";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import { tasksReducer } from './todolist-reducer/tasks-reducer';
import { todolistsReducer } from './todolist-reducer/todolists-reducer';



export type FilterType = 'all' | 'active' | 'completed'

export type TasksStateType = {
    [key:string] : Array<TaskType>
}
export  type TodoListType = {
    id: string,
    title: string,
    filter: FilterType
}

function AppWithReducer() {

    let todolistID1 = v1()
    let todolistID2 = v1()

      let [todolists, setTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])



    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    
    function addTodoList(title: string) {
        let newToDoListId = v1()
        let newToDoList: TodoListType = {id:newToDoListId, title:title, filter:'all'}
        setTodolists([newToDoList,...todolists])
        setTasks({
            ...tasks,
            [newToDoListId] : []
        })
    }

    function filtredTask(value: FilterType, todoListId: string) {
        let todoList = todolists.find(el => el.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodolists([...todolists])
        }
    }

    function removeTask(id: string, todoListId: string) {
        let todolistTasks = tasks[todoListId]

        tasks[todoListId] = todolistTasks.filter(tasks => id != tasks.id)
        setTasks({...tasks})
    }

    function addTask(task: string, todoListId: string)  {
        let newTask = {id: v1(), title: task, isDone: false}
        let todolistTask = tasks[todoListId]

        tasks[todoListId] = [newTask, ...todolistTask]
        setTasks({...tasks})

    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        let todolistTask = tasks[todoListId]
        let task = todolistTask.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function deleteTodoList(id: string) {
        setTodolists(todolists.filter(t => t.id != id))

        delete tasks[id]

        setTasks({...tasks})
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const todolist= todolists.find(t=> t.id === id)
        if (todolist){
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }
    
    function changeTaskTitle(taskId: string, newValue: string, todoListId: string) {
        let todolistTask = tasks[todoListId]
        let task = todolistTask.find(t => t.id === taskId)
        if (task) {
            task.title = newValue
            setTasks({...tasks})
        }
    }

    return (
        <div className={'App'}>
            <AddItemForm addItem={addTodoList}/>
            {todolists.map(t => {

                let allTodolistTasks = tasks[t.id]
                let taskForToDoList = allTodolistTasks
                if (t.filter === 'active') {
                    taskForToDoList = allTodolistTasks.filter(task => task.isDone === false)
                }
                if (t.filter === 'completed') {
                    taskForToDoList = allTodolistTasks.filter(task => task.isDone === true)
                }

                return <ToDoList key={t.id} title={t.title} tasks={taskForToDoList} removeTask={removeTask}
                                 filtredTask={filtredTask} addTask={addTask} changeTaskStatus={changeTaskStatus}
                                 filter={t.filter} id={t.id} deleteTodoList={deleteTodoList} changeTaskTitle={changeTaskTitle} changeTodoListTitle={changeTodoListTitle}/>
            })}
        </div>
    )
}

export default AppWithReducer;
