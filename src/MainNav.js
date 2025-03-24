import React, {useState, useContext} from 'react';
import './App.css';
import add_task_icon from "./assets/add_task_icon.png";
import { Task } from './Task';

function MainNav(props) {
  const [showInput, setShowInput] = useState(false);
  const [task, setTask] = useState('');
  const [editing, setEditing] = useState(false);

  const openInput = () => {
    setShowInput(true);
  };

  const closeInput = () => {
      setShowInput(false);
      setTask('');
  };

  function handlenewTask(event) {
    setTask(event.target.value); 
  }

  const {AddTask, TaskComplete, TaskEdit, task_type, moveTask, completeTasks, isAllTasksCompleted, catPic, setIsAllTasksCompleted} = useContext(Task);


  function handleAddTask() {
      AddTask(task, task_type);
      setTask(""); 
      setShowInput(false);
  }

  const handleTaskComplete = (oldText) => {
      TaskComplete(oldText, task_type);
  };

  const openEdit = () => {
      setEditing(true);
  };

  const handleTaskEdit = (newText, oldText) => {
      TaskEdit(newText, oldText, task_type);
      setEditing(false);
    };


    return (
      <main>
        {isAllTasksCompleted && catPic && (
        <div className="popup">
          <h2>Congrats on finishing today's tasks!
             <br></br>
             <button className="close" onClick={() => setIsAllTasksCompleted(false)}>x</button>
             Enjoy this cute cat:</h2>
          <img id="cat" src={catPic} alt="Cute Cat" />
        </div>
        )}
        
        <div>
        <h1>{task_type}</h1>
        <ul>
          {props.tasks.map((task, index) => (
              <li key={index}>
              <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => handleTaskComplete(task.text)} 
              />
              {editing && 
              <input className="input-task" type="text" defaultValue={task.text} onBlur={(e) => handleTaskEdit(e.target.value, task.text)}></input>
              }
              {!editing && 
              <>
                <input className="input-task" value={task.text} onClick={openEdit}></input>
                <button id="input-move-task" onClick={() => moveTask(task.text, task.task_type)}> Move to {task.task_type === "Today" ? "Upcoming" : "Today"} </button>
              </>
              }
              <hr />
              </li>
          ))}
        </ul>

      {!showInput &&
          <button id="add-task-icon" onClick={openInput}>
          <img src={add_task_icon} alt="add icon"/>
          Add Task
          </button>
      }
  
      {showInput && 
      <div className="input-box">
          <input className="input-task" type="text" placeholder="Task Name" value={task} onChange={handlenewTask}/>
          <hr/>
          <div id="input-right-side">
              <button id="input-cancel" onClick={closeInput}>Cancel</button>
              <button id="input-add-task" onClick={handleAddTask}>Add Task</button>
          </div>
      </div>}

      <h1 id="completed-box">Completed</h1>
      <ul>
          {completeTasks.map((task, index) => (
            <li key={index}>
              <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => handleTaskComplete(task.text)} 
              />
              <input className="input-task" value={task.text}></input>
              <hr />
            </li>
          ))}
        </ul>
        </div>

      </main>
    );
  }

export default MainNav;

