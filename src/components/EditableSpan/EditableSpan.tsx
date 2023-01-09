import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (title:string)=>void
}

const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)

const activateEditMode = () => {
  setEditMode(true)
    setTitle(props.title)
}
const activateViewMode = () => {
  setEditMode(false)
    props.onChange(title)
}

const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
  setTitle(e.currentTarget.value)
}

    return (
        <>
            {editMode ? <input  onBlur={activateViewMode} onChange={onChangeTitleHandler} value={title} autoFocus/> :
                <span onDoubleClick={activateEditMode}>{title}</span>}
        </>
    );
};

export default EditableSpan;