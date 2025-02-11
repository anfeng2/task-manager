import inbox_icon from "./assets/inbox_icon.png";
import calendar_icon from "./assets/calendar_icon.png";
import upcoming_icon from "./assets/upcoming_icon.png";
import React, {useContext} from 'react';
import './App.css';
import { Task } from "./Task";

function NavBar(props) {
  const {changeTaskType} = useContext(Task);

    return (props.isOpen && (
      <nav className="nav">
        <ul>
          <li>
            <button className="navbar-button" onClick={() => changeTaskType("Inbox")}>
                <img src={inbox_icon} alt="inbox icon" />
                <span className="text">Inbox <span className="count">{props.inboxfilteredTasks}</span></span>
            </button>
          </li>
          <li>
            <button className="navbar-button" onClick={() => changeTaskType("Today")}>
                <img src={calendar_icon} alt="calendar icon" />
                <span className="text">Today <span className="count">{props.todayfilteredTasks}</span></span>
            </button>
          </li>
          <li>
            <button className="navbar-button" onClick={() => changeTaskType("Upcoming")}>
                <img src={upcoming_icon} alt="upcoming icon" />
                <span className="text">Upcoming <span className="count">{props.upcomingfilteredTasks}</span></span>
            </button>
          </li>
        </ul>
      </nav>)
    );
  }
  
  export default NavBar;