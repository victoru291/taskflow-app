import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>🚀 TaskFlow</h1>
          <span>Organize suas tarefas com eficiência</span>
        </div>
        <nav className="nav">
          <button className="nav-btn">📊 Estatísticas</button>
          <button className="nav-btn">⚙️ Configurações</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
