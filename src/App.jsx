import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Components
import PlayerList from './components/PlayerList/PlayerList.jsx';
import CreatePlayer from './components/PlayerList/CreatePlayer.jsx';
import FlowerList from './components/FlowerList/FlowerList.jsx';
import HomePage from './components/HomePage.jsx';
import FileUpload from './components/FileUpload.jsx';

import './App.css';

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/players" element={<PlayerList />} />
        <Route path="/players/create" element={<CreatePlayer />} />
        <Route exact path="/flowers" element={<FlowerList />} />
        <Route exact path="/upload" element={<FileUpload />} />
      </Routes>
    </div>
  );
};

export default App;
