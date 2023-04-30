import React, { ChangeEvent, memo, useCallback } from "react";
import { TaskType } from "../../ToDoList";
import EditableSpan from "../EditableSpan/EditableSpan";

type TaskPropsType = {
    task: TaskType
    removeTask: (id: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean,) => void
    changeTaskTitle: (taskId: string, newValue: string,) => void
}


export const Tasks = memo((props: TaskPropsType) => {
    const onClickRemoveTaskHandler = () => {
        props.removeTask(props.task.id, props.task.id)
    }
    const onChangeTaskStates = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked)
    }
    const onChange = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue)
    }, [props.changeTaskTitle, props.task.id])
    return (
        <li className={props.task.isDone ? 'is-done' : ""}>
            <EditableSpan title={props.task.title} onChange={onChange} />
            <input type={"checkbox"} checked={props.task.isDone} onChange={onChangeTaskStates} />
            <button onClick={onClickRemoveTaskHandler}>X</button>
        </li>
    )
})