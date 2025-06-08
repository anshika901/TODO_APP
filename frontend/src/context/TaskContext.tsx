
import React, { createContext, useContext, useState, useEffect } from 'react';
import { taskService } from '@/services/taskService';

export interface Task {
  id: number;
  title: string;
  description?: string;
  due_date?: string;
  is_completed: boolean;
  is_important: boolean;
  directory: string;
}

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (id: number, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  deleteAllTasks: () => Promise<void>;
  fetchTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const fetchedTasks = await taskService.getAllTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: Omit<Task, 'id'>) => {
    try {
      const newTask = await taskService.createTask(task);
      setTasks(prev => [...prev, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (id: number, taskUpdate: Partial<Task>) => {
    try {
      const updatedTask = await taskService.updateTask(id, taskUpdate);
      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const deleteAllTasks = async () => {
    try {
      for (const task of tasks) {
        await taskService.deleteTask(task.id);
      }
      setTasks([]);
    } catch (error) {
      console.error('Error deleting all tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      addTask,
      updateTask,
      deleteTask,
      deleteAllTasks,
      fetchTasks
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
