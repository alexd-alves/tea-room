import logo from './logo.svg';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Components
import PlayerList from './components/PlayerList.jsx';
import CreatePlayer from './components/CreatePlayer.jsx';
import Navbar from './components/Navbar.jsx';

import './App.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<PlayerList />} />
        <Route path="/create" element={<CreatePlayer />} />
      </Routes>
    </div>
  );
};

export default App;
