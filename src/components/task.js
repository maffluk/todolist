import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

const Task = ({ title, isCompleat, id, click, index}) => {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <div className="custom-control custom-checkbox task" {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging} >
                    <input type="checkbox" defaultChecked={isCompleat} onClick={() => click(title)} className="custom-control-input" id={`customCheck${index}`} />
                    <label className="custom-control-label" htmlFor={`customCheck${index}`}>{title}</label>
                </div>
            )}
        </Draggable>
    )
}

export default Task