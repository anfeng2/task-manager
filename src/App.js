import React from 'react';
import './App.css';
import Header from './Header';
import { TaskProvider } from './Task';

function App() {
  return (
    <TaskProvider>
        <Header/>
    </TaskProvider>
  );
}

export default App;
