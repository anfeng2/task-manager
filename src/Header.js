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
    const [filterChars, setFilterChars] = useState('');
    const { tasks, taskType, totalTasks, completeCount } = useContext(Task);

    // open and close the menu
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    // Search handling
    const handleFilterChars = (event) => {
        setFilterChars(event.target.value);
    };

    const [filteredTasks, setFilteredTask] = useState([]);

    useEffect(() => {
      const changeFilteredTask = () => {
        if (filterChars.length > 0) {
          setFilteredTask(tasks.filter(task =>
            !task.completed && task.task_type === taskType && task.text.toLowerCase().includes(filterChars.toLowerCase())));
        } else {
          setFilteredTask(tasks.filter(task =>
            !task.completed && task.task_type === taskType));
        }
      };
      changeFilteredTask();
    }, [filterChars, tasks, taskType]);

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
                <input 
                  id="quick-find" 
                  type="text" 
                  placeholder="Quick Find" 
                  value={filterChars} 
                  onChange={handleFilterChars} 
                />
              </div>
            </div>
            <h1>To-Do Meow ₍^. .^₎⟆</h1>
            <div id="header-right-side">
              <img id="check-icon" src={check_icon} alt="check icon" />
              <p id="task-count">{completeCount} / {totalTasks}</p>
            </div>
          </header>
          {isOpen && <NavBar todayfilteredTasks={todayfilteredTasks} upcomingfilteredTasks={upcomingfilteredTasks} />}
          <MainNav tasks={filteredTasks} />
        </div>
      </>
    );
  }
  
  export default Header;
