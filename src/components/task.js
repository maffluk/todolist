import React from 'react'

const Task = ({ title, isCompleat, index, click }) => {
    return (
        <React.Fragment >
            <input type="checkbox" name="CheckBoxInputName" defaultChecked={isCompleat} value={title} id={`CheckBox${index}`} onClick={() => click(title)} />
            <label className="list-group-item" htmlFor={`CheckBox${index}`}>{title}</label>
        </React.Fragment>
    )
}

export default Task