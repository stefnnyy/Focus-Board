import React, { useState } from 'react';
import type { Task, ColumnType } from './types';
import { AddTaskForm } from './components/AddTaskForm';
import { Column } from './components/Column';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(), // Generate unique ID
      title,
      createdAt: Date.now(),
      column: 'Now', // Default column
    };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    // Store the task ID in the dataTransfer object
    e.dataTransfer.setData('taskId', id);
  };

  const handleDrop = (e: React.DragEvent, column: ColumnType) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    
    // Update the task's column
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, column } : task
    ));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-10 px-4 font-sans text-slate-800">
      <div className="w-full max-w-5xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Wahala Sorter</h1>
          <p className="text-slate-500">Organize your tasks like a pro. Drag and drop to sort.</p>
        </header>

        <AddTaskForm onAdd={handleAddTask} />

        <div className="flex gap-6 mt-8 flex-col lg:flex-row items-stretch min-h-[500px]">
          <Column
            title="Now"
            tasks={tasks.filter(t => t.column === 'Now')}
            onDelete={handleDeleteTask}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
          <Column
            title="Soon"
            tasks={tasks.filter(t => t.column === 'Soon')}
            onDelete={handleDeleteTask}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
          <Column
            title="Later"
            tasks={tasks.filter(t => t.column === 'Later')}
            onDelete={handleDeleteTask}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
