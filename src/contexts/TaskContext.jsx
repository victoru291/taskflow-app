import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Buscar todas as tarefas
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/tasks');
      if (!response.ok) throw new Error('Erro ao buscar tarefas');
      const result = await response.json();
      
      // A API retorna {success, count, data: []}
      // Extraímos o array de tasks de result.data
      const tasksData = result.data || [];
      setTasks(Array.isArray(tasksData) ? tasksData : []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  // Adicionar nova tarefa
  const addTask = async (taskData) => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      
      if (!response.ok) throw new Error('Erro ao criar tarefa');
      const result = await response.json();
      const newTask = result.data; // Extrai a task de result.data
      
      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Atualizar tarefa
  const updateTask = async (id, updates) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) throw new Error('Erro ao atualizar tarefa');
      const result = await response.json();
      const updatedTask = result.data; // Extrai a task atualizada
      
      setTasks(prev => prev.map(task => 
        task._id === id ? updatedTask : task
      ));
      
      return updatedTask;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Deletar tarefa
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Erro ao deletar tarefa');
      
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Buscar tarefas ao inicializar
  useEffect(() => {
    fetchTasks();
  }, []);

  const value = {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    refetchTasks: fetchTasks,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
