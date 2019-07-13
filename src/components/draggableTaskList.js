import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const TaskList = ({ tasks, compleatTask }) => {
  return (
    <Droppable droppableId='droppableId'>
      {(provided) => {
        return (
          <div ref={provided.innerRef} {...provided.droppableProps} >
            {tasks.map(({ title, isCompleat, id }, index) => {
              return (
                <Draggable draggableId={id} key={id} index={index}>
                  {(provided, snapshot) => (
                    <div className="custom-control custom-checkbox task" {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      isDragging={snapshot.isDragging} >
                      <input type="checkbox" defaultChecked={isCompleat} onClick={() => compleatTask(title)} className="custom-control-input" id={`customCheck${index}`} />
                      <label className="custom-control-label" htmlFor={`customCheck${index}`}>{title}</label>
                    </div>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </div>
        )
      }}
    </Droppable>
  )
}

export default TaskList