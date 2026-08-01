// src/App.jsx

import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Components
import PlayerList from './components/PlayerList/PlayerList.jsx';
import CreatePlayer from './components/PlayerList/CreatePlayer.jsx';
import FlowerList from './components/FlowerList/FlowerList.jsx';
import CreateFlower from './components/FlowerList/CreateFlower.jsx';
import HomePage from './components/HomePage.jsx';
import FileUpload from './components/FileUpload.jsx';

import './App.css';

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/players" element={<PlayerList />} />
        <Route exact path="/players/create" element={<CreatePlayer />} />
        <Route exact path="/flowers" element={<FlowerList />} />
        <Route exact path="/flowers/create" element={<CreateFlower />} />
        <Route exact path="/upload" element={<FileUpload />} />
      </Routes>
    </div>
  );
};

export default App;
