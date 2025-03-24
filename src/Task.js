import React, { createContext, useState, useEffect } from 'react';
import Cats from './Cats';

export const Task = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [taskType, setTaskType] = useState('Today');
    const [totalTasks, setTotalTasks] = useState(0);
    const [completeCount, setCompleteCount] = useState(0);
    const [completeTasks, setCompleteTasks] = useState([]);
    const [isAllTasksCompleted, setIsAllTasksCompleted] = useState(false);
    const {catPic, fetchCatPic} = Cats();
    const [randomTask, setRandomTask] = useState(null);

    // Load tasks from localStorage if they already exist
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) setTasks(JSON.parse(storedTasks));
    }, []);

    // Save tasks to localStorage whenever tasks chagne
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Update task counters and completed tasks when task type or tasks change
    useEffect(() => {
        const count = tasks.filter(task => task.task_type === taskType).length;
        setTotalTasks(count);

        const completedTasks = tasks.filter(task => task.completed && task.task_type === taskType);
        setCompleteTasks(completedTasks);
        setCompleteCount(completedTasks.length);
    }, [taskType, tasks]);

    // Check if all tasks are completed for the current task type and if yes, set allCompleted to true
    useEffect(() => {
        const allCompleted = taskType === "Today" && completeCount === totalTasks && totalTasks !== 0;
        setIsAllTasksCompleted(allCompleted);
    }, [completeCount, totalTasks, taskType]);

    // Fetch new cat picture when all tasks are completed
    useEffect(() => {
        if (isAllTasksCompleted) fetchCatPic();
    }, [isAllTasksCompleted]);

    // Add a new task to the task list
    const addTask = (task, type) => {
        // if empty return
        if (task.trim() === '') return; 
        const newTask = {text: task, completed: false, task_type: type};
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    // Delete a task from the task list
    const deleteTask = (text, type) => {
        setTasks(prevTasks => prevTasks.filter(task => !(task.task_type === type && task.text === text)));
    };

    // Clear all tasks of type type (either "Today" or "Upcoming") and removes Random Task
    const clearAll = (type) => {
        setTasks(prevTasks => prevTasks.filter(task => task.task_type !== type));
        setRandomTask(null);
    };

    // Choose a random uncompleted task for today
    const chooseRandomTask = () => {
        const uncompletedTasks = tasks.filter(task => !task.completed && task.task_type === "Today");
        if (uncompletedTasks.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * uncompletedTasks.length);
        setRandomTask(uncompletedTasks[randomIndex]);
    };

    // Mark a task as completed or not completed
    const taskComplete = (text, type) => {
        const taskIndex = tasks.findIndex(task => task.task_type === type && task.text === text);
        setTasks(prevTasks => prevTasks.map((task, i) =>
            i === taskIndex ? { ...task, completed: !task.completed } : task
        ));
        if (randomTask && randomTask.text === text) {
          // if random task is completed, remove it from the top
          setRandomTask(null);
        }
    };

    // Edit the text of a task
    const taskEdit = (newText, oldText, type) => {
        const taskIndex = tasks.findIndex(task => task.task_type === type && task.text === oldText);
        setTasks(prevTasks => prevTasks.map((task, i) =>
            i === taskIndex ? { ...task, text: newText } : task
        ));
        if (randomTask && randomTask.text === oldText) {
            // if random task's text is updated, make sure that it correctly reflects that
            setRandomTask(prevRandomTask => ({ ...prevRandomTask, text: newText }));
        }
    };

    // Change the current task type ("Today" --> "Upcoming" or "Upcoming" --> "Today")
    const changeTaskType = (newTaskType) => {
        setTaskType(newTaskType);
    };

    // Move a task between "Today" and "Upcoming" task types
    const moveTask = (text, currentType) => {
        const taskIndex = tasks.findIndex(task => task.task_type === currentType && task.text === text);
        setTasks(prevTasks => prevTasks.map((task, i) =>
            i === taskIndex ? { ...task, task_type: currentType === "Today" ? "Upcoming" : "Today" } : task
        ));
        if (randomTask && randomTask.text === text) {
          setRandomTask(null);
        } 
    };

    return (
        <Task.Provider value={{
            tasks, addTask, deleteTask, clearAll, randomTask, chooseRandomTask, setRandomTask, taskComplete, taskEdit, taskType, changeTaskType, moveTask, totalTasks, completeCount, completeTasks, isAllTasksCompleted, catPic, setIsAllTasksCompleted
        }}>
            {children}
        </Task.Provider>
    );
};
