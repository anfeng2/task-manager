import React, { createContext, useState, useEffect } from 'react';

export const Task = createContext();

export const TaskProvider = ({children}) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }, []);

    useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    function AddTask(task, type) {
        if (task.trim() === '') return; 

        const newTask = { text: task, completed: false, task_type: type};
        setTasks(prevTasks => [...prevTasks, newTask]);
    }
  
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

    const [task_type, setTaskType] = useState('Inbox');

    const changeTaskType = (new_task_type) => {
        setTaskType(new_task_type);
    };


    const [totalTasks, setTotalTasks] = useState(0);
    const [uncompleteTasks, setUncompleteTasks] = useState(0);

    useEffect(() => {
        const count = tasks.filter(task => task.task_type === task_type).length;
        setTotalTasks(count);
    }, [task_type, tasks]);

    useEffect(() => {
        const count = tasks.filter(task => !task.completed && task.task_type === task_type).length;
        setUncompleteTasks(count);
    }, [task_type, tasks]);

    return (
        <Task.Provider value={{
            tasks, AddTask, TaskComplete, TaskEdit, task_type, changeTaskType, totalTasks, uncompleteTasks
        }}>
            {children}
        </Task.Provider>
    );
};