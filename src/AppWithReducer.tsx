import { useReducer, useState } from 'react';
import { v1 } from "uuid";
import './App.css';
import { TaskType, ToDoList, } from "./ToDoList";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import { AddToDoListAC, ChangeTaskTitleAC, RemoveTodoListAC, addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer } from './todolist-reducer/tasks-reducer';
import { AddTodolistAC, ChangeTodolistAC, ChangeTodolistFilterAC, RemoveTodolistAC, todolistsReducer } from './todolist-reducer/todolists-reducer';



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

      let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
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
        let action = title
        dispatchToTasks(AddToDoListAC(action))
        dispatchToTodolists(AddTodolistAC(action))
    }

    function deleteTodoList(id: string) {
        dispatchToTodolists(RemoveTodolistAC(id))
        dispatchToTasks(RemoveTodoListAC(id))
    }

    function changeTodoListTitle(id: string, newTitle: string) {
     /*    const todolist= todolists.find(t=> t.id === id)
        if (todolist){
            todolist.title = newTitle
            setTodolists([...todolists])
        } */
        dispatchToTodolists(ChangeTodolistAC(id, newTitle))
    }

    function filtredTask( todoListId: string,value: FilterType) {
      /*   let todoList = todolists.find(el => el.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodolists([...todolists])
        } */
        dispatchToTodolists(ChangeTodolistFilterAC(todoListId,value))
    }

    function removeTask(id: string, todoListId: string) {
  /*       let todolistTasks = tasks[todoListId]

        tasks[todoListId] = todolistTasks.filter(tasks => id != tasks.id)
        setTasks({...tasks}) */
        dispatchToTasks(removeTaskAC(id,todoListId))
    }

    function addTask(title: string, todoListId: string)  {
      /*   let newTask = {id: v1(), title: task, isDone: false}
        let todolistTask = tasks[todoListId]

        tasks[todoListId] = [newTask, ...todolistTask]
        setTasks({...tasks}) */
        dispatchToTasks(addTaskAC(title,todoListId))
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
    /*     let todolistTask = tasks[todoListId]
        let task = todolistTask.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        } */
        dispatchToTasks(changeTaskStatusAC(taskId,isDone,todoListId))
    }

   
    
    function changeTaskTitle(taskId: string, newValue: string, todoListId: string) {
      /*   let todolistTask = tasks[todoListId]
        let task = todolistTask.find(t => t.id === taskId)
        if (task) {
            task.title = newValue
            setTasks({...tasks})
        } */
        dispatchToTasks(ChangeTaskTitleAC(taskId,newValue,todoListId))
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
