import React, { useState } from 'react'
import '../App.css'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Task from './task'

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle
});


function App() {
  const [tasks, addTask] = useState([{ id: "item-0", title: 'Купить хлеб', isCompleat: true }, { id: "item-1", title: 'Изучить хуки', isCompleat: false }])
  const [appState, setState] = useState('All')

  let inputTask

  const addSomeTask = () => {
    if (inputTask.value === '') return null
    let newState = [...tasks]
    newState.push({ title: inputTask.value, isCompleat: false, id: `item-${newState.length}` })
    inputTask.value = ''
    addTask(newState)
  }

  const compleatTask = title => {
    let newState = [...tasks]
    newState.forEach(item => {
      if (item.title === title) {
        item.isCompleat = !item.isCompleat
      }
    })
    addTask(newState)
  }
  const onDragEnd = result => {
    if (!result.destination) {
      return
    }
    let newState = [...tasks]
    let [removed] = newState.splice(result.source.index, 1);
    newState.splice(result.destination.index, 0, removed);

    addTask(newState)
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
      <header>
        <input className="form-control form-control-lg" type="text" placeholder='Write your task' ref={(node) => inputTask = node} />
        <button type="button" onClick={addSomeTask} className="btn btn-primary btn-lg">Add</button>
        <button type="button" onClick={() => setState('All')} className={`btn btn-outline-success switch ${appState === 'All' ? 'active' : null}`}>All</button>
        <button type="button" onClick={() => setState('Incompleat')} className={`btn btn-outline-danger switch ${appState === 'Incompleat' ? 'active' : null}`}>Incompleat</button>
      </header>
      <div className="list-group">
          <Droppable droppableId='droppableId'>
            {(provided) => {
              return (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {tasks.map(({ title, isCompleat, id }, index) => {
                    if (appState === 'Incompleat' && isCompleat === false) {
                      return <Task key={title} title={title} id={id} index={index} click={compleatTask} isCompleat={isCompleat} />
                    }
                    else if (appState === 'All') {
                      return <Task key={title} title={title} id={id} index={index} click={compleatTask} isCompleat={isCompleat} />
                    }
                  })}
                  {provided.placeholder}
                </div>
              )
            }}
          </Droppable>
      </div>
    </div>
    </DragDropContext>
  );
}

export default App;
