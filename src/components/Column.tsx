import React from 'react';
import type { Task, ColumnType } from '../types';
import { TaskCard } from './TaskCard';

interface ColumnProps {
  title: ColumnType;
  tasks: Task[];
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDrop: (e: React.DragEvent, column: ColumnType) => void;
}

export const Column: React.FC<ColumnProps> = ({ title, tasks, onDelete, onDragStart, onDrop }) => {
  // Allow drop by preventing default dragover behavior
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={(e) => onDrop(e, title)}
      className="flex-1 min-w-[300px] bg-slate-50/80 rounded-xl p-4 flex flex-col h-full border border-slate-200 shadow-sm"
    >
      <div className="flex justify-between items-center mb-4 px-1">
        <h2 className="font-semibold text-slate-700 text-lg">{title}</h2>
        <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md text-sm font-medium">
          {tasks.length}
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto min-h-[200px] pb-4">
        {tasks.length === 0 ? (
          <div className="text-center text-slate-400 text-sm mt-8 border-2 border-dashed border-slate-200 rounded-lg py-8 bg-white/50">
            Drop tasks here
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onDragStart={onDragStart}
            />
          ))
        )}
      </div>
    </div>
  );
};
