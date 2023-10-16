import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { HomeOutlined, LineChartOutlined, UploadOutlined, AppstoreOutlined } from '@ant-design/icons';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div id='container'>
      <menu>
        <h1>Matchup Mashup</h1>
        <Link className={location.pathname === '/' ? 'menu-item active' : 'menu-item'} to='/'>
          <HomeOutlined />
        </Link>
        <Link className={location.pathname === '/stats' ? 'menu-item active' : 'menu-item'} to='/stats'>
          <LineChartOutlined />
        </Link>
        <Link className={location.pathname === '/decks' ? 'menu-item active' : 'menu-item'} to='/decks'>
          <AppstoreOutlined />
        </Link>
        <Link className={location.pathname === '/admintools' ? 'menu-item active' : 'menu-item'} to='/admintools'>
          <UploadOutlined />
        </Link>
      </menu>
      <content>
        <Outlet />
      </content>
    </div>
  );
}

export default App
