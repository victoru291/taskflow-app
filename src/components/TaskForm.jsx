import React, { useState } from 'react';
import { useTasks } from '../contexts/TaskContext';

const TaskForm = () => {
  const { addTask, loading } = useTasks();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      await addTask(formData);
      setFormData({
        title: '',
        description: '',
        priority: 'medium'
      });
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>➕ Nova Tarefa</h3>
      
      <div className="form-group">
        <label>Título *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Digite o título da tarefa"
          required
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label>Descrição</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Digite a descrição (opcional)"
          rows="3"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label>Prioridade</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="low">🟢 Baixa</option>
          <option value="medium">🟡 Média</option>
          <option value="high">🔴 Alta</option>
        </select>
      </div>

      <button 
        type="submit" 
        className="submit-btn"
        disabled={loading || !formData.title.trim()}
      >
        {loading ? '⏳ Criando...' : '✅ Criar Tarefa'}
      </button>
    </form>
  );
};

export default TaskForm;
