import React, { useState, useEffect } from 'react'
import '../App.css'
import { DragDropContext } from 'react-beautiful-dnd'
import DraggableTaskList from './draggableTaskList'

const App = () => {
  const [tasks, addTask] = useState([{ id: "item-0", title: 'Сделать ToDo list', isCompleat: true }, { id: "item-1", title: 'Изучить хуки', isCompleat: false }])
  const [incompleat, setIncompleat] = useState([])
  const [appState, setState] = useState('All')

  let inputTask

  const addNewTask = () => {
    if (inputTask.value === '') return null
    let newState = [...tasks]
    newState.push({ title: inputTask.value, isCompleat: false, id: `item-${newState.length}` })
    inputTask.value = ''
    addTask(newState)
  }

  const compleatTask = title => {
    if(appState === 'All'){
      let newState = [...tasks]
      newState.forEach(item => {
        if (item.title === title) {
          item.isCompleat = !item.isCompleat
        }
      })
      addTask(newState)
    }
    else{
      let newState = [...incompleat]
      newState.forEach((item, index) => {
        if (item.title === title) {
          item.isCompleat = !item.isCompleat
          if(item.isCompleat){
            newState.splice(index, 1)
          }
        }
      })
      setIncompleat(newState)
    }
  }

  const onDragEnd = ({ destination, source }) => {
    if (!destination) {
      return
    }
    if(appState === 'All'){
      let newState = [...tasks]
      let [removed] = newState.splice(source.index, 1)
      newState.splice(destination.index, 0, removed)
      addTask(newState)
    }
    else{
      let newState = [...incompleat]
      let [removed] = newState.splice(source.index, 1)
      newState.splice(destination.index, 0, removed)
      setIncompleat(newState)
    }
  }

  const onDragUpdate = () => window.navigator.vibrate([50])

  useEffect(() => {
    let incompleatArr = []
    tasks.forEach(item => {
      if (item.isCompleat === false) incompleatArr.push(item)
    })
    setIncompleat(incompleatArr)
  }, [tasks])

  return (
    <div className="App">
      <header>
        <input className="form-control form-control-lg" type="text" placeholder='Write your task' ref={(node) => inputTask = node} />
        <button type="button" onClick={addNewTask} className="btn btn-primary btn-lg">Add</button>
        <button type="button" onClick={() => setState('All')} className={`btn btn-outline-success switch ${appState === 'All' ? 'active' : null}`}>All</button>
        <button type="button" onClick={() => setState('Incompleat')} className={`btn btn-outline-danger switch ${appState === 'Incompleat' ? 'active' : null}`}>Incompleat</button>
      </header>

      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        {appState === 'All' ?
          <DraggableTaskList tasks={tasks} compleatTask={compleatTask} />
          :
          <DraggableTaskList tasks={incompleat} compleatTask={compleatTask} />}
      </DragDropContext>
    </div>
  )
}

export default App;
