import React, { ChangeEvent, memo, useCallback } from "react";
import { TaskType } from "../../ToDoList";
import EditableSpan from "../EditableSpan/EditableSpan";
import { useDispatch } from "react-redux";
import { ChangeTaskTitleAC, changeTaskStatusAC, removeTaskAC } from "../../todolist-reducer/tasks-reducer";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const TasksWithRedux = memo((props: TaskPropsType) => {

    let dispatch = useDispatch()

    const onClickRemoveTaskHandler = () => {
        dispatch(removeTaskAC(props.task.id, props.todolistId))
    }
    const onChangeTaskStates = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id, e.currentTarget.checked, props.todolistId))
    }
    const onChange = useCallback((newValue: string) => {
        dispatch(ChangeTaskTitleAC(props.task.id, newValue, props.todolistId))
    }, [dispatch])
    return (
        <li className={props.task.isDone ? 'is-done' : ""}>
            <EditableSpan title={props.task.title} onChange={onChange} />
            <input type={"checkbox"} checked={props.task.isDone} onChange={onChangeTaskStates} />
            <button onClick={onClickRemoveTaskHandler}>X</button>
        </li>
    )
})