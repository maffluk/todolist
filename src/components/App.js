import React, { useState } from 'react'
import '../App.css'
import Task from './task'

function App() {
  const [tasks, addTask] = useState([{ title: 'Купить хлеб', isCompleat: true }, { title: 'Изучить хуки', isCompleat: false }])
  const [appState, setState] = useState('All')

  let inputTask

  const addSomeTask = () => {
    if (inputTask.value === '') return null
    let newState = [...tasks]
    newState.push({ title: inputTask.value, isCompleat: false })
    inputTask.value = ''
    addTask(newState)
  }

  const compleatTask = title => {
    let newState = [...tasks]
    newState.forEach(item => {
      if(item.title === title){
        item.isCompleat = !item.isCompleat
      }
    })
    addTask(newState)
  }

  return (
    <div className="App">
      <header>
        <input className="form-control form-control-lg" type="text" placeholder='Write your task' ref={(node) => inputTask = node} />
        <button type="button" onClick={addSomeTask} className="btn btn-primary btn-lg">Add</button>
        <button type="button" onClick={() => setState('All')} className={`btn btn-outline-success switch ${appState === 'All' ? 'active' : null}`}>All</button>
        <button type="button" onClick={() => setState('Incompleat')} className={`btn btn-outline-danger ${appState === 'Incompleat' ? 'active' : null}`}>Incompleat</button>
      </header>

      <div className="list-group">
        {tasks.map(({ title, isCompleat }, index) => {
          if (appState === 'Incompleat' && isCompleat === false) {
            return <Task key={title} title={title} index={index} click={compleatTask} isCompleat={isCompleat} />
          }
          else if (appState === 'All') {
            return <Task key={title} title={title} index={index} click={compleatTask} isCompleat={isCompleat} />
          }
        })}
      </div>
    </div>
  );
}

export default App;
