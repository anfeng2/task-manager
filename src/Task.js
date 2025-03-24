import React, { createContext, useState, useEffect } from 'react';
import Cats from './Cats';

export const Task = createContext();

export const TaskProvider = ({children}) => {
    const [tasks, setTasks] = useState([]);
    const [task_type, setTaskType] = useState('Today');
    const [totalTasks, setTotalTasks] = useState(0);
    const [completeCount, setCompleteCount] = useState(0);
    const [completeTasks, setCompleteTasks] = useState([]);
    const [isAllTasksCompleted, setIsAllTasksCompleted] = useState(false);
    const {catPic, fetchCatPic} = Cats();


    useEffect(() => {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }, []);

    useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const AddTask = (task, type) => {
        if (task.trim() === '') return; 

        const newTask = { text: task, completed: false, task_type: type};
        setTasks(prevTasks => [...prevTasks, newTask]);
    };
  
    const TaskComplete = (oldText, type) => {
      const unfilteredIndex = tasks.findIndex(task => (task.task_type === type && task.text === oldText));
      setTasks(prevTasks => prevTasks.map((task, i) => 
        i === unfilteredIndex ? { ...task, completed: !task.completed } : task
      ));
    };

    const TaskEdit = (newText, oldText, type) => {
        const unfilteredIndex = tasks.findIndex(task => (task.task_type === type && task.text === oldText));
        setTasks(prevTasks => prevTasks.map((task, i) => 
          i === unfilteredIndex ? { ...task, text: newText } : task
        ));
    };

    const changeTaskType = (new_task_type) => {
        setTaskType(new_task_type);
    };

    const moveTask = (text, currentType) => {
      const unfilteredIndex = tasks.findIndex(task => (task.task_type === currentType && task.text === text));
      setTasks(prevTasks => prevTasks.map((task, i) => 
        i === unfilteredIndex ? { ...task, task_type: currentType === "Today" ? "Upcoming" : "Today"} : task
      ));
  };

    useEffect(() => {
        const count = tasks.filter(task => task.task_type === task_type).length;
        setTotalTasks(count);
    }, [task_type, tasks]);


    useEffect(() => {
      const t = tasks.filter(task => task.completed && task.task_type === task_type);
      setCompleteTasks(t);
      setCompleteCount(t.length);
  }, [task_type, tasks]);


    useEffect(() => {
      if (task_type === "Today" && totalTasks !== 0) {
        const allCompleted = completeCount === totalTasks;
        setIsAllTasksCompleted(allCompleted);
      }
    }, [completeCount, totalTasks, task_type]);

    useEffect(() => {
      if (isAllTasksCompleted) {
        fetchCatPic();
      }
    }, [isAllTasksCompleted]);


    return (
        <Task.Provider value={{
            tasks, AddTask, TaskComplete, TaskEdit, task_type, changeTaskType, moveTask, totalTasks, completeCount, completeTasks, isAllTasksCompleted, catPic, setIsAllTasksCompleted
        }}>
            {children}
        </Task.Provider>
    );
};