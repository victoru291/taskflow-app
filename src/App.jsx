import React from 'react';
import { useTasks } from './contexts/TaskContext';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  const { tasks, loading, error } = useTasks();

  // Garantir que tasks seja sempre um array
  const tasksArray = Array.isArray(tasks) ? tasks : [];
  const pendingTasks = tasksArray.filter(task => !task.completed);
  const completedTasks = tasksArray.filter(task => task.completed);

  return (
    <div className="app">
      <Header />
      
      <main className="container">
        {error && (
          <div className="error">
            <strong>Erro:</strong> {error}
          </div>
        )}
        
        {/* ADICIONAMOS O TASKFORM AQUI */}
        <TaskForm />
        
        {loading ? (
          <div className="loading">
            <p>📡 Carregando tarefas...</p>
          </div>
        ) : (
          <div className="dashboard">
            <div className="stats">
              <h2>📊 Resumo</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total</h3>
                  <span className="stat-number">{tasksArray.length}</span>
                </div>
                <div className="stat-card">
                  <h3>Pendentes</h3>
                  <span className="stat-number">{pendingTasks.length}</span>
                </div>
                <div className="stat-card">
                  <h3>Concluídas</h3>
                  <span className="stat-number">{completedTasks.length}</span>
                </div>
              </div>
            </div>

            <div className="tasks-preview">
              <h2>📋 Últimas Tarefas</h2>
              {tasksArray.length === 0 ? (
                <p className="no-tasks">Nenhuma tarefa encontrada. Crie sua primeira tarefa!</p>
              ) : (
                <div className="tasks-list">
                  {tasksArray.slice(0, 5).map(task => (
                    <div key={task._id} className="task-preview">
                      <div className="task-info">
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                      </div>
                      <div className="task-status">
                        {task.completed ? '✅' : '⏳'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
