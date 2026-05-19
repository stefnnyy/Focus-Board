import React from 'react';
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
}

const formatTimeAgo = (timestamp: number) => {
  const diff = Math.floor((Date.now() - timestamp) / 60000); // minutes
  if (diff < 1) return 'Added just now';
  if (diff < 60) return `Added ${diff} min${diff > 1 ? 's' : ''} ago`;
  const hours = Math.floor(diff / 60);
  if (hours < 24) return `Added ${hours} hour${hours > 1 ? 's' : ''} ago`;
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow group"
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-slate-800 font-medium break-words pr-2">{task.title}</h4>
        <button
          onClick={() => onDelete(task.id)}
          className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
          aria-label="Delete task"
        >
          <svg className="w-4 h-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex justify-between items-center text-xs text-slate-500 mt-3 pt-2 border-t border-slate-50">
        <span className="bg-slate-100 px-2 py-1 rounded text-slate-600 font-medium">{task.column}</span>
        <span>{formatTimeAgo(task.createdAt)}</span>
      </div>
    </div>
  );
};
