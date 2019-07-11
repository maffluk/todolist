import React, { useState } from 'react'
import '../App.css'
import Task from './task'

function App() {
  const [tasks, addTask] = useState([{ title: 'Купить хлеб', isCompleat: true }, { title: 'Изучить хуки', isCompleat: false }])
  let inputTask
  const addSomeTask = () => {
    if (inputTask.value === '') return null
    let newtate = [...tasks]
    newtate.push({ title: inputTask.value, isCompleat: false })
    inputTask.value = ''
    addTask(newtate)
  }
  return (
    <div className="App">
      <header>
        <input className="form-control form-control-lg" type="text" placeholder='Write your task' ref={(node) => inputTask = node} />

        <button type="button" onClick={addSomeTask} className="btn btn-primary btn-lg">Add</button>

        <button type="button" className="btn btn-outline-success switch">All</button>
        <button type="button" className="btn btn-outline-danger">Incompleat</button>
      </header>

      <div className="list-group">
        {tasks.map(({ title, isCompleat }, index) => <Task key={title} title={title} index={index} isCompleat={isCompleat} />)}
      </div>

    </div>
  );
}

export default App;
