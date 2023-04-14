import { useDispatch, useSelector } from 'react-redux';
import { v1 } from "uuid";
import './App.css';
import { TaskType, ToDoList, } from "./ToDoList";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import { AppRootStateType } from './redux-store/store';
import { AddToDoListAC, ChangeTaskTitleAC, addTaskAC, changeTaskStatusAC, removeTaskAC } from './todolist-reducer/tasks-reducer';
import { ChangeTodolistAC, ChangeTodolistFilterAC, RemoveTodolistAC } from './todolist-reducer/todolists-reducer';



export type FilterType = 'all' | 'active' | 'completed'

export type TasksStateType = {
    [key:string] : Array<TaskType>
}
export  type TodoListType = {
    id: string,
    title: string,
    filter: FilterType
}

function AppWithRedux() {


    const todolists = useSelector<AppRootStateType,TodoListType[]>(state=>state.todolists)
    const tasks = useSelector<AppRootStateType,TasksStateType>(state=>state.tasks)
    const dispatch = useDispatch()
    

    function addTodoList(title: string) {
        let action = title
        let id = v1()
        dispatch(AddToDoListAC(action))
    }

    function deleteTodoList(id: string) {
        dispatch(RemoveTodolistAC(id))
    }

    function changeTodoListTitle(id: string, newTitle: string) {
     /*    const todolist= todolists.find(t=> t.id === id)
        if (todolist){
            todolist.title = newTitle
            setTodolists([...todolists])
        } */
        dispatch(ChangeTodolistAC(id, newTitle))
    }

    function filtredTask( todoListId: string,value: FilterType) {
      /*   let todoList = todolists.find(el => el.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodolists([...todolists])
        } */
        dispatch(ChangeTodolistFilterAC(todoListId,value))
    }

    function removeTask(id: string, todoListId: string) {
  /*       let todolistTasks = tasks[todoListId]

        tasks[todoListId] = todolistTasks.filter(tasks => id != tasks.id)
        setTasks({...tasks}) */
        dispatch(removeTaskAC(id,todoListId))
    }

    function addTask(title: string, todoListId: string)  {
      /*   let newTask = {id: v1(), title: task, isDone: false}
        let todolistTask = tasks[todoListId]

        tasks[todoListId] = [newTask, ...todolistTask]
        setTasks({...tasks}) */
        dispatch(addTaskAC(title,todoListId))
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
    /*     let todolistTask = tasks[todoListId]
        let task = todolistTask.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        } */
        dispatch(changeTaskStatusAC(taskId,isDone,todoListId))
    }

   
    
    function changeTaskTitle(taskId: string, newValue: string, todoListId: string) {
      /*   let todolistTask = tasks[todoListId]
        let task = todolistTask.find(t => t.id === taskId)
        if (task) {
            task.title = newValue
            setTasks({...tasks})
        } */
        dispatch(ChangeTaskTitleAC(taskId,newValue,todoListId))
    }

    return (
        <div className={'App'}>
            <AddItemForm addItem={addTodoList}/>
            {todolists?.map(t => {

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

export default AppWithRedux;
