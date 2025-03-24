import React, { useState, useContext } from 'react';
import './App.css';
import add_task_icon from "./assets/add_task_icon.png";
import { Task } from './Task';

function MainNav(props) {
  const [showInput, setShowInput] = useState(false);
  const [task, setTask] = useState('');
  const [editing, setEditing] = useState(false);

  const { addTask, deleteTask, clearAll, randomTask, chooseRandomTask, setRandomTask, taskComplete, taskEdit, taskType, moveTask, completeTasks, isAllTasksCompleted, catPic, setIsAllTasksCompleted} = useContext(Task);

  // Open input task box
  const openInput = () => {
    setShowInput(true);
  }

  // Close input task box
  const closeInput = () => {
    setShowInput(false);
    setTask('');
  };

  // Mark a task as compelte
  const handleTaskComplete = (text) => {
    taskComplete(text, taskType);
  };

  // Add task and get rid of the input box
  const handleAddTask = () => {
    addTask(task, taskType);
    setTask('');
    setShowInput(false);
  };

  // Editing task
  const handleTaskEdit = (newText, oldText) => {
    taskEdit(newText, oldText, taskType);
    setEditing(false);
  };

  return (
    <main>
    
      {isAllTasksCompleted && catPic && taskType === "Today" && (
        <div className="popup">
          <h2>Congrats on finishing today's tasks! 
            <button className="close" onClick={() => setIsAllTasksCompleted(false)}>x</button>
          </h2>
          <img id="cat" src={catPic} alt="Cute Cat" />
        </div>
      )}

      <button className="fat-button" id="clear-all-task" onClick={() => clearAll(taskType)}> Clear all </button>
      {taskType === "Today" && <button className="fat-button" id="input-choose-task" onClick={chooseRandomTask}> Random </button>}

      {taskType === "Today" && randomTask &&
        <div className="popup">
          <h4>Random Task: {randomTask.text}
            <button className="close" onClick={() => setRandomTask(null)}>x</button>
          </h4>
        </div>
      }

      <div>
        <h1>{taskType}</h1>
        <ul>
          {props.tasks.map((task, index) => (
            <div key={index}>
              <li className="task-item">
                <div className="task-content">
                  <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={() => handleTaskComplete(task.text)} 
                  />
                  {editing ? (
                    <input 
                      className="input-task" 
                      type="text" 
                      defaultValue={task.text} 
                      onBlur={(e) => handleTaskEdit(e.target.value, task.text)} 
                    />
                  ) : (
                    <input 
                      className="input-task" 
                      value={task.text} 
                      onClick={() => setEditing(true)} 
                    />
                  )}
                </div>
                <button className="small-button" id="input-move-task" onClick={() => moveTask(task.text, task.task_type)}>
                  Move to {task.task_type === "Today" ? "Upcoming" : "Today"}
                </button>
                <button className="small-button" id="input-trash" onClick={() => deleteTask(task.text, task.task_type)}> Delete </button>
              </li>
              <hr />
            </div>
          ))}
        </ul>

        {!showInput && (
          <button id="add-task-icon" onClick={openInput}>
            <img src={add_task_icon} alt="add icon" />
            Add Task
          </button>
        )}

        {showInput && (
          <div className="input-box">
            <input 
              className="input-task" 
              type="text" 
              placeholder="Task Name" 
              value={task} 
              onChange={(e) => setTask(e.target.value)} 
            />
            <hr />
            <button className="fat-button" id="input-add-task" onClick={handleAddTask}>Add Task</button>
            <button className="fat-button" id="input-cancel" onClick={closeInput}>Cancel</button>
          </div>
        )}

        <h1 id="completed-box">Completed</h1>
        <ul>
          {completeTasks.map((task, index) => (
            <li key={index}>
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => handleTaskComplete(task.text)}>
                </input>
                <input className="input-task" value={task.text} readOnly />
                <button className="small-button" id="input-trash" onClick={() => deleteTask(task.text, task.task_type)}>
                  Delete
                </button>
              <hr />
            </li>
          ))}
        </ul>

      </div>

    </main>
  );
}

export default MainNav;
