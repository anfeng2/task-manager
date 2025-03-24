import menu_icon from "./assets/menu_icon.png";
import search_icon from "./assets/search_icon.png";
import check_icon from "./assets/check_icon.png";
import React, { useState, useContext, useEffect} from 'react';
import './App.css';
import NavBar from "./NavBar";
import MainNav from "./MainNav";
import {Task} from "./Task"


function Header() {
    const [isOpen, setIsOpen] = useState(true);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    const [filterChars, setFilterChars] = useState('');

    const handleFilterChars = (event) => {
        setFilterChars(event.target.value);
    };

    const {tasks, task_type, totalTasks, completeCount} = useContext(Task);

    const [filteredTasks, setFilteredTask] = useState([]);

    useEffect(() => {
      const changeFilteredTask = () => {
        if (filterChars.length > 0) {
          setFilteredTask(tasks.filter(task =>
            !task.completed && task.task_type === task_type && task.text.toLowerCase().includes(filterChars.toLowerCase())));
        } else {
          setFilteredTask(tasks.filter(task =>
            !task.completed && task.task_type === task_type));
        }
      };
      changeFilteredTask();
    }, [filterChars, tasks, task_type]);

    const todayfilteredTasks = tasks.filter(task => !task.completed && task.task_type === "Today").length;
    const upcomingfilteredTasks = tasks.filter(task => !task.completed && task.task_type === "Upcoming").length;

    return (
    <>
        <div className={isOpen ? "nav-bar" : "no-nav-bar"}>
        <header className="header">
        <div id="header-left-side">
          <button id="menu_icon" onClick={toggleMenu}>
            <img src={menu_icon} alt="menu icon" />
          </button>
          <div id="quick-find-container">
            <img id="search-icon" src={search_icon} alt="search icon" />
            <input id="quick-find" type="text" placeholder="Quick Find" value={filterChars} onChange={handleFilterChars}/>
          </div>
        </div>
        <div id="header-right-side">
          <img id="check-icon" src={check_icon} alt="check icon" />
          <p id="task-count">{completeCount} / {totalTasks}</p>
        </div>
      </header>
      {isOpen && <NavBar todayfilteredTasks={todayfilteredTasks} upcomingfilteredTasks={upcomingfilteredTasks}></NavBar>}
      <MainNav tasks={filteredTasks}></MainNav>
      </div>
    </>
    );
  }
  
  export default Header;
