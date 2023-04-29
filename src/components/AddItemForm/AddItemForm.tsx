import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}


const AddItemForm = memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    const [error, serError] = useState(false)
    console.log("render")


    const addTask = () => {
        let trimTitle = title.trim()
        if (trimTitle) {
            props.addItem(title);
            setTitle("")
            serError(false)
        } else {
            setTitle('')
            serError(true)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        serError(false)
        if (e.key === 'Enter') {
            addTask()
        }
    }


    return (
        <div>
            <input value={title} className={error ? 'error' : ''} onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">Title is requied</div>}
        </div>
    );
});


export default AddItemForm;