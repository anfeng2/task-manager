import calendar_icon from "./assets/calendar_icon.png";
import upcoming_icon from "./assets/upcoming_icon.png";
import React, {useContext} from 'react';
import './App.css';
import { Task } from "./Task";

function NavBar(props) {
  const {changeTaskType} = useContext(Task);

  // Create buttons on the navigation bar
  const renderButton = (taskType, icon, count) => (
    <li>
      <button className="navbar-button" onClick={() => changeTaskType(taskType)}>
        <img src={icon} alt={`${taskType} icon`} />
        <span className="text">
          {taskType} <span className="count">{count}</span>
        </span>
      </button>
    </li>
  );

  return (
    <nav className="nav">
      <ul>
        {renderButton("Today", calendar_icon, props.todayfilteredTasks)}
        {renderButton("Upcoming", upcoming_icon, props.upcomingfilteredTasks)}
      </ul>
    </nav>
  );
}
  
  export default NavBar;