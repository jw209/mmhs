import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className='container'>
      <div className='menu'>
        <Link className={location.pathname === '/' ? 'menu-item active' : 'menu-item'} to='/'>
          Home
        </Link>
        <Link className={location.pathname === '/stats' ? 'menu-item active' : 'menu-item'} to='/stats'>
          Statistics
        </Link>
        <Link className={location.pathname === '/decks' ? 'menu-item active' : 'menu-item'} to='/decks'>
          Decks
        </Link>
        <Link className={location.pathname === '/admintools' ? 'menu-item active' : 'menu-item'} to='/admintools'>
          Admin Tools
        </Link>
      </div>
      <div className='content'>
        <Outlet />
      </div>
    </div>
  );
}

export default App
